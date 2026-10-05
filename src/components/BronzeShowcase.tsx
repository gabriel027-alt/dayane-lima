"use client";

import React from "react";
import { Sun, ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { ServiceCategory } from "./WhatsAppTriageDrawer";

interface BronzeShowcaseProps {
  onSelectService: (serviceId: ServiceCategory) => void;
}

export function BronzeShowcase({ onSelectService }: BronzeShowcaseProps) {
  return (
    <section 
      id="bronze"
      aria-labelledby="bronze-heading"
      className="py-20 md:py-32 bg-[#FAF3F0] text-[#1C1917] border-b border-[#E8D0C8] overflow-hidden scroll-mt-20 sm:scroll-mt-24 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* ===================== CABEÇALHO DO SANTUÁRIO SOLAR ===================== */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#6E501E]">
              ESTÉTICA CORPORAL & BRONZEAMENTO EM CABINE
            </span>
          </div>

          <h2 
            id="bronze-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.1] [text-wrap:balance]"
          >
            Bronzeamento em Cabine:{" "}
            <span className="italic font-normal font-serif text-[#C58B7E]">
              Marquinha Perfeita & Tom Dourado
            </span>
          </h2>
          
          <p className="mt-5 text-base sm:text-lg text-[#44403C] font-sans leading-relaxed max-w-2xl [text-wrap:pretty]">
            Equipamentos com dosimetria controlada, suíte privativa e marquinha milimétrica o ano todo em Monte Carmelo.
          </p>
        </div>

        {/* ===================== 1. PROTOCOLO DE BIOSSEGURANÇA & PRIVACIDADE ===================== */}
        <div className="mb-16 sm:mb-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8D0C8] shadow-xs space-y-2.5">
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 text-[#8F6E32]" />
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#1C1917]">Dosimetria Segura</h4>
            </div>
            <p className="text-xs sm:text-sm text-[#44403C] font-sans leading-relaxed">
              Controle calibrado por fototipo para um bronzeado dourado, uniforme e saudável.
            </p>
            <div className="pt-1.5 flex items-center gap-2 text-xs sm:text-sm font-sans text-[#6E501E]">
              <CheckCircle2 className="w-4 h-4 text-[#8F6E32]" />
              <span>Dourado homogêneo sem manchas</span>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8D0C8] shadow-xs space-y-2.5">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#8F6E32]" />
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#1C1917]">Privacidade Total</h4>
            </div>
            <p className="text-xs sm:text-sm text-[#44403C] font-sans leading-relaxed">
              Suíte individual climatizada com higienização estrita a cada atendimento.
            </p>
            <div className="pt-1.5 flex items-center gap-2 text-xs sm:text-sm font-sans text-[#6E501E]">
              <CheckCircle2 className="w-4 h-4 text-[#8F6E32]" />
              <span>Ambiente 100% privativo com hora marcada</span>
            </div>
          </div>
        </div>

        {/* ===================== CONVITE EDITORIAL ===================== */}
        <div className="rounded-2xl bg-white p-5 sm:p-6 border border-[#E8D0C8] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF3F0] border border-[#C5A880]/30 flex items-center justify-center text-[#6E501E] shrink-0">
              <Sun className="w-5 h-5 text-[#8F6E32]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-[#1C1917]">
                Agendamento de Bronzeamento Individual VIP
              </h4>
              <p className="text-sm text-[#44403C] font-sans mt-0.5">
                Escolha o horário mais conveniente na cabine Sol & Bronze na Rua Calcedônia, 155.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectService("bronze")}
            aria-label="Reservar sessão de bronzeamento individual privativo no WhatsApp"
            className="shrink-0 inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-sm tracking-wide uppercase transition-all shadow-md touch-manipulation cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32]"
          >
            <span>Reservar Sessão no WhatsApp</span>
            <ArrowRight className="w-4 h-4 text-[#E6C99B]" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default BronzeShowcase;
