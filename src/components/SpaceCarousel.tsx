"use client";

import React from "react";
import { Sparkles, MapPin, Wind, Coffee, Navigation, ExternalLink, ArrowRight, ShieldCheck } from "lucide-react";

interface SpaceCarouselProps {
  onOpenTriage?: () => void;
}

export function SpaceCarousel({ onOpenTriage }: SpaceCarouselProps = {}) {
  const googleMapsUrl = "https://www.google.com/maps/place/Est%C3%A9tica+e+beleza+sol+e+broze/@-13.1124923,-59.9635272,5z/data=!4m10!1m2!2m1!1sSB+Est%C3%A9tica+%26+Beleza+-+MG!3m6!1s0x754ab63ed56c501:0xbb6be6e8eee14360!8m2!3d-16.7227922!4d-43.8399455!15sChpTQiBFc3TDqXRpY2EgJiBCZWxlemEgLSBNR5IBDGJlYXV0eV_zYWxvbuABAA!16s%2Fg%2F11vwktnkpr?entry=ttu";

  return (
    <section 
      id="espaco"
      aria-label="Atmosfera & Estrutura Física"
      className="relative z-10 py-20 md:py-28 bg-[#FAF3F0] border-b border-[#E8D0C8] overflow-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Detalhe Geométrico de Fundo */}
      <div 
        className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-[#EFD4CD]/30 blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Divisor Decorativo com Selo Geométrico */}
        <div className="w-full flex items-center justify-center pb-8 sm:pb-12" aria-hidden="true">
          <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/50 to-transparent" />
          <div className="mx-4 flex items-center gap-1.5 text-[#C5A880]">
            <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
            <span className="w-2 h-2 rotate-45 border border-[#C5A880] bg-[#FAF3F0]" />
            <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
          </div>
          <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/50 to-transparent" />
        </div>

        {/* Cabeçalho Editorial */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8D0C8] text-[#6E501E] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8F6E32]" aria-hidden="true" />
            <span>Arquitetura do Ateliê • Monte Carmelo</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight [text-wrap:balance]">
            Um Refúgio de Serenidade e Alto Padrão na{" "}
            <span className="italic font-normal font-serif text-[#C58B7E]">
              Rua Calcedônia, 155
            </span>
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#44403C] font-sans leading-relaxed [text-wrap:pretty]">
            Explore cada ambiente projetado para acolher com discrição, conforto térmico e privacidade absoluta no Bairro Monte Carmelo, em Montes Claros.
          </p>
        </div>

        {/* ===================== 1. PILARES DE HOSPITALIDADE ===================== */}
        <div className="mb-14 sm:mb-18 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8D0C8] shadow-xs hover:border-[#8F6E32]/50 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF3F0] border border-[#C5A880]/30 flex items-center justify-center text-[#6E501E] mb-4">
                <MapPin className="w-5 h-5 text-[#8F6E32]" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#1C1917] mb-1">Localização Nobre</h4>
              <p className="text-xs sm:text-sm font-sans text-[#44403C] leading-relaxed">
                Rua Calcedônia, 155, Monte Carmelo. Região calma com fácil estacionamento.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8D0C8] shadow-xs hover:border-[#8F6E32]/50 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF3F0] border border-[#C5A880]/30 flex items-center justify-center text-[#6E501E] mb-4">
                <Wind className="w-5 h-5 text-[#8F6E32]" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#1C1917] mb-1">Conforto Térmico</h4>
              <p className="text-xs sm:text-sm font-sans text-[#44403C] leading-relaxed">
                Ambientes climatizados com isolamento acústico para o seu descanso completo.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8D0C8] shadow-xs hover:border-[#8F6E32]/50 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF3F0] border border-[#C5A880]/30 flex items-center justify-center text-[#6E501E] mb-4">
                <Coffee className="w-5 h-5 text-[#8F6E32]" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#1C1917] mb-1">Boas-Vindas Gourmet & Drinks</h4>
              <p className="text-xs sm:text-sm font-sans text-[#44403C] leading-relaxed">
                Desfrute de café especial moído na hora, chás nobres e drinks selecionados com todo o carinho durante os seus rituais de beleza e bem-estar no Monte Carmelo.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8D0C8] shadow-xs hover:border-[#8F6E32]/50 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF3F0] border border-[#C5A880]/30 flex items-center justify-center text-[#6E501E] mb-4">
                <ShieldCheck className="w-5 h-5 text-[#8F6E32]" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#1C1917] mb-1">Biossegurança Hospitalar</h4>
              <p className="text-xs sm:text-sm font-sans text-[#44403C] leading-relaxed">
                Autoclave médica, toalhas a vapor e materiais 100% descartáveis.
              </p>
            </div>
          </div>
        </div>

        {/* ===================== ROTA GOOGLE MAPS & AGENDAMENTO ===================== */}
        <div className="rounded-2xl bg-white border border-[#E8D0C8] p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-lg text-[#1C1917]">
              Planeje sua Visita ao Ateliê Dayane Lima
            </h4>
            <p className="text-sm text-[#44403C] font-sans">
              Rua Calcedônia, 155 • Bairro Monte Carmelo, Montes Claros - MG
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Traçar rota até o Ateliê Dayane Lima na Rua Calcedônia, 155 no Google Maps"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-sm tracking-wide shadow-md transition-all active:scale-[0.98] touch-manipulation cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32]"
            >
              <Navigation className="w-4 h-4 text-[#E6C99B]" />
              <span>Traçar Rota no Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/70" />
            </a>

            {onOpenTriage && (
              <button
                type="button"
                onClick={onOpenTriage}
                aria-label="Agendar recepção VIP no Ateliê Dayane Lima no WhatsApp"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-full bg-white border border-[#E8D0C8] hover:border-[#8F6E32] hover:text-[#8F6E32] text-[#1C1917] font-sans font-semibold text-sm transition-colors shadow-xs touch-manipulation cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32]"
              >
                <span>Agendar Recepção VIP</span>
                <ArrowRight className="w-4 h-4 text-[#8F6E32]" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

export default SpaceCarousel;
