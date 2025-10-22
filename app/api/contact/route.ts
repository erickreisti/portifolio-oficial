import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Inicializa o cliente Resend com a API Key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Extrai os dados do corpo da requisição
    const { name, email, subject, message } = await request.json();

    // Validação dos campos obrigatórios
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Envia o email usando o Resend
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["erickreisti@gmail.com"], // Email da sua conta Resend
      subject: `Portfolio: ${subject}`,
      replyTo: email, // Permite responder diretamente para o remetente
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">📬 Nova mensagem do seu portfolio!</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>👤 Nome:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>🎯 Assunto:</strong> ${subject}</p>
            <p><strong>💬 Mensagem:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">
              ${message.replace(/\n/g, "<br>")}
            </p>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            ⏰ Enviado em ${new Date().toLocaleString("pt-BR")}
          </p>
        </div>
      `,
    });

    // Trata erros do Resend
    if (error) {
      return NextResponse.json(
        { error: "Erro ao enviar mensagem. Tente novamente." },
        { status: 500 }
      );
    }

    // Retorna sucesso
    return NextResponse.json(
      {
        success: true,
        message: "Mensagem enviada com sucesso! Entrarei em contato em breve.",
      },
      { status: 200 }
    );
  } catch (error) {
    // Trata erros gerais do servidor
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
