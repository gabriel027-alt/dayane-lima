"use client";

import React from "react";
import { Star, CheckCircle2, ExternalLink, ShieldCheck, Heart, Sparkles, MessageSquareHeart } from "lucide-react";

interface GoogleReviewsSectionProps {
  onOpenTriage?: () => void;
}

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Est%C3%A9tica+e+beleza+sol+e+broze/@-16.7455823,-43.8647035,17z/data=!4m8!3m7!1s0x752dd71787d558b:0x7d0fa284ef755f11!8m2!3d-16.7455823!4d-43.8647035!9m1!1b1";

export function GoogleReviewsSection({ onOpenTriage }: GoogleReviewsSectionProps) {
  return (
    <section
      id="avaliacoes"
      aria-labelledby="google-reviews-heading"
      className="relative z-10 py-16 md:py-24 bg-[#FAF3F0] border-b border-[#E8D0C8] scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
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
            <span>Reputação Oficial • Google Reviews 5.0</span>
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
            Compromisso inegociável com atendimento individual, biossegurança rigorosa e alta costura capilar na Rua Calcedônia, 155.
          </p>
        </div>

        {/* ===================== 2. HERO CARD CONSOLIDADO DE REPUTAÇÃO GOOGLE ===================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E8D0C8] shadow-sm relative overflow-hidden">
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
                Cada detalhe no ateliê reflete o nosso compromisso inegociável com horário exclusivo, atendimento sem pressa e técnicas avançadas com preservação biológica.
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

            {/* Botão de Destaque para Avaliar no Google Maps */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center text-center pt-4 lg:pt-0">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#C5A880] to-[#B8934A] hover:from-[#D4B991] hover:to-[#C5A880] text-[#1C1917] font-sans font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all active:scale-[0.98] group"
              >
                <Star className="w-4 h-4 fill-[#1C1917] text-[#1C1917]" />
                <span className="text-center leading-tight">Deixe sua Avaliação 5 Estrelas no Google</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-80 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-stone-500 hover:text-[#6E501E] font-sans mt-3 underline underline-offset-4 transition-colors flex items-center gap-1"
              >
                <span>Conferir avaliações ao vivo no Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>

        {/* ===================== 3. AÇÃO DE AGENDAMENTO VIA CONCIERGE ===================== */}
        {onOpenTriage && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={onOpenTriage}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <MessageSquareHeart className="w-3.5 h-3.5 text-[#E6C99B]" />
              <span>Agendar Minha Experiência VIP</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default GoogleReviewsSection;
