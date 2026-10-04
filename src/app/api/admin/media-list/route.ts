import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export interface MediaFileItem {
  name: string;
  url: string;
  type: "video" | "image";
  size: number;
  formattedSize: string;
  modifiedTime: number;
}

function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export async function GET() {
  try {
    const midiasDir = path.join(process.cwd(), "public", "midias");
    if (!fs.existsSync(midiasDir)) {
      return NextResponse.json({ success: true, files: [] });
    }

    const entries = fs.readdirSync(midiasDir, { withFileTypes: true });
    const mediaFiles: MediaFileItem[] = [];

    const videoExts = new Set([".mp4", ".webm", ".mov", ".ogg"]);
    const imageExts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

    for (const entry of entries) {
      if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        const isVideo = videoExts.has(ext);
        const isImage = imageExts.has(ext);

        if (isVideo || isImage) {
          try {
            const stat = fs.statSync(path.join(midiasDir, entry.name));
            mediaFiles.push({
              name: entry.name,
              url: `/midias/${entry.name}`,
              type: isVideo ? "video" : "image",
              size: stat.size,
              formattedSize: formatBytes(stat.size),
              modifiedTime: stat.mtimeMs,
            });
          } catch {
            // Se falhar o stat de algum arquivo, inclui apenas com dados básicos
            mediaFiles.push({
              name: entry.name,
              url: `/midias/${entry.name}`,
              type: isVideo ? "video" : "image",
              size: 0,
              formattedSize: "N/A",
              modifiedTime: Date.now(),
            });
          }
        }
      }
    }

    // Ordena os mais recentes primeiro
    mediaFiles.sort((a, b) => b.modifiedTime - a.modifiedTime);

    return NextResponse.json({
      success: true,
      count: mediaFiles.length,
      files: mediaFiles,
    });
  } catch (error) {
    console.error("Erro ao listar mídias:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao listar mídias do ateliê." },
      { status: 500 }
    );
  }
}
