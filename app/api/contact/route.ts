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

    // ENVIO REAL COM RESEND
    const emailSubject =
      formType === "enhanced"
        ? `🎯 AGENDAMENTO - ${subject} - ${name}`
        : `📧 CONTATO - ${subject} - ${name}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: 'Segoe UI', Arial, sans-serif; 
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
              color: #f8fafc; 
              margin: 0; 
              padding: 0; 
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: #1e293b;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            }
            .header { 
              background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
              padding: 30px;
              text-align: center;
            }
            .header h1 { 
              margin: 0; 
              font-size: 28px;
              font-weight: 800;
            }
            .content { 
              padding: 30px; 
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin: 20px 0;
            }
            .info-item {
              background: #334155;
              padding: 15px;
              border-radius: 8px;
              border-left: 4px solid #06b6d4;
            }
            .message-box {
              background: #0f172a;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border: 1px solid #334155;
            }
            .footer {
              background: #0f172a;
              padding: 20px;
              text-align: center;
              border-top: 1px solid #334155;
              color: #94a3b8;
              font-size: 12px;
            }
            .badge {
              display: inline-block;
              background: ${formType === "enhanced" ? "#10b981" : "#3b82f6"};
              color: white;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              margin-left: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>
                ${
                  formType === "enhanced"
                    ? "🎯 NOVO AGENDAMENTO"
                    : "📧 NOVA MENSAGEM"
                }
                <span class="badge">${
                  formType === "enhanced" ? "COM REUNIÃO" : "MENSAGEM RÁPIDA"
                }</span>
              </h1>
            </div>
            
            <div class="content">
              <div class="info-grid">
                <div class="info-item">
                  <strong>👤 Nome:</strong><br>
                  ${name.trim()}
                </div>
                <div class="info-item">
                  <strong>📧 Email:</strong><br>
                  ${email.trim()}
                </div>
                <div class="info-item">
                  <strong>🎯 Assunto:</strong><br>
                  ${subject.trim()}
                </div>
                ${
                  meetingDate && meetingTime
                    ? `<div class="info-item">
                        <strong>📅 Reunião Agendada:</strong><br>
                        ${new Date(meetingDate).toLocaleDateString(
                          "pt-BR"
                        )} às ${meetingTime}
                       </div>`
                    : ""
                }
              </div>

              <div class="message-box">
                <strong>💬 Mensagem:</strong>
                <div style="margin-top: 15px; line-height: 1.6; color: #cbd5e1;">
                  ${message.trim().replace(/\n/g, "<br>")}
                </div>
              </div>

              <div style="background: #065f46; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                <strong>🚀 Ação Requerida:</strong><br>
                ${
                  formType === "enhanced"
                    ? "Este contato inclui um agendamento de reunião. Por favor, confirme a disponibilidade."
                    : "Responda este contato dentro de 24 horas para manter uma comunicação eficiente."
                }
              </div>
            </div>

            <div class="footer">
              <small>
                Tipo: ${
                  formType === "enhanced"
                    ? "Com Agendamento"
                    : "Mensagem Rápida"
                } | 
                Enviado em: ${new Date().toLocaleString("pt-BR")} |
                Fingerprint: ${fingerprint}
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
    ],
  });
}
