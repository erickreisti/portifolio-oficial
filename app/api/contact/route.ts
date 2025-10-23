// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Função para inicializar o Resend de forma segura
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "RESEND_API_KEY não encontrada. O envio de emails está desativado."
    );
    return null;
  }

  return new Resend(apiKey);
};

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const resend = getResendClient();

    // Se o Resend não estiver configurado, retorna sucesso simulado
    if (!resend) {
      console.log("Email simulado (Resend não configurado):", {
        name,
        email,
        message: message.substring(0, 100) + "...",
      });

      return NextResponse.json(
        {
          success: true,
          message: "Mensagem recebida (modo de desenvolvimento)",
        },
        { status: 200 }
      );
    }

    // Envia o email real se o Resend estiver configurado
    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["erickreisti@gmail.com"],
      subject: `Nova mensagem de ${name} - Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #3b82f6;">Nova mensagem do portfolio</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensagem:</strong></p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 10px;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Erro ao enviar email:", error);
      return NextResponse.json(
        { error: "Erro ao enviar mensagem" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Mensagem enviada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no servidor:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
