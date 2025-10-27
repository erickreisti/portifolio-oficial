// app/api/contact/route.ts - MELHORADO
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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

    // Validação mais robusta
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const resend = getResendClient();

    // Modo desenvolvimento
    if (!resend) {
      console.log("Email simulado:", {
        name: name.trim(),
        email: email.trim(),
        message: message.trim().substring(0, 100) + "...",
      });

      return NextResponse.json(
        {
          success: true,
          message: "Mensagem recebida (modo de desenvolvimento)",
        },
        { status: 200 }
      );
    }

    // Envio real
    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["erickreisti@gmail.com"],
      subject: `Nova mensagem de ${name.trim()} - Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #3b82f6;">Nova mensagem do portfolio</h2>
          <p><strong>Nome:</strong> ${name.trim()}</p>
          <p><strong>Email:</strong> ${email.trim()}</p>
          <p><strong>Mensagem:</strong></p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 10px;">
            ${message.trim().replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Erro ao enviar email:", error);
      return NextResponse.json(
        { error: "Erro ao enviar mensagem. Tente novamente." },
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
