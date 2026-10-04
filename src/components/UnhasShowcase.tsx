"use client";

import React from "react";
import { HandMetal, ArrowRight, ShieldCheck } from "lucide-react";
import { ServiceCategory } from "./WhatsAppTriageDrawer";

interface UnhasShowcaseProps {
  onSelectService: (serviceId: ServiceCategory) => void;
}

const UNHAS_SPECS = [
  {
    code: "01",
    label: "Curvatura C Anatômica",
    detail: "Equilíbrio exato de tensão mecânica sem espessura na borda livre para resistência natural.",
  },
  {
    code: "02",
    label: "Gel Tixotrópico & Fibra Pura",
    detail: "Aderência molecular de alta tecnologia que não gera ardência sob a lâmpada UV.",
  },
  {
    code: "03",
    label: "Blindagem Diamante",
    detail: "Acabamento vitrificado resistente a riscos do cotidiano com durabilidade de mais de 25 dias.",
  },
];

export function UnhasShowcase({ onSelectService }: UnhasShowcaseProps) {
  return (
    <section 
      id="unhas"
      aria-labelledby="unhas-heading"
      className="py-20 md:py-32 bg-[#FAF3F0] border-b border-[#E8D0C8] overflow-hidden scroll-mt-20 sm:scroll-mt-24 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* ===================== CABEÇALHO DA ARQUITETURA UNGUEAL ===================== */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#6E501E]">
              ENGENHARIA UNGUEAL · ALONGAMENTO EM GEL & FIBRA
            </span>
          </div>

          <h2 
            id="unhas-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.1] [text-wrap:balance]"
          >
            Alongamento em Fibra & Gel:{" "}
            <span className="italic font-normal font-serif text-[#C58B7E]">
              Estrutura Ultrafina
            </span>
          </h2>
          
          <p className="mt-5 text-base sm:text-lg text-[#44403C] font-sans leading-relaxed max-w-2xl [text-wrap:pretty]">
            A excelência do Ateliê Dayane Lima alcança a estética das mãos: ponto de tensão calibrado milimetricamente para unir máxima resistência mecânica a bordas ultrafinas por Emily Lima Nails — a sofisticação não se limita a um único ritual.
          </p>
        </div>

        {/* ===================== 1. ESPECIFICAÇÕES TÉCNICAS (LEDGER) ===================== */}
        <div className="mb-16 sm:mb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {UNHAS_SPECS.map((spec) => (
            <div 
              key={spec.code}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8D0C8] shadow-xs hover:border-[#8F6E32]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#8F6E32]/35 block mb-3">
                  {spec.code}
                </span>
                <h4 className="font-serif font-bold text-lg text-[#1C1917] mb-2">
                  {spec.label}
                </h4>
                <p className="text-sm text-[#44403C] font-sans leading-relaxed">
                  {spec.detail}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#F2DDD6] flex items-center gap-2 text-sm font-sans text-[#6E501E]">
                <ShieldCheck className="w-4 h-4 text-[#8F6E32]" />
                <span className="font-medium">Padrão Emily Lima Nails</span>
              </div>
            </div>
          ))}
        </div>

        {/* ===================== CONVITE EDITORIAL ===================== */}
        <div className="rounded-2xl bg-white border border-[#E8D0C8] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF3F0] border border-[#C5A880]/30 flex items-center justify-center text-[#6E501E] shrink-0">
              <HandMetal className="w-5 h-5 text-[#8F6E32]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-[#1C1917]">
                Ateliê de Unhas com Emily Lima em Monte Carmelo
              </h4>
              <p className="text-sm text-[#44403C] font-sans mt-0.5">
                Aplicação inicial ou manutenção privativa com hora marcada na Rua Calcedônia, 155.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectService("unhas")}
            className="shrink-0 inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-sm tracking-wide transition-colors touch-manipulation cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32]"
          >
            <span>Agendar com Emily Lima</span>
            <ArrowRight className="w-4 h-4 text-[#E6C99B]" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default UnhasShowcase;
