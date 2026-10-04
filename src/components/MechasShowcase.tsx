"use client";

import React from "react";
import { Sun, ArrowRight, ShieldCheck } from "lucide-react";
import { ServiceCategory } from "./WhatsAppTriageDrawer";

interface MechasShowcaseProps {
  onSelectService: (serviceId: ServiceCategory) => void;
}

export function MechasShowcase({ onSelectService }: MechasShowcaseProps) {
  return (
    <section 
      id="mechas"
      aria-labelledby="mechas-heading"
      className="py-20 md:py-32 bg-[#FAF3F0] border-b border-[#E8D0C8] overflow-hidden scroll-mt-20 sm:scroll-mt-24 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* ===================== CABEÇALHO EDITORIAL ===================== */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#6E501E]">
              COLORIMETRIA AVANÇADA · DAYANE LIMA
            </span>
          </div>

          <h2 
            id="mechas-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.1] [text-wrap:balance]"
          >
            Ruivos Luminosos, Loiros Nobres, Cabelos Pretos &{" "}
            <span className="italic font-normal font-serif text-[#C58B7E]">
              Balayage de Luxo
            </span>
          </h2>
          
          <p className="mt-5 text-base sm:text-lg text-[#44403C] font-sans leading-relaxed max-w-2xl [text-wrap:pretty]">
            Transição de cor precisa e preservação absoluta da fibra capilar. Nuances personalizadas que revelam sua luminosidade autêntica com naturalidade e sofisticação.
          </p>
        </div>

        {/* ===================== 1. FILOSOFIA DE VISAGISMO SOLAR & COMPROMISSO COM A FIBRA ===================== */}
        <div className="mb-16 sm:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Box de Citação de Visagismo Solar */}
          <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-white border border-[#E8D0C8] shadow-xs relative">
            <span className="font-serif text-6xl text-[#C5A880]/30 absolute top-4 left-6 select-none pointer-events-none">
              “
            </span>
            <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#1C1917] leading-relaxed relative z-10 pl-6">
              A cor perfeita não deve transformar você em outra pessoa; ela deve acender os pontos de luz da sua arquitetura facial sob o sol.
            </p>
            <div className="mt-6 pt-4 border-t border-[#F2DDD6] flex items-center justify-between text-sm font-sans">
              <div>
                <span className="font-bold text-[#1C1917] block">Dayane Lima</span>
                <span className="text-[#6E501E] font-medium text-xs">Especialista em Colorimetria & Visagismo</span>
              </div>
              <span className="text-xs text-[#7A3E33] font-mono font-medium">Monte Carmelo</span>
            </div>
          </div>

          {/* Pilares Técnicos de Segurança Capilar & Terapias */}
          <div id="terapia" className="lg:col-span-6 bg-white p-5 sm:p-6 rounded-2xl border border-[#E8D0C8] shadow-xs space-y-3.5 scroll-mt-24 sm:scroll-mt-28">
            <div>
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#6E501E] block mb-1">
                Segurança Folicular • Monte Carmelo
              </span>
              <h4 className="font-serif font-bold text-lg sm:text-xl text-[#1C1917]">
                Critérios Inegociáveis de Clareamento
              </h4>
            </div>
            
            <div className="space-y-2.5 pt-1 text-xs sm:text-sm font-sans">
              <div className="p-3.5 rounded-xl bg-[#FAF3F0] border border-[#E8D0C8] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#8F6E32] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1917] font-bold block mb-0.5">Teste de Mecha:</strong>
                  <p className="text-[#44403C]">Diagnóstico de elasticidade para clareamento 100% seguro.</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF3F0] border border-[#E8D0C8] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#8F6E32] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1917] font-bold block mb-0.5">Blindagem Plex:</strong>
                  <p className="text-[#44403C]">Preservação profunda das pontes de queratina.</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF3F0] border border-[#E8D0C8] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#8F6E32] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1917] font-bold block mb-0.5">Pigmentos Nobres:</strong>
                  <p className="text-[#44403C]">Nuances luminosas de alta fidelidade sem oxidação.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ===================== CONVITE EDITORIAL ===================== */}
        <div className="rounded-2xl bg-white border border-[#E8D0C8] p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF3F0] border border-[#C5A880]/40 flex items-center justify-center text-[#6E501E] shrink-0">
              <Sun className="w-5 h-5 text-[#6E501E]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-[#1C1917]">
                Diagnóstico de Mechas & Teste Prévio Obrigatório
              </h4>
              <p className="text-sm text-[#44403C] font-sans mt-0.5">
                Avaliação minuciosa da resistência do fio antes de qualquer processo químico.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectService("mechas")}
            className="shrink-0 inline-flex items-center gap-2 min-h-[48px] px-7 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-sm tracking-wide shadow-md transition-all active:scale-[0.98] touch-manipulation cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
          >
            <span>Agendar Teste de Mecha</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default MechasShowcase;
