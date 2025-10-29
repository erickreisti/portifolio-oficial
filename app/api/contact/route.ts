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

    // ENVIO REAL COM RESEND - TEMA CLARO COM CORES DO PORTFOLIO
    const emailSubject =
      formType === "enhanced"
        ? `🎯 Agendamento - ${subject} - ${name}`
        : `📧 Contato - ${subject} - ${name}`;

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
              font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
              background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
              color: #1e293b;
              line-height: 1.6;
              margin: 0;
              padding: 20px;
            }
            
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 
                0 10px 25px rgba(6, 182, 212, 0.1),
                0 5px 10px rgba(6, 182, 212, 0.05);
              border: 1px solid #e2e8f0;
            }
            
            /* HEADER COM GRADIENTE DO PORTFOLIO */
            .header {
              background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%);
              padding: 40px 30px;
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
              background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" opacity="0.1"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            }
            
            .header h1 {
              color: white;
              font-size: 28px;
              font-weight: 800;
              margin-bottom: 8px;
              position: relative;
              z-index: 2;
              text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .header .subtitle {
              color: rgba(255, 255, 255, 0.9);
              font-size: 16px;
              font-weight: 500;
              position: relative;
              z-index: 2;
            }
            
            /* BADGE */
            .badge {
              display: inline-block;
              background: ${
                formType === "enhanced"
                  ? "linear-gradient(135deg, #10b981, #059669)"
                  : "linear-gradient(135deg, #3b82f6, #1d4ed8)"
              };
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-top: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.15);
              position: relative;
              z-index: 2;
            }
            
            /* CONTENT */
            .content {
              padding: 40px 30px;
            }
            
            /* INFO GRID */
            .info-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 16px;
              margin-bottom: 30px;
            }
            
            @media (min-width: 480px) {
              .info-grid {
                grid-template-columns: 1fr 1fr;
              }
            }
            
            .info-item {
              background: #f8fafc;
              padding: 20px;
              border-radius: 12px;
              border-left: 4px solid #06b6d4;
              transition: all 0.3s ease;
            }
            
            .info-item:hover {
              background: #f1f5f9;
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(6, 182, 212, 0.1);
            }
            
            .info-item strong {
              color: #06b6d4;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              display: block;
              margin-bottom: 6px;
            }
            
            .info-item div {
              color: #1e293b;
              font-size: 15px;
              font-weight: 600;
            }
            
            /* MESSAGE BOX */
            .message-box {
              background: #f8fafc;
              padding: 25px;
              border-radius: 12px;
              border: 1px solid #e2e8f0;
              margin: 25px 0;
            }
            
            .message-box strong {
              color: #06b6d4;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              display: block;
              margin-bottom: 15px;
            }
            
            .message-content {
              color: #334155;
              font-size: 15px;
              line-height: 1.7;
              white-space: pre-wrap;
              background: white;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #e2e8f0;
            }
            
            /* ACTION BOX */
            .action-box {
              background: linear-gradient(135deg, #ecfdf5, #f0fdfa);
              padding: 20px;
              border-radius: 12px;
              border-left: 4px solid #10b981;
              margin: 25px 0;
            }
            
            .action-box strong {
              color: #065f46;
              font-size: 14px;
              display: block;
              margin-bottom: 8px;
            }
            
            .action-box div {
              color: #047857;
              font-size: 14px;
              line-height: 1.5;
            }
            
            /* FOOTER */
            .footer {
              background: #f1f5f9;
              padding: 25px 30px;
              text-align: center;
              border-top: 1px solid #e2e8f0;
            }
            
            .footer small {
              color: #64748b;
              font-size: 12px;
              line-height: 1.5;
            }
            
            .footer-logo {
              color: #06b6d4;
              font-weight: 800;
              font-size: 16px;
              margin-bottom: 8px;
              display: block;
            }
            
            /* UTILITIES */
            .text-gradient {
              background: linear-gradient(135deg, #06b6d4, #3b82f6);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            
            .divider {
              height: 1px;
              background: linear-gradient(90deg, transparent, #06b6d4, transparent);
              margin: 25px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- HEADER -->
            <div class="header">
              <h1>
                ${
                  formType === "enhanced"
                    ? "🎯 Novo Agendamento"
                    : "📧 Nova Mensagem"
                }
              </h1>
              <div class="subtitle">Portfolio - Erick Reis</div>
              <div class="badge">
                ${
                  formType === "enhanced"
                    ? "Reunião Agendada"
                    : "Mensagem Rápida"
                }
              </div>
            </div>
            
            <!-- CONTENT -->
            <div class="content">
              <!-- INFO GRID -->
              <div class="info-grid">
                <div class="info-item">
                  <strong>👤 Nome</strong>
                  <div>${name.trim()}</div>
                </div>
                
                <div class="info-item">
                  <strong>📧 Email</strong>
                  <div>${email.trim()}</div>
                </div>
                
                <div class="info-item">
                  <strong>🎯 Assunto</strong>
                  <div>${subject.trim()}</div>
                </div>
                
                ${
                  meetingDate && meetingTime
                    ? `<div class="info-item">
                        <strong>📅 Reunião Agendada</strong>
                        <div>${new Date(meetingDate).toLocaleDateString(
                          "pt-BR",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )} às ${meetingTime}</div>
                       </div>`
                    : '<div class="info-item"><strong>⏰ Tipo</strong><div>Mensagem Rápida</div></div>'
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
                <strong>🚀 Ação Requerida</strong>
                <div>
                  ${
                    formType === "enhanced"
                      ? "Este contato inclui um agendamento de reunião. Por favor, confirme a disponibilidade e responda o mais breve possível."
                      : "Por favor, responda este contato dentro de 24 horas para manter uma comunicação eficiente e demonstrar profissionalismo."
                  }
                </div>
              </div>
            </div>

            <!-- FOOTER -->
            <div class="footer">
              <div class="footer-logo">ERICK REIS • FULLSTACK DEVELOPER</div>
              <small>
                Tipo: ${
                  formType === "enhanced"
                    ? "Com Agendamento"
                    : "Mensagem Rápida"
                } • 
                Enviado em: ${new Date().toLocaleString("pt-BR")} • 
                Portfolio Contact System
              </small>
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
      "Template claro com cores do portfolio",
    ],
  });
}
