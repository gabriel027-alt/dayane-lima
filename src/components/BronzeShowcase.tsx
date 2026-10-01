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
      className="py-24 md:py-32 bg-[#1C1917] text-white border-b border-[#C5A880]/30 overflow-hidden scroll-mt-20 sm:scroll-mt-24 relative"
    >
      {/* Brilho Solar Radial Dourado no Fundo */}
      <div 
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(197,168,128,0.12),transparent_70%)] pointer-events-none"
        aria-hidden="true" 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* ===================== CABEÇALHO DO SANTUÁRIO SOLAR ===================== */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#C5A880]">
              ESTÉTICA CORPORAL & BRONZE · SOL & BRONZE
            </span>
          </div>

          <h2 
            id="bronze-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] [text-wrap:balance]"
          >
            Bronzeamento em Cabine:{" "}
            <span className="italic font-normal font-serif text-[#C58B7E]">
              Marquinha Perfeita & Tom Dourado
            </span>
          </h2>
          
          <p className="mt-5 text-base sm:text-lg text-neutral-300 font-sans leading-relaxed max-w-2xl [text-wrap:pretty]">
            Equipamentos de alta performance com controle rigoroso de exposição, sala privativa e montagem anatômica com fita cirúrgica para um tom dourado uniforme e saudável o ano todo em Monte Carmelo.
          </p>
        </div>

        {/* ===================== 1. PROTOCOLO DE BIOSSEGURANÇA & PRIVACIDADE ===================== */}
        <div className="mb-16 sm:mb-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 text-[#C5A880]" />
              <h4 className="font-serif font-bold text-lg text-white">Controle Rigoroso de Exposição</h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
              Lâmpadas com dosimetria controlada para cada tipo de pele. Sessões confortáveis com ventilação direta e aceleradores biológicos com betacaroteno.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-sans text-[#C5A880]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Dourado homogêneo sem manchas</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#C5A880]" />
              <h4 className="font-serif font-bold text-lg text-white">Privacidade Absoluta em Monte Carmelo</h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
              Você realiza o procedimento em suíte individual fechada com chave, toalhas descartáveis e higienização hospitalar a cada atendimento.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-sans text-[#C5A880]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ambiente 100% privativo com hora marcada</span>
            </div>
          </div>
        </div>

        {/* ===================== CONVITE EDITORIAL ===================== */}
        <div className="rounded-2xl bg-gradient-to-r from-[#241F1C] to-[#1C1917] p-6 sm:p-8 border border-[#C5A880]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] shrink-0">
              <Sun className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-white">
                Agendamento de Bronzeamento Individual VIP
              </h4>
              <p className="text-xs text-neutral-400 font-sans mt-0.5">
                Escolha o horário mais conveniente na cabine Sol & Bronze na Rua Calcedônia, 155.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectService("bronze")}
            className="shrink-0 inline-flex items-center gap-2 min-h-[48px] px-8 py-3.5 rounded-full bg-[#C5A880] hover:bg-[#b8976b] text-[#1C1917] font-sans font-bold text-xs tracking-wider uppercase transition-all shadow-md touch-manipulation cursor-pointer"
          >
            <span>Reservar Sessão no WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#1C1917]" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default BronzeShowcase;
