import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "dayane2026";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const password = formData.get("password") as string | null;
    const file = formData.get("file") as File | null;
    const customLabel = formData.get("label") as string | null;

    if (!password || password.trim() !== DEFAULT_ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Acesso não autorizado. Senha incorreta." },
        { status: 401 }
      );
    }

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { success: false, error: "Nenhum arquivo enviado para upload." },
        { status: 400 }
      );
    }

    const rawName = file.name || "upload-media";
    const ext = path.extname(rawName).toLowerCase() || ".jpg";
    
    // Lista de extensões permitidas
    const validVideoExts = [".mp4", ".webm", ".mov", ".ogg"];
    const validImageExts = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const isVideo = validVideoExts.includes(ext);
    const isImage = validImageExts.includes(ext);

    if (!isVideo && !isImage) {
      return NextResponse.json(
        { success: false, error: `Formato de arquivo '${ext}' não suportado. Use imagens (JPG, PNG, WEBP) ou vídeos (MP4, WEBM, MOV).` },
        { status: 400 }
      );
    }

    // Sanitizar nome do arquivo para padrão web seguro
    const baseClean = path
      .basename(rawName, ext)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 40);

    const timestamp = Date.now().toString().slice(-6);
    const finalFileName = `${baseClean}-${timestamp}${ext}`;

    const midiasDir = path.join(process.cwd(), "public", "midias");
    if (!fs.existsSync(midiasDir)) {
      fs.mkdirSync(midiasDir, { recursive: true });
    }

    const targetFilePath = path.join(midiasDir, finalFileName);
    const buffer = Buffer.from(await file.arrayBuffer());

    try {
      fs.writeFileSync(targetFilePath, buffer);
    } catch (writeErr) {
      console.warn("Aviso ao salvar arquivo no disco:", writeErr);
      return NextResponse.json(
        { success: false, error: "Não foi possível gravar no disco do servidor (ambiente read-only)." },
        { status: 500 }
      );
    }

    const url = `/midias/${finalFileName}`;
    const mediaType: "video" | "image" = isVideo ? "video" : "image";

    return NextResponse.json({
      success: true,
      message: "Mídia enviada com sucesso!",
      item: {
        type: mediaType,
        src: url,
        alt: customLabel || rawName,
        label: customLabel || rawName,
      },
    });
  } catch (error) {
    console.error("Erro no upload de mídia:", error);
    return NextResponse.json(
      { success: false, error: "Falha interna ao processar upload." },
      { status: 500 }
    );
  }
}
