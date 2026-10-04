"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import defaultContent from "@/data/atelierContent.json";

type GalleryCategory =
  | "megahair"
  | "mechas"
  | "olhar"
  | "unhas"
  | "bronze"
  | "laser"
  | "espaco";

interface GalleryItem {
  type: "image" | "video";
  src: string;
  alt: string;
  label: string;
}

interface AtelierContent {
  megahair: GalleryItem[];
  mechas: GalleryItem[];
  olhar: GalleryItem[];
  unhas: GalleryItem[];
  bronze: GalleryItem[];
  laser: GalleryItem[];
  espaco: GalleryItem[];
}

interface MediaFileItem {
  name: string;
  url: string;
  type: "video" | "image";
  size: number;
  formattedSize: string;
  modifiedTime: number;
}

const CATEGORIES: { id: GalleryCategory; label: string; icon: string; desc: string }[] = [
  { id: "megahair", label: "Mega Hair", icon: "👑", desc: "Nanocápsulas & Transformações de Extensão" },
  { id: "mechas", label: "Loiros & Mechas", icon: "✨", desc: "Iluminações Personalizadas & Balayage" },
  { id: "olhar", label: "Olhar & Cílios", icon: "👁️", desc: "Extensão de Cílios & Sobrancelhas VIP" },
  { id: "unhas", label: "Unhas & Gel", icon: "💅", desc: "Alongamento em Fibra de Vidro & Gel" },
  { id: "bronze", label: "Bronzeamento", icon: "☀️", desc: "Bronze por Vaporização & Rituais" },
  { id: "laser", label: "Laser Subzero", icon: "❄️", desc: "Depilação a Laser com Ponteira Resfriada" },
  { id: "espaco", label: "Espaço Ateliê", icon: "🏛️", desc: "Ambiente Boutique & Conforto VIP" },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<GalleryCategory>("megahair");
  const [content, setContent] = useState<AtelierContent>(defaultContent as AtelierContent);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Modal de Adicionar Mídia
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [addMode, setAddMode] = useState<"library" | "upload" | "url">("library");

  // Biblioteca de arquivos no servidor
  const [libraryFiles, setLibraryFiles] = useState<MediaFileItem[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState<boolean>(false);
  const [libraryFilter, setLibraryFilter] = useState<"all" | "video" | "image">("all");
  const [librarySearch, setLibrarySearch] = useState<string>("");

  // Upload local
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadLabel, setUploadLabel] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Link Manual / URL
  const [manualUrl, setManualUrl] = useState<string>("");
  const [manualLabel, setManualLabel] = useState<string>("");
  const [manualType, setManualType] = useState<"video" | "image">("image");

  // Ao montar, verifica sessão salva e carrega dados
  useEffect(() => {
    const savedToken = sessionStorage.getItem("dl_admin_auth");
    if (savedToken) {
      setIsAuthenticated(true);
      loadContent();
    }
  }, []);

  const loadContent = async () => {
    try {
      // 1. Tenta carregar do cache local
      const localCached = localStorage.getItem("atelier_content_override");
      if (localCached) {
        try {
          const parsed = JSON.parse(localCached);
          if (parsed && typeof parsed === "object") {
            setContent(parsed);
          }
        } catch {}
      }

      // 2. Busca do endpoint da API
      const res = await fetch("/api/admin/content", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.content) {
          setContent(data.content);
        }
      }
    } catch (err) {
      console.error("Falha ao carregar conteúdo:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("dl_admin_auth", password);
        setIsAuthenticated(true);
        loadContent();
      } else {
        setAuthError(data.error || "Senha incorreta. Tente novamente.");
      }
    } catch {
      setAuthError("Erro de comunicação com o servidor.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("dl_admin_auth");
    setIsAuthenticated(false);
    setPassword("");
  };

  const currentPassword = () => {
    return sessionStorage.getItem("dl_admin_auth") || password || "dayane2026";
  };

  // Reordenação de itens
  const moveItem = (index: number, direction: "up" | "down") => {
    const items = [...content[activeTab]];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;

    setContent((prev) => ({
      ...prev,
      [activeTab]: items,
    }));
    setHasUnsavedChanges(true);
  };

  // Remover item
  const removeItem = (index: number) => {
    const item = content[activeTab][index];
    const confirmDelete = window.confirm(
      `Deseja realmente remover esta mídia da galeria?\n"${item.label || item.src}"`
    );
    if (!confirmDelete) return;

    const items = content[activeTab].filter((_, i) => i !== index);
    setContent((prev) => ({
      ...prev,
      [activeTab]: items,
    }));
    setHasUnsavedChanges(true);
  };

  // Salvar no servidor e persistir no site
  const handleSaveAll = async () => {
    setSaveStatus("saving");
    setStatusMessage("Salvando alterações...");

    try {
      const pwd = currentPassword();
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: pwd,
          content: content,
        }),
      });

      const data = await res.json();
      if (data.success) {
        // Salva cópia localmente para reflexo instantâneo no navegador
        localStorage.setItem("atelier_content_override", JSON.stringify(content));
        // Dispara evento de storage para qualquer aba aberta do site atualizar instantaneamente
        window.dispatchEvent(new Event("storage"));

        setSaveStatus("saved");
        setStatusMessage("Galeria salva com sucesso!");
        setHasUnsavedChanges(false);

        setTimeout(() => {
          setSaveStatus("idle");
          setStatusMessage("");
        }, 4000);
      } else {
        setSaveStatus("error");
        setStatusMessage(data.error || "Erro ao salvar alterações no servidor.");
      }
    } catch {
      setSaveStatus("error");
      setStatusMessage("Erro de rede ao conectar com o servidor.");
    }
  };

  // Resetar galeria atual para os padrões de fábrica
  const handleResetCurrent = () => {
    const confirmReset = window.confirm(
      `Restaurar a galeria "${CATEGORIES.find((c) => c.id === activeTab)?.label}" para a lista original de mídias?`
    );
    if (!confirmReset) return;

    const defaultItems = (defaultContent as any)[activeTab] || [];
    setContent((prev) => ({
      ...prev,
      [activeTab]: defaultItems,
    }));
    setHasUnsavedChanges(true);
  };

  // Abrir modal de biblioteca e carregar arquivos
  const openAddModal = () => {
    setIsAddModalOpen(true);
    fetchLibraryFiles();
  };

  const fetchLibraryFiles = async () => {
    setLoadingLibrary(true);
    try {
      const res = await fetch("/api/admin/media-list");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.files) {
          setLibraryFiles(data.files);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar biblioteca:", err);
    } finally {
      setLoadingLibrary(false);
    }
  };

  // Adicionar item da biblioteca
  const addFromLibrary = (file: MediaFileItem) => {
    const cleanLabel = file.name
      .replace(/[-_]/g, " ")
      .replace(/\.(mp4|webm|jpg|jpeg|png|webp)/gi, "")
      .replace(/dayane/gi, "")
      .trim();

    const newItem: GalleryItem = {
      type: file.type,
      src: file.url,
      alt: cleanLabel || file.name,
      label: cleanLabel ? cleanLabel.toUpperCase() : "MÍDIA ATELIÊ",
    };

    setContent((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newItem],
    }));
    setHasUnsavedChanges(true);
    setIsAddModalOpen(false);
  };

  // Upload de arquivo
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("password", currentPassword());
      formData.append("file", uploadFile);
      if (uploadLabel) formData.append("label", uploadLabel);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.item) {
        setContent((prev) => ({
          ...prev,
          [activeTab]: [...prev[activeTab], data.item],
        }));
        setHasUnsavedChanges(true);
        setIsAddModalOpen(false);
        setUploadFile(null);
        setUploadLabel("");
      } else {
        alert(data.error || "Falha no upload do arquivo.");
      }
    } catch (err) {
      alert("Erro ao enviar arquivo para o servidor.");
    } finally {
      setIsUploading(false);
    }
  };

  // Adicionar via URL manual
  const handleManualUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualUrl) return;

    const isVideo =
      manualType === "video" ||
      manualUrl.endsWith(".mp4") ||
      manualUrl.endsWith(".webm") ||
      manualUrl.includes("video");

    const newItem: GalleryItem = {
      type: isVideo ? "video" : "image",
      src: manualUrl.trim(),
      alt: manualLabel.trim() || "Mídia Dayane Lima",
      label: (manualLabel.trim() || "Mídia Adicionada").toUpperCase(),
    };

    setContent((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newItem],
    }));
    setHasUnsavedChanges(true);
    setIsAddModalOpen(false);
    setManualUrl("");
    setManualLabel("");
  };

  // Filtragem da biblioteca
  const filteredLibrary = libraryFiles.filter((file) => {
    const matchesType =
      libraryFilter === "all" ? true : file.type === libraryFilter;
    const matchesSearch =
      librarySearch.trim() === ""
        ? true
        : file.name.toLowerCase().includes(librarySearch.toLowerCase());
    return matchesType && matchesSearch;
  });

  // =========================================================================
  // TELA 1: LOGIN LUXURY MINIMAL
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0E0C0A] text-[#FAF3F0] flex flex-col items-center justify-center p-4 selection:bg-[#C5A880]/30 selection:text-[#FAF3F0]">
        <div className="w-full max-w-sm bg-[#161412] border border-[#C5A880]/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Brilho decorativo de fundo */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Cabeçalho do Card */}
          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-[#1E1B18] to-[#2A2622] border border-[#C5A880]/40 flex items-center justify-center text-2xl shadow-inner">
              ✨
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#C5A880] block mb-1">
              Painel de Curadoria
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-white tracking-wide font-normal">
              Dayane Lima
            </h1>
            <p className="text-xs text-stone-400 mt-2 font-light">
              Gestão ágil de fotos e vídeos da Landing Page
            </p>
          </div>

          {/* Formulário de Senha */}
          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">
                Senha de Acesso
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha administrativa..."
                className="w-full bg-[#1F1B18] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#C5A880] transition-colors"
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-950/60 border border-red-800/50 rounded-xl text-red-200 text-xs flex items-center gap-2">
                <span>⚠️</span>
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-gradient-to-r from-[#C5A880] to-[#B3936A] hover:from-[#D4B991] hover:to-[#C5A880] text-[#1C1917] font-semibold py-3.5 px-4 rounded-xl text-sm transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
            >
              {authLoading ? "Verificando..." : "Entrar no Painel"}
            </button>
          </form>

          {/* Link para voltar ao site */}
          <div className="mt-6 text-center border-t border-white/5 pt-4">
            <Link
              href="/"
              className="text-xs text-stone-400 hover:text-[#C5A880] transition-colors flex items-center justify-center gap-1"
            >
              <span>← Voltar à Landing Page</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // TELA 2: DASHBOARD ADMINISTRATIVO PRINCIPAL (MOBILE FIRST)
  // =========================================================================
  const currentCategory = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];
  const currentItems = content[activeTab] || [];

  return (
    <div className="min-h-screen bg-[#0E0C0A] text-[#FAF3F0] pb-32">
      {/* 1. BARRA SUPERIOR FIXA */}
      <header className="sticky top-0 z-40 bg-[#161412]/95 backdrop-blur-md border-b border-white/10 px-4 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2A2622] border border-[#C5A880]/30 flex items-center justify-center text-sm font-serif text-[#C5A880]">
              DL
            </div>
            <div>
              <h1 className="font-serif text-base sm:text-lg text-white font-medium leading-none">
                Ateliê Dayane Lima
              </h1>
              <span className="text-[10px] tracking-wider text-[#C5A880] uppercase">
                Painel Administrativo Mobile
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 text-xs text-stone-300 hover:text-white hover:border-white/30 transition-colors"
            >
              <span>👁️ Ver Site ao Vivo</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-stone-300 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* 2. BARRA DE NOTIFICAÇÃO / SALVAMENTO */}
      {statusMessage && (
        <div
          className={`sticky top-[57px] z-30 px-4 py-2.5 text-xs text-center font-medium transition-all ${
            saveStatus === "saved"
              ? "bg-emerald-950/90 text-emerald-200 border-b border-emerald-800"
              : saveStatus === "error"
              ? "bg-red-950/90 text-red-200 border-b border-red-800"
              : "bg-[#1E1B18] text-[#C5A880] border-b border-[#C5A880]/30"
          }`}
        >
          {statusMessage}
        </div>
      )}

      <main className="max-w-5xl mx-auto px-4 pt-4 sm:pt-6">
        {/* 3. SELETOR DE GALERIAS (SCROLL HORIZONTAL NO MOBILE) */}
        <div className="mb-6">
          <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-2 flex items-center justify-between">
            <span>Selecione a Seção para Gerenciar:</span>
            <span className="text-[#C5A880] font-normal">
              {currentItems.length} {currentItems.length === 1 ? "mídia ativa" : "mídias ativas"}
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {CATEGORIES.map((cat) => {
              const count = (content[cat.id] || []).length;
              const isActive = activeTab === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#2A241F] border-[#C5A880] text-white shadow-md shadow-[#C5A880]/10"
                      : "bg-[#161412] border-white/5 text-stone-400 hover:text-stone-200 hover:border-white/15"
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span className="whitespace-nowrap">{cat.label}</span>
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                      isActive
                        ? "bg-[#C5A880] text-[#1C1917] font-bold"
                        : "bg-white/10 text-stone-300"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. CABEÇALHO DA GALERIA ATIVA */}
        <div className="bg-[#161412] border border-white/10 rounded-2xl p-4 sm:p-5 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{currentCategory.icon}</span>
              <h2 className="font-serif text-lg sm:text-xl text-white font-medium">
                {currentCategory.label}
              </h2>
            </div>
            <p className="text-xs text-stone-400 mt-1">{currentCategory.desc}</p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleResetCurrent}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-400 hover:text-stone-200 text-xs border border-white/10 transition-colors"
              title="Restaurar padrão inicial"
            >
              ↺ Restaurar
            </button>
            <button
              onClick={openAddModal}
              className="flex items-center gap-1.5 bg-[#C5A880] hover:bg-[#D4B991] text-[#1C1917] font-semibold px-4 py-2 rounded-xl text-xs shadow-md transition-all active:scale-[0.98]"
            >
              <span>+ Adicionar Mídia</span>
            </button>
          </div>
        </div>

        {/* 5. LISTA DE ITENS DA GALERIA ATIVA */}
        {currentItems.length === 0 ? (
          <div className="bg-[#161412] border border-dashed border-white/10 rounded-2xl p-8 text-center">
            <span className="text-3xl block mb-2">📂</span>
            <p className="text-stone-300 text-sm font-medium">Nenhuma mídia cadastrada nesta galeria.</p>
            <p className="text-stone-500 text-xs mt-1">
              Toque no botão &quot;Adicionar Mídia&quot; acima para incluir fotos ou vídeos.
            </p>
            <button
              onClick={openAddModal}
              className="mt-4 px-4 py-2 bg-[#2A241F] border border-[#C5A880]/40 text-[#C5A880] rounded-xl text-xs font-medium"
            >
              Adicionar primeira mídia
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {currentItems.map((item, index) => {
              const isFirst = index === 0;
              const isLast = index === currentItems.length - 1;

              return (
                <div
                  key={`${item.src}-${index}`}
                  className="bg-[#161412] border border-white/10 hover:border-[#C5A880]/30 rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 transition-colors"
                >
                  {/* Posição / Índice */}
                  <div className="w-6 text-center font-mono text-xs text-stone-500 font-medium">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Thumbnail / Miniatura Visual */}
                  <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-white/10">
                    {item.type === "video" ? (
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.src}
                        alt={item.alt || "Mídia"}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}

                    {/* Tag de tipo no card */}
                    <span
                      className={`absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                        item.type === "video"
                          ? "bg-rose-900/90 text-rose-200 border border-rose-700/50"
                          : "bg-blue-900/90 text-blue-200 border border-blue-700/50"
                      }`}
                    >
                      {item.type === "video" ? "Vídeo" : "Foto"}
                    </span>
                  </div>

                  {/* Informações da Mídia */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880]">
                        {item.label || "Mídia do Ateliê"}
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 font-mono truncate" title={item.src}>
                      {item.src}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => {
                          const updated = [...currentItems];
                          updated[index] = { ...updated[index], label: e.target.value };
                          setContent((prev) => ({ ...prev, [activeTab]: updated }));
                          setHasUnsavedChanges(true);
                        }}
                        placeholder="Nome da mídia..."
                        className="bg-[#1F1B18] border border-white/10 rounded-lg px-2.5 py-1 text-[11px] text-stone-200 w-full max-w-[220px] focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  {/* Botões de Ação (Subir, Descer, Deletar) */}
                  <div className="flex flex-col sm:flex-row items-center gap-1 flex-shrink-0">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveItem(index, "up")}
                        disabled={isFirst}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-20 flex items-center justify-center text-xs text-stone-300 transition-colors"
                        title="Mover para cima"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveItem(index, "down")}
                        disabled={isLast}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-20 flex items-center justify-center text-xs text-stone-300 transition-colors"
                        title="Mover para baixo"
                      >
                        ▼
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(index)}
                      className="w-8 h-8 rounded-lg bg-red-950/30 hover:bg-red-900/50 border border-red-800/30 flex items-center justify-center text-xs text-red-300 transition-colors"
                      title="Excluir mídia"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* 6. BARRA FLUTUANTE DE SALVAMENTO FIXA NO RODAPÉ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#161412]/95 backdrop-blur-xl border-t border-white/10 p-3 sm:p-4 shadow-2xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                hasUnsavedChanges
                  ? "bg-amber-400 animate-pulse"
                  : "bg-emerald-400"
              }`}
            />
            <span className="text-xs text-stone-300 font-medium">
              {hasUnsavedChanges
                ? "Alterações pendentes não salvas"
                : "Tudo atualizado e sincronizado"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="sm:hidden px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-stone-300"
            >
              👁️ Ver Site
            </Link>

            <button
              onClick={handleSaveAll}
              disabled={saveStatus === "saving"}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-xl transition-all active:scale-[0.98] ${
                hasUnsavedChanges
                  ? "bg-gradient-to-r from-[#C5A880] to-[#B3936A] hover:from-[#D4B991] text-[#1C1917]"
                  : "bg-[#2A2622] hover:bg-[#35302B] text-stone-300 border border-white/10"
              }`}
            >
              {saveStatus === "saving" ? (
                <>
                  <span className="animate-spin text-sm">↻</span>
                  <span>Gravando...</span>
                </>
              ) : (
                <>
                  <span>💾</span>
                  <span>Salvar Alterações</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 7. MODAL DE ADIÇÃO DE MÍDIA */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#161412] border border-white/15 w-full max-w-2xl rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Cabeçalho do Modal */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg text-white font-medium">
                  Adicionar Mídia em &quot;{currentCategory.label}&quot;
                </h3>
                <p className="text-xs text-stone-400">
                  Escolha como deseja adicionar o novo vídeo ou foto
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Abas do Modal */}
            <div className="flex border-b border-white/10 bg-[#12100E] px-4">
              <button
                onClick={() => setAddMode("library")}
                className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors ${
                  addMode === "library"
                    ? "border-[#C5A880] text-[#C5A880]"
                    : "border-transparent text-stone-400 hover:text-stone-200"
                }`}
              >
                🏛️ Biblioteca do Ateliê
              </button>
              <button
                onClick={() => setAddMode("upload")}
                className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors ${
                  addMode === "upload"
                    ? "border-[#C5A880] text-[#C5A880]"
                    : "border-transparent text-stone-400 hover:text-stone-200"
                }`}
              >
                📱 Upload do Celular
              </button>
              <button
                onClick={() => setAddMode("url")}
                className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors ${
                  addMode === "url"
                    ? "border-[#C5A880] text-[#C5A880]"
                    : "border-transparent text-stone-400 hover:text-stone-200"
                }`}
              >
                🔗 Link / URL Direta
              </button>
            </div>

            {/* Conteúdo da Aba 1: Biblioteca do Servidor */}
            {addMode === "library" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Filtros de busca */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={librarySearch}
                    onChange={(e) => setLibrarySearch(e.target.value)}
                    placeholder="Buscar por nome do arquivo (ex: megahair, bronze, cilios)..."
                    className="flex-1 bg-[#1F1B18] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C5A880]"
                  />
                  <div className="flex gap-1">
                    {(["all", "video", "image"] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setLibraryFilter(filter)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-colors ${
                          libraryFilter === filter
                            ? "bg-[#C5A880] text-[#1C1917]"
                            : "bg-white/5 text-stone-400 hover:text-stone-200"
                        }`}
                      >
                        {filter === "all" ? "Todos" : filter === "video" ? "Vídeos" : "Fotos"}
                      </button>
                    ))}
                  </div>
                </div>

                {loadingLibrary ? (
                  <div className="p-8 text-center text-xs text-stone-400">
                    <span className="animate-spin text-xl block mb-2">↻</span>
                    Carregando arquivos de mídia do ateliê...
                  </div>
                ) : filteredLibrary.length === 0 ? (
                  <div className="p-8 text-center text-xs text-stone-500">
                    Nenhum arquivo encontrado com os filtros atuais.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {filteredLibrary.map((file) => (
                      <div
                        key={file.name}
                        onClick={() => addFromLibrary(file)}
                        className="group relative bg-[#1B1815] border border-white/10 hover:border-[#C5A880] rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] flex flex-col"
                      >
                        {/* Prévia */}
                        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                          {file.type === "video" ? (
                            <video
                              src={file.url}
                              className="w-full h-full object-cover"
                              muted
                              preload="metadata"
                            />
                          ) : (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={file.url}
                              alt={file.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          )}

                          <span
                            className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                              file.type === "video"
                                ? "bg-rose-900/90 text-rose-200 border border-rose-700/50"
                                : "bg-blue-900/90 text-blue-200 border border-blue-700/50"
                            }`}
                          >
                            {file.type === "video" ? "Vídeo" : "Foto"}
                          </span>

                          <span className="absolute bottom-1 right-1 bg-black/70 px-1 rounded text-[9px] font-mono text-stone-300">
                            {file.formattedSize}
                          </span>
                        </div>

                        {/* Nome do arquivo */}
                        <div className="p-2 flex-1 flex flex-col justify-between">
                          <p className="text-[11px] text-stone-300 truncate font-mono" title={file.name}>
                            {file.name}
                          </p>
                          <span className="text-[10px] text-[#C5A880] font-medium mt-1 group-hover:underline">
                            + Toque para Inserir
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Conteúdo da Aba 2: Upload direto */}
            {addMode === "upload" && (
              <form onSubmit={handleUploadSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/20 hover:border-[#C5A880]/60 rounded-2xl p-6 text-center cursor-pointer bg-[#12100E] transition-colors"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadFile(e.target.files[0]);
                        if (!uploadLabel) {
                          setUploadLabel(
                            e.target.files[0].name.replace(/\.[^/.]+$/, "").toUpperCase()
                          );
                        }
                      }
                    }}
                    className="hidden"
                  />

                  {uploadFile ? (
                    <div>
                      <span className="text-3xl block mb-2">✅</span>
                      <p className="text-sm font-medium text-white">{uploadFile.name}</p>
                      <p className="text-xs text-stone-400 mt-1">
                        {(uploadFile.size / (1024 * 1024)).toFixed(2)} MB · Toque para trocar
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-3xl block mb-2">📸</span>
                      <p className="text-sm font-medium text-white">
                        Toque para selecionar foto ou vídeo do celular
                      </p>
                      <p className="text-xs text-stone-500 mt-1">
                        Suporta MP4, WEBM, JPG, PNG, WEBP
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                    Título / Etiqueta da Mídia
                  </label>
                  <input
                    type="text"
                    value={uploadLabel}
                    onChange={(e) => setUploadLabel(e.target.value)}
                    placeholder="Ex: TRANSFORMAÇÃO NANO, MORENA ILUMINADA..."
                    className="w-full bg-[#1F1B18] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!uploadFile || isUploading}
                  className="w-full bg-gradient-to-r from-[#C5A880] to-[#B3936A] hover:from-[#D4B991] text-[#1C1917] font-semibold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg disabled:opacity-40 transition-all"
                >
                  {isUploading ? "Enviando arquivo..." : "Fazer Upload & Adicionar"}
                </button>
              </form>
            )}

            {/* Conteúdo da Aba 3: URL Manual */}
            {addMode === "url" && (
              <form onSubmit={handleManualUrlSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                    Tipo de Mídia
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setManualType("video")}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        manualType === "video"
                          ? "bg-rose-950/80 border-rose-500 text-rose-200"
                          : "bg-white/5 border-white/10 text-stone-400"
                      }`}
                    >
                      🎥 Vídeo (MP4 / WebM)
                    </button>
                    <button
                      type="button"
                      onClick={() => setManualType("image")}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        manualType === "image"
                          ? "bg-blue-950/80 border-blue-500 text-blue-200"
                          : "bg-white/5 border-white/10 text-stone-400"
                      }`}
                    >
                      🖼️ Foto / Imagem (JPG / PNG)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                    Caminho do Arquivo ou URL
                  </label>
                  <input
                    type="text"
                    value={manualUrl}
                    onChange={(e) => setManualUrl(e.target.value)}
                    placeholder="Ex: /midias/video-novo.mp4 ou https://..."
                    className="w-full bg-[#1F1B18] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C5A880]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 mb-1.5 font-medium">
                    Título / Etiqueta Visual
                  </label>
                  <input
                    type="text"
                    value={manualLabel}
                    onChange={(e) => setManualLabel(e.target.value)}
                    placeholder="Ex: ACABAMENTO IMPECÁVEL"
                    className="w-full bg-[#1F1B18] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!manualUrl.trim()}
                  className="w-full bg-[#C5A880] hover:bg-[#D4B991] text-[#1C1917] font-semibold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg disabled:opacity-40 transition-all"
                >
                  Adicionar à Galeria
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
