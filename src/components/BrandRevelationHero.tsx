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
      className="relative py-16 sm:py-20 md:py-24 bg-[#FAF3F0] text-[#1C1917] border-b border-[#E8D0C8] overflow-hidden select-none"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ===================== COLUNA ESQUERDA (MENSAGEM CENTRAL & CONVERSÃO) ===================== */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Badge de Posicionamento */}
            <div className="text-xs font-sans tracking-[0.2em] text-[#6E501E] bg-white border border-[#E8D0C8] font-bold px-4 py-2 rounded-full w-max mb-6 uppercase shadow-xs">
              ATELIÊ PRIVADO • ALTA COSTURA & BELEZA INTEGRAL • E MAIS!
            </div>

            {/* Headline Editorial de Autoridade */}
            <h2
              id="brand-revelation-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold text-[#1C1917] tracking-tight leading-[1.14] mb-5 [text-wrap:balance]"
            >
              Excelência em{" "}
              <span className="italic font-normal font-serif text-[#C58B7E]">
                Mega Hair invisível
              </span>
              , mechas nobres — e mais!
            </h2>

            {/* Parágrafo Descritivo */}
            <p className="text-[#44403C] text-base sm:text-lg font-normal leading-relaxed max-w-xl mb-8 [text-wrap:pretty]">
              Atendimento consultivo e privativo no Monte Carmelo. Do domínio artesanal do Mega Hair e mechas sob medida às extensões de cílios, engenharia ungueal, bronzeamento em cabine e estética avançada — <strong className="text-[#1C1917] font-semibold">E MAIS!</strong> Um ecossistema completo de alta costura e exclusividade para a sua melhor versão.
            </p>

            {/* Botões de Ação */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <button
                type="button"
                onClick={onOpenTriage}
                className="min-h-[48px] px-8 py-3.5 bg-[#1C1917] text-white font-sans text-sm font-semibold tracking-wide uppercase rounded-full shadow-lg hover:bg-[#8F6E32] transition-all cursor-pointer inline-flex items-center gap-2 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32]"
                aria-label="Agendar Avaliação VIP no WhatsApp"
              >
                <span>Agendar Avaliação VIP</span>
                <span className="text-[#E6C99B]">→</span>
              </button>

              {onExploreServices && (
                <button
                  type="button"
                  onClick={onExploreServices}
                  className="min-h-[48px] px-6 py-3.5 bg-white border border-[#E8D0C8] text-[#1C1917] hover:border-[#8F6E32] font-sans text-sm font-semibold tracking-wide uppercase rounded-full hover:bg-neutral-50 transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32]"
                >
                  Explorar Procedimentos
                </button>
              )}
            </div>

            {/* Selos de Confiança e Localização */}
            <div className="pt-5 border-t border-[#E8D0C8] flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-[#44403C] font-sans">
              <div className="flex items-center gap-1.5" aria-label="Avaliação consolidada 5.0 estrelas no Google">
                <span className="text-amber-600 tracking-wider">★★★★★</span>
                <span className="font-bold text-[#1C1917]">Nota 5.0</span>
                <span className="text-[#44403C]">no Google Reviews</span>
              </div>

              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#C5A880]/50" />

              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#8F6E32]" />
                <span className="font-bold text-[#1C1917]">Ateliê Privado:</span>
                <span className="text-[#44403C]">Rua Calcedônia, 155</span>
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
