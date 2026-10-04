import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import defaultContent from "@/data/atelierContent.json";

export const dynamic = "force-dynamic";

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "dayane2026";

// Cache em memória para ambientes serverless
let inMemoryContent: any = null;

function getContentFilePath(): string {
  // Tenta encontrar o arquivo no sistema de arquivos
  const primaryPath = path.join(process.cwd(), "src", "data", "atelierContent.json");
  const fallbackPath = path.join(process.cwd(), "data", "atelierContent.json");

  if (fs.existsSync(primaryPath)) return primaryPath;
  if (fs.existsSync(fallbackPath)) return fallbackPath;
  return primaryPath;
}

export async function GET() {
  try {
    if (inMemoryContent) {
      return NextResponse.json({ success: true, content: inMemoryContent });
    }

    const filePath = getContentFilePath();
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(fileData);
      inMemoryContent = parsed;
      return NextResponse.json({ success: true, content: parsed });
    }

    return NextResponse.json({ success: true, content: defaultContent });
  } catch (error) {
    console.error("Erro ao ler conteúdo do ateliê:", error);
    return NextResponse.json({ success: true, content: defaultContent });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, content } = body;

    // Validação da senha
    if (!password || password.trim() !== DEFAULT_ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Acesso não autorizado. Senha incorreta." },
        { status: 401 }
      );
    }

    if (!content || typeof content !== "object") {
      return NextResponse.json(
        { success: false, error: "Estrutura de conteúdo inválida." },
        { status: 400 }
      );
    }

    // Atualiza cache em memória imediatamente
    inMemoryContent = content;

    // Tenta persistir no sistema de arquivos
    try {
      const primaryPath = path.join(process.cwd(), "src", "data", "atelierContent.json");
      const dir = path.dirname(primaryPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(primaryPath, JSON.stringify(content, null, 2), "utf-8");
    } catch (fsError) {
      console.warn("Aviso: Falha ao escrever no disco (esperado em Vercel read-only lambdas):", fsError);
    }

    return NextResponse.json({
      success: true,
      message: "Conteúdo das galerias salvo com sucesso!",
      content: inMemoryContent,
    });
  } catch (error) {
    console.error("Erro ao salvar conteúdo:", error);
    return NextResponse.json(
      { success: false, error: "Falha interna ao salvar conteúdo." },
      { status: 500 }
    );
  }
}
