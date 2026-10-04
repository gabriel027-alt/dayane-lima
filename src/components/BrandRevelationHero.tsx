"use client";

import React from "react";
import { MapPin, ArrowRight } from "lucide-react";

interface BrandRevelationHeroProps {
  onOpenTriage: () => void;
  onExploreServices?: () => void;
}

export function BrandRevelationHero({
  onOpenTriage,
  onExploreServices,
}: BrandRevelationHeroProps) {
  return (
    <section
      id="revelacao"
      aria-labelledby="brand-revelation-title"
      className="relative py-16 sm:py-20 md:py-24 bg-[#FBFBFC] text-[#1C1C1E] border-b border-stone-200/60 overflow-hidden select-none"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ===================== COLUNA ESQUERDA (MENSAGEM CENTRAL & CONVERSÃO) ===================== */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Badge de Posicionamento */}
            <div className="text-[10px] font-mono tracking-[0.3em] text-stone-700 bg-stone-200/70 font-semibold px-3.5 py-1.5 rounded-full w-max mb-6 uppercase">
              ATELIÊ PRIVADO • ALTA COSTURA & BELEZA INTEGRAL • E MAIS!
            </div>

            {/* Headline Editorial de Autoridade */}
            <h2
              id="brand-revelation-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold text-[#1C1C1E] tracking-tight leading-[1.14] mb-5 [text-wrap:balance]"
            >
              Excelência em{" "}
              <span className="italic font-normal font-serif text-[#C58B7E]">
                Mega Hair invisível
              </span>
              , mechas nobres — e mais!
            </h2>

            {/* Parágrafo Descritivo */}
            <p className="text-stone-700 text-base font-normal leading-relaxed max-w-xl mb-8 [text-wrap:pretty]">
              Atendimento consultivo e privativo no Monte Carmelo. Do domínio artesanal do Mega Hair e mechas sob medida às extensões de cílios, engenharia ungueal, bronzeamento em cabine e estética avançada — <strong className="text-[#1C1C1E] font-semibold">E MAIS!</strong> Um ecossistema completo de alta costura e exclusividade para a sua melhor versão.
            </p>

            {/* Botões de Ação */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <button
                type="button"
                onClick={onOpenTriage}
                className="px-8 py-3.5 bg-stone-900 text-white font-mono text-xs uppercase tracking-[0.2em] rounded-full shadow-lg shadow-stone-900/10 hover:bg-stone-800 transition-all cursor-pointer inline-flex items-center gap-2 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                aria-label="Agendar Avaliação VIP no WhatsApp"
              >
                <span>Agendar Avaliação VIP</span>
                <span className="text-stone-400">→</span>
              </button>

              {onExploreServices && (
                <button
                  type="button"
                  onClick={onExploreServices}
                  className="px-6 py-3.5 border border-stone-300 text-stone-700 font-mono text-xs uppercase tracking-[0.2em] rounded-full hover:bg-stone-50 transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                >
                  Explorar Procedimentos
                </button>
              )}
            </div>

            {/* Selos de Confiança e Localização */}
            <div className="pt-5 border-t border-stone-200/60 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-stone-700 font-sans">
              <div className="flex items-center gap-1.5" aria-label="Avaliação consolidada 5.0 estrelas no Google">
                <span className="text-amber-500 tracking-wider">★★★★★</span>
                <span className="font-semibold text-stone-900">Nota 5.0</span>
                <span>no Google Reviews</span>
              </div>

              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-stone-300" />

              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="font-semibold text-stone-900">Ateliê Privado:</span>
                <span>Rua Calcedônia, 155</span>
              </div>
            </div>

          </div>

          {/* ===================== COLUNA DIREITA (RETRATO OFICIAL DA AUTORIDADE) ===================== */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl border border-[#C5A880]/50 bg-[#1C1917] relative aspect-[4/5] group">
              <img
                src="/midias/foto-dayane-lima.png"
                alt="Dayane Lima • Alta Costura Capilar e Mega Hair"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                loading="eager"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[32px] pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default BrandRevelationHero;
