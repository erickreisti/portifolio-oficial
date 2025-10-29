// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Cache para prevenir duplicação no servidor
const submissionCache = new Map();

const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "RESEND_API_KEY não encontrada. Modo desenvolvimento ativado."
    );
    return null;
  }
  return new Resend(apiKey);
};

// Função para gerar fingerprint do submission
const generateSubmissionFingerprint = (data: any) => {
  return `${data.email}:${data.name}:${data.subject}:${Date.now()}`;
};

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      subject,
      message,
      meetingDate,
      meetingTime,
      formType,
    } = await request.json();

    // Validação básica
    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        { error: "Todos os campos obrigatórios devem ser preenchidos" },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Prevenção de duplicação no servidor
    const fingerprint = generateSubmissionFingerprint({ email, name, subject });
    if (submissionCache.has(fingerprint)) {
      const lastSubmission = submissionCache.get(fingerprint);
      const timeSinceLastSubmission = Date.now() - lastSubmission;

      if (timeSinceLastSubmission < 30000) {
        // 30 segundos
        return NextResponse.json(
          { error: "Aguarde 30 segundos antes de enviar outra mensagem" },
          { status: 429 }
        );
      }
    }

    // Atualizar cache
    submissionCache.set(fingerprint, Date.now());

    // Limpar cache antigo periodicamente
    setTimeout(() => {
      submissionCache.delete(fingerprint);
    }, 30000);

    const resend = getResendClient();

    // Modo desenvolvimento - simular envio
    if (!resend) {
      console.log("📧 EMAIL SIMULADO (Modo Desenvolvimento):", {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim().substring(0, 100) + "...",
        meeting:
          meetingDate && meetingTime
            ? `${meetingDate} às ${meetingTime}`
            : "Não agendado",
        formType,
        timestamp: new Date().toISOString(),
        fingerprint,
      });

      // Simular delay de processamento
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return NextResponse.json(
        {
          success: true,
          message: "Mensagem recebida com sucesso (modo desenvolvimento)",
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    // ENVIO REAL COM RESEND - TEMPLATE PROFISSIONAL PREMIUM
    const emailSubject =
      formType === "enhanced"
        ? `🎯 Agendamento - ${subject} - ${name}`
        : `📧 Contato Portfolio - ${subject} - ${name}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            /* RESET E ESTILOS BASE */
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
              background: linear-gradient(135deg, #fafbfc 0%, #f0f4f8 100%);
              color: #1a202c;
              line-height: 1.7;
              margin: 0;
              padding: 40px 20px;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            .container {
              max-width: 680px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 24px;
              overflow: hidden;
              box-shadow: 
                0 20px 60px rgba(0, 0, 0, 0.08),
                0 8px 24px rgba(0, 0, 0, 0.04),
                0 1px 0 rgba(255, 255, 255, 0.1) inset;
              border: 1px solid #e8edf3;
            }
            
            /* HEADER COM DESIGN SOFISTICADO */
            .header {
              background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%);
              padding: 52px 40px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            
            .header::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: 
                radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%);
            }
            
            .header-content {
              position: relative;
              z-index: 2;
            }
            
            .header h1 {
              color: white;
              font-size: 32px;
              font-weight: 800;
              margin-bottom: 12px;
              letter-spacing: -0.5px;
              text-shadow: 0 2px 8px rgba(0,0,0,0.15);
            }
            
            .header .subtitle {
              color: rgba(255, 255, 255, 0.85);
              font-size: 17px;
              font-weight: 500;
              letter-spacing: 0.2px;
            }
            
            /* BADGE PREMIUM */
            .badge {
              display: inline-flex;
              align-items: center;
              background: ${
                formType === "enhanced"
                  ? "linear-gradient(135deg, #10b981, #059669)"
                  : "linear-gradient(135deg, #3b82f6, #1d4ed8)"
              };
              color: white;
              padding: 10px 20px;
              border-radius: 24px;
              font-size: 13px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.8px;
              margin-top: 16px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.2);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255,255,255,0.2);
            }
            
            /* CONTENT AREA */
            .content {
              padding: 48px 40px;
            }
            
            /* INFO GRID MELHORADO */
            .info-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 20px;
              margin-bottom: 40px;
            }
            
            @media (min-width: 480px) {
              .info-grid {
                grid-template-columns: 1fr 1fr;
              }
            }
            
            .info-item {
              background: #f8fafc;
              padding: 24px;
              border-radius: 16px;
              border-left: 4px solid #06b6d4;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              position: relative;
              overflow: hidden;
            }
            
            .info-item::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 1px;
              background: linear-gradient(90deg, transparent, #06b6d4, transparent);
            }
            
            .info-item:hover {
              background: #f1f5f9;
              transform: translateY(-3px);
              box-shadow: 0 8px 24px rgba(6, 182, 212, 0.12);
            }
            
            .info-item strong {
              color: #64748b;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 1px;
              display: block;
              margin-bottom: 10px;
              font-weight: 600;
            }
            
            .info-item div {
              color: #1e293b;
              font-size: 16px;
              font-weight: 600;
              line-height: 1.5;
            }
            
            /* MESSAGE BOX PREMIUM */
            .message-box {
              background: linear-gradient(135deg, #f8fafc, #f1f5f9);
              padding: 32px;
              border-radius: 20px;
              border: 1px solid #e2e8f0;
              margin: 32px 0;
              position: relative;
            }
            
            .message-box::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 3px;
              background: linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6);
              border-radius: 20px 20px 0 0;
            }
            
            .message-box strong {
              color: #06b6d4;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 1px;
              display: block;
              margin-bottom: 20px;
              font-weight: 700;
            }
            
            .message-content {
              color: #374151;
              font-size: 16px;
              line-height: 1.8;
              white-space: pre-wrap;
              background: white;
              padding: 28px;
              border-radius: 12px;
              border: 1px solid #e2e8f0;
              box-shadow: 0 2px 8px rgba(0,0,0,0.04);
            }
            
            /* ACTION BOX REFINADO */
            .action-box {
              background: linear-gradient(135deg, #ecfdf5, #d1fae5);
              padding: 28px;
              border-radius: 16px;
              border-left: 4px solid #10b981;
              margin: 32px 0;
              position: relative;
            }
            
            .action-box::before {
              content: '💎';
              position: absolute;
              top: -12px;
              right: 24px;
              font-size: 24px;
              background: white;
              padding: 8px;
              border-radius: 50%;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            
            .action-box strong {
              color: #065f46;
              font-size: 15px;
              display: block;
              margin-bottom: 12px;
              font-weight: 700;
            }
            
            .action-box div {
              color: #047857;
              font-size: 15px;
              line-height: 1.6;
              font-weight: 500;
            }
            
            /* FOOTER ELEGANTE */
            .footer {
              background: linear-gradient(135deg, #f8fafc, #e2e8f0);
              padding: 32px 40px;
              text-align: center;
              border-top: 1px solid #e2e8f0;
            }
            
            .footer-content {
              max-width: 400px;
              margin: 0 auto;
            }
            
            .footer-logo {
              color: #06b6d4;
              font-weight: 800;
              font-size: 18px;
              margin-bottom: 12px;
              display: block;
              letter-spacing: -0.5px;
            }
            
            .footer small {
              color: #64748b;
              font-size: 13px;
              line-height: 1.6;
              display: block;
            }
            
            .footer-meta {
              display: flex;
              justify-content: center;
              gap: 20px;
              margin-top: 16px;
              flex-wrap: wrap;
            }
            
            .meta-item {
              color: #94a3b8;
              font-size: 12px;
              padding: 6px 12px;
              background: rgba(255,255,255,0.6);
              border-radius: 12px;
              border: 1px solid #e2e8f0;
            }
            
            /* UTILITIES E ELEMENTOS VISUAIS */
            .text-gradient {
              background: linear-gradient(135deg, #06b6d4, #3b82f6);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              font-weight: 700;
            }
            
            .divider {
              height: 1px;
              background: linear-gradient(90deg, 
                transparent, 
                #e2e8f0, 
                #06b6d4, 
                #e2e8f0, 
                transparent
              );
              margin: 40px 0;
              opacity: 0.6;
            }
            
            .priority-indicator {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              padding: 8px 16px;
              background: ${formType === "enhanced" ? "#fef3c7" : "#f0f9ff"};
              color: ${formType === "enhanced" ? "#92400e" : "#0369a1"};
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              margin-left: 12px;
            }

            /* RESPONSIVE ADJUSTMENTS */
            @media (max-width: 600px) {
              body {
                padding: 20px 12px;
              }
              
              .header {
                padding: 40px 24px;
              }
              
              .header h1 {
                font-size: 26px;
              }
              
              .content {
                padding: 32px 24px;
              }
              
              .message-box,
              .action-box {
                padding: 24px;
              }
              
              .info-item {
                padding: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- HEADER -->
            <div class="header">
              <div class="header-content">
                <h1>
                  ${
                    formType === "enhanced"
                      ? "🎯 Novo Agendamento"
                      : "📧 Mensagem do Portfolio"
                  }
                </h1>
                <div class="subtitle">Erick Reis • Desenvolvedor Fullstack</div>
                <div class="badge">
                  ${
                    formType === "enhanced"
                      ? "📅 Reunião Agendada"
                      : "⚡ Mensagem Rápida"
                  }
                  <span class="priority-indicator">
                    ${
                      formType === "enhanced"
                        ? "🔔 Prioridade Alta"
                        : "💼 Prioridade Normal"
                    }
                  </span>
                </div>
              </div>
            </div>
            
            <!-- CONTENT -->
            <div class="content">
              <!-- INFO GRID -->
              <div class="info-grid">
                <div class="info-item">
                  <strong>👤 Nome Completo</strong>
                  <div>${name.trim()}</div>
                </div>
                
                <div class="info-item">
                  <strong>📧 Email para Contato</strong>
                  <div>${email.trim()}</div>
                </div>
                
                <div class="info-item">
                  <strong>🎯 Assunto da Mensagem</strong>
                  <div>${subject.trim()}</div>
                </div>
                
                ${
                  meetingDate && meetingTime
                    ? `<div class="info-item">
                        <strong>📅 Reunião Agendada</strong>
                        <div>
                          ${new Date(meetingDate).toLocaleDateString("pt-BR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                          <br>
                          <strong>⏰ ${meetingTime}</strong>
                        </div>
                       </div>`
                    : '<div class="info-item"><strong>⏰ Tipo de Contato</strong><div>Mensagem Rápida</div></div>'
                }
              </div>
              
              <div class="divider"></div>

              <!-- MESSAGE -->
              <div class="message-box">
                <strong>💬 Detalhes da Mensagem</strong>
                <div class="message-content">${message
                  .trim()
                  .replace(/\n/g, "<br>")}</div>
              </div>

              <!-- ACTION REQUIRED -->
              <div class="action-box">
                <strong>🚀 Próximos Passos</strong>
                <div>
                  ${
                    formType === "enhanced"
                      ? "Este contato inclui um agendamento de reunião confirmado. Por favor, confirme sua disponibilidade e prepare os materiais necessários para a discussão."
                      : "Recomenda-se responder este contato dentro de 24 horas para manter uma comunicação eficiente e demonstrar profissionalismo."
                  }
                </div>
              </div>
            </div>

            <!-- FOOTER -->
            <div class="footer">
              <div class="footer-content">
                <div class="footer-logo">ERICK REIS • FULLSTACK DEVELOPER</div>
                <small>
                  Sistema de Contato Profissional • Desenvolvido com Next.js e Resend
                </small>
                <div class="footer-meta">
                  <span class="meta-item">
                    📧 ${
                      formType === "enhanced"
                        ? "Com Agendamento"
                        : "Mensagem Rápida"
                    }
                  </span>
                  <span class="meta-item">
                    ⏰ ${new Date().toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span class="meta-item">
                    🌐 Portfolio Contact
                  </span>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["erickreisti@gmail.com"],
      subject: emailSubject,
      html: emailHtml,
    });

    if (error) {
      console.error("❌ Erro ao enviar email:", error);
      // Remover do cache em caso de erro
      submissionCache.delete(fingerprint);

      return NextResponse.json(
        {
          error:
            "Erro ao enviar mensagem. Tente novamente em alguns instantes.",
        },
        { status: 500 }
      );
    }

    console.log("✅ Email enviado com sucesso:", {
      id: data?.id,
      to: "erickreisti@gmail.com",
      subject: emailSubject,
      formType,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Mensagem enviada com sucesso!",
        timestamp: new Date().toISOString(),
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Erro no servidor:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}

// Método GET para verificar status da API
export async function GET() {
  return NextResponse.json({
    status: "online",
    message: "Contact API está funcionando",
    timestamp: new Date().toISOString(),
    features: [
      "Envio de emails via Resend",
      "Prevenção de duplicação (30s)",
      "Validação de dados",
      "Suporte a agendamentos",
      "Modo desenvolvimento",
      "Template profissional premium",
    ],
  });
}
