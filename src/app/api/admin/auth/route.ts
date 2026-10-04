import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "dayane2026";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || password.trim() !== DEFAULT_ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Senha incorreta. Tente novamente." },
        { status: 401 }
      );
    }

    // Retorna autorização confirmada
    return NextResponse.json({
      success: true,
      message: "Autenticado com sucesso!",
      token: Buffer.from(`dayane:${DEFAULT_ADMIN_PASSWORD}:${Date.now()}`).toString("base64"),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Falha na requisição de autenticação." },
      { status: 400 }
    );
  }
}
