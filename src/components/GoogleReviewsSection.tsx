"use client";

import React, { useState } from "react";
import { 
  Star, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  MessageSquareHeart, 
  Maximize2, 
  X 
} from "lucide-react";

interface GoogleReviewsSectionProps {
  onOpenTriage?: () => void;
}

interface TestimonialItem {
  id: string;
  type: "video" | "image";
  src: string;
  title: string;
  category: "video" | "print";
  tag: string;
}

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/R.+Calced%C3%B4nia,+155+-+Monte+Carmelo,+Montes+Claros+-+MG";

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "dep-1",
    type: "video",
    src: "/midias/depoimento-clientes-dayane1.mp4",
    title: "Relato de Transformação & Autoestima",
    category: "video",
    tag: "Vídeo Real",
  },
  {
    id: "dep-2",
    type: "video",
    src: "/midias/depoimento-clientes-dayane2.mp4",
    title: "Experiência de Aplicação & Conforto",
    category: "video",
    tag: "Vídeo Real",
  },
  {
    id: "dep-3",
    type: "video",
    src: "/midias/depoimento-clientes-dayane3.mp4",
    title: "Resultado Natural & Leveza dos Fios",
    category: "video",
    tag: "Vídeo Real",
  },
  {
    id: "dep-4",
    type: "video",
    src: "/midias/depoimento-clientes-dayane4.mp4",
    title: "Satisfação com o Atendimento VIP",
    category: "video",
    tag: "Vídeo Real",
  },
  {
    id: "dep-5",
    type: "image",
    src: "/midias/depoimento-clientes-dayane5.jpg",
    title: "Mensagem Espontânea no WhatsApp",
    category: "print",
    tag: "Print do WhatsApp",
  },
  {
    id: "dep-6",
    type: "video",
    src: "/midias/depoimento-clientes-dayane6.mp4",
    title: "Elogio ao Mega Hair e Fios Nobres",
    category: "video",
    tag: "Vídeo Real",
  },
  {
    id: "dep-7",
    type: "video",
    src: "/midias/depoimento-clientes-dayane7.mp4",
    title: "Preservação da Raiz e Confiança",
    category: "video",
    tag: "Vídeo Real",
  },
  {
    id: "dep-8",
    type: "video",
    src: "/midias/depoimento-clientes-dayane8.mp4",
    title: "Recomendação do Ateliê Monte Carmelo",
    category: "video",
    tag: "Vídeo Real",
  },
  {
    id: "dep-9",
    type: "image",
    src: "/midias/depoimento-clientes-dayane9.jpg",
    title: "Feedback de Carinho pós-Procedimento",
    category: "print",
    tag: "Print do WhatsApp",
  },
  {
    id: "dep-10",
    type: "video",
    src: "/midias/depoimento-clientes-dayane10.mp4",
    title: "Sensação de Leveza e Acabamento",
    category: "video",
    tag: "Vídeo Real",
  },
  {
    id: "dep-11",
    type: "image",
    src: "/midias/depoimento-clientes-dayane11.jpg",
    title: "Reconhecimento do Atendimento Exclusivo",
    category: "print",
    tag: "Print do WhatsApp",
  },
  {
    id: "dep-12",
    type: "video",
    src: "/midias/depoimento-clientes-dayane12.mp4",
    title: "Fidelidade e Paixão pelo Resultado",
    category: "video",
    tag: "Vídeo Real",
  },
];

export function GoogleReviewsSection({ onOpenTriage }: GoogleReviewsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "video" | "print">("all");
  const [modalItem, setModalItem] = useState<TestimonialItem | null>(null);

  const filteredItems = activeFilter === "all"
    ? TESTIMONIALS
    : TESTIMONIALS.filter((item) => item.category === activeFilter);

  return (
    <section
      id="avaliacoes"
      aria-labelledby="google-reviews-heading"
      className="relative z-10 py-16 md:py-24 bg-[#FAF3F0] border-b border-[#E8D0C8] scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Divisor Decorativo Superior */}
        <div className="w-full flex items-center justify-center pb-8 sm:pb-10" aria-hidden="true">
          <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
          <div className="mx-3 w-1.5 h-1.5 rotate-45 border border-[#C5A880]/60 bg-[#FAF3F0]" />
          <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
        </div>

        {/* ===================== 1. CABEÇALHO EDITORIAL ===================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8D0C8] text-[#6E501E] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <div className="flex items-center gap-1 text-[#C5A880]">
              <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
            </div>
            <span>Prova Social Autêntica • Google 5.0 & Depoimentos</span>
          </div>

          <h2
            id="google-reviews-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight [text-wrap:balance]"
          >
            Excelência Reconhecida no{" "}
            <span className="italic font-normal font-serif text-[#C58B7E]">
              Monte Carmelo
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#44403C] font-sans leading-relaxed [text-wrap:pretty]">
            Depoimentos espontâneos e mensagens reais de clientes atendidas por Dayane Lima e equipe na Rua Calcedônia, 155.
          </p>
        </div>

        {/* ===================== 2. HERO CARD CONSOLIDADO DE REPUTAÇÃO GOOGLE ===================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E8D0C8] shadow-sm mb-14 relative overflow-hidden">
          {/* Brilho decorativo sutil */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(197,168,128,0.15),transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Bloco de Nota e Estrelas */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-[#E8D0C8] pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-3 mb-2">
                {/* Logo Oficial Colorido Google */}
                <svg className="w-8 h-8" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="font-serif font-bold text-4xl sm:text-5xl text-[#1C1917] tracking-tight">
                  5.0
                </span>
              </div>

              {/* 5 Estrelas Douradas */}
              <div className="flex items-center gap-1.5 text-amber-500 mb-2" aria-label="Classificação 5 estrelas de 5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-500" />
                ))}
              </div>

              <p className="text-xs font-sans text-[#44403C] font-semibold uppercase tracking-wider">
                Classificação Máxima no Google
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-medium mt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Perfil Oficial Verificado no Google Maps</span>
              </div>
            </div>

            {/* Selos de Autoridade e Pilares Clínicos */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1917]">
                Padrão de Excelência Dayane Lima
              </h3>
              <p className="text-xs sm:text-sm text-[#44403C] font-sans leading-relaxed">
                Cada transformação no ateliê reflete o compromisso com horário individual, produtos nobres e preservação biológica da raiz.
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs font-sans">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF3F0] border border-[#E8D0C8] text-[#1C1917]">
                  <ShieldCheck className="w-4 h-4 text-[#8F6E32] shrink-0" />
                  <span className="font-medium">Tração Zero & Saúde</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF3F0] border border-[#E8D0C8] text-[#1C1917]">
                  <Sparkles className="w-4 h-4 text-[#8F6E32] shrink-0" />
                  <span className="font-medium">Nanocápsulas 0.5mm</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF3F0] border border-[#E8D0C8] text-[#1C1917]">
                  <Heart className="w-4 h-4 text-[#8F6E32] shrink-0" />
                  <span className="font-medium">Cabine Privativa VIP</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF3F0] border border-[#E8D0C8] text-[#1C1917]">
                  <CheckCircle2 className="w-4 h-4 text-[#8F6E32] shrink-0" />
                  <span className="font-medium">Horário Exclusivo</span>
                </div>
              </div>
            </div>

            {/* Botão de Destaque para Avaliar no Google Maps (High-Contrast & CRO) */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center text-center pt-4 lg:pt-0">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex flex-col items-center justify-center gap-2.5 p-5 sm:p-6 rounded-2xl bg-[#1C1917] hover:bg-[#28231E] border-2 border-[#C5A880] text-white shadow-2xl shadow-[#1C1917]/30 hover:shadow-[#C5A880]/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] group ring-1 ring-[#C5A880]/30"
              >
                <div className="flex items-center gap-1 text-[#C5A880]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#C5A880] text-[#C5A880] group-hover:scale-110 transition-transform duration-200"
                      style={{ transitionDelay: `${i * 35}ms` }}
                    />
                  ))}
                </div>

                <span className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider text-[#FAF3F0] group-hover:text-[#E6C99B] transition-colors text-center leading-snug">
                  Deixe sua Avaliação 5 Estrelas no Google
                </span>

                <span className="inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold text-[#E6C99B] group-hover:text-white transition-colors">
                  <span>Avaliar no Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </a>

              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-stone-500 hover:text-[#6E501E] font-sans mt-3 underline underline-offset-4 transition-colors flex items-center gap-1"
              >
                <span>Conferir ficha na Rua Calcedônia, 155</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>

        {/* ===================== 3. FILTRO DOS DEPOIMENTOS REAIS ===================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#6E501E] block">
              Galeria de Depoimentos Reais
            </span>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1C1917] mt-0.5">
              O Que Nossas Clientes Dizem
            </h3>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-[#E8D0C8] shadow-xs">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-[#1C1917] text-white shadow-xs"
                  : "text-[#6E501E] hover:text-[#1C1917]"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveFilter("video")}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
                activeFilter === "video"
                  ? "bg-[#1C1917] text-white shadow-xs"
                  : "text-[#6E501E] hover:text-[#1C1917]"
              }`}
            >
              Vídeos
            </button>
            <button
              onClick={() => setActiveFilter("print")}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
                activeFilter === "print"
                  ? "bg-[#1C1917] text-white shadow-xs"
                  : "text-[#6E501E] hover:text-[#1C1917]"
              }`}
            >
              Fotos
            </button>
          </div>
        </div>

        {/* ===================== 4. GRADE DOS DEPOIMENTOS REAIS (VÍDEOS & FOTOS) ===================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-4 border border-[#E8D0C8] shadow-xs hover:border-[#C5A880] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Contêiner da Mídia Pura (Vídeo ou Foto) */}
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/20 shadow-inner">
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    onClick={() => setModalItem(item)}
                    className="w-full h-full cursor-zoom-in relative group/img flex items-center justify-center bg-[#FAF3F0]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-2 rounded-full bg-white/90 text-[#1C1917] shadow-lg">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Informações e Legenda de Veracidade */}
              <div className="mt-3.5 space-y-1.5">
                <h4 className="font-serif font-bold text-sm text-[#1C1917] leading-snug line-clamp-1">
                  {item.title}
                </h4>

                {/* Legenda Sutil Atestando Veracidade */}
                <div className="flex items-center gap-1.5 text-[11px] text-stone-600 font-sans pt-1 border-t border-[#F0EAE1]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="leading-tight">
                    Print/Vídeo real de cliente atendida no Ateliê Dayane Lima
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===================== 5. CALL TO ACTION CONCIERGE ===================== */}
        {onOpenTriage && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={onOpenTriage}
              className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-8 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <MessageSquareHeart className="w-4 h-4 text-[#E6C99B]" />
              <span>Agendar Minha Experiência VIP</span>
            </button>
          </div>
        )}

      </div>

      {/* ===================== MODAL DE VISUALIZAÇÃO AMPLIADA (LIGHTBOX) ===================== */}
      {modalItem && (
        <div 
          onClick={() => setModalItem(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-[#161412] border border-white/20 rounded-3xl overflow-hidden shadow-2xl p-4 flex flex-col items-center"
          >
            <button
              onClick={() => setModalItem(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
              aria-label="Fechar ampliação"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black">
              {modalItem.type === "video" ? (
                <video
                  src={modalItem.src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[75vh] w-auto object-contain"
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={modalItem.src}
                  alt={modalItem.title}
                  className="max-h-[75vh] w-auto object-contain rounded-xl"
                />
              )}
            </div>

            <div className="w-full mt-3 text-center">
              <h4 className="font-serif text-white text-base font-medium">
                {modalItem.title}
              </h4>
              <p className="text-xs text-stone-400 font-sans mt-0.5 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Print/Vídeo real de cliente atendida no Ateliê Dayane Lima</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GoogleReviewsSection;
