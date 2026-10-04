"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { ServiceCategory } from "./WhatsAppTriageDrawer";

interface MegaHairShowcaseProps {
  onSelectService: (serviceId: ServiceCategory) => void;
}

const MEGAHAIR_LEDGER = [
  {
    roman: "I",
    title: "Preservação da Raiz",
    meta: "Tração Zero",
    description:
      "Distribuição de peso calculada mecha a mecha, mantendo os folículos livres de danos e com oxigenação natural plena.",
  },
  {
    roman: "II",
    title: "Nanocápsulas de 0.5mm",
    meta: "Fusão Imperceptível",
    description:
      "Junções milimétricas imperceptíveis ao toque e à visão, garantindo liberdade total para coques e penteados altos.",
  },
  {
    roman: "III",
    title: "Fios Brasileiros Nobres",
    meta: "Cutícula Alinhada",
    description:
      "Cabelos humanos virgens selecionados individualmente, com toque aveludado, caimento sedoso e reflexo espelhado duradouro.",
  },
];

export function MegaHairShowcase({ onSelectService }: MegaHairShowcaseProps) {
  return (
    <section 
      id="megahair"
      aria-labelledby="megahair-heading"
      className="py-20 md:py-32 bg-[#FAF3F0] border-b border-[#E8D0C8] overflow-hidden scroll-mt-20 sm:scroll-mt-24 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* ===================== CABEÇALHO EDITORIAL ===================== */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#6E501E]">
              HAUTE COIFFURE · DAYANE LIMA
            </span>
          </div>

          <h2 
            id="megahair-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.1] [text-wrap:balance]"
          >
            A Arte da Fusão Invisível &{" "}
            <span className="italic font-normal font-serif text-[#C58B7E]">
              Preservação da Raiz
            </span>
          </h2>
          
          <p className="mt-5 text-base sm:text-lg text-[#44403C] font-sans leading-relaxed max-w-2xl [text-wrap:pretty]">
            União milimétrica que respeita a biologia folicular. Nuca limpa, penteados altos e caimento indistinguível do seu cabelo natural.
          </p>
        </div>

        {/* ===================== MANIFESTO TÉCNICO DE ENGENHARIA CAPILAR & DESTAQUE VISUAL ===================== */}
        <div className="mb-16 sm:mb-20 bg-white rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 border border-[#E8D0C8] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Coluna Visual de Destaque Fotográfico: Mega Hair */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-[#1C1917] border border-[#C5A880]/50 shadow-2xl group">
                <img 
                  src="/midias/foto-megahair4-dayane.jpg"
                  alt="Resultado de Mega Hair de Nanocápsulas por Dayane Lima"
                  className="object-cover w-full h-full object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" aria-hidden="true" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                  <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#E6C99B] block mb-1">
                    Alta Costura Capilar • Monte Carmelo
                  </span>
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-white leading-snug">
                    Fusão Invisível & Balanço Natural
                  </h4>
                  <p className="text-sm text-white/95 font-sans mt-1">
                    Nanocápsulas de 0.5mm com caimento imperceptível e preservação da raiz.
                  </p>
                </div>
              </div>
            </div>

            {/* Coluna com os Pilares Técnicos */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="mb-6">
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#6E501E] block mb-2">
                  O Manifesto Técnico • Ateliê Dayane Lima
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] leading-tight">
                  Fusão Milimétrica que Protege a Saúde da Raiz
                </h3>
                <p className="mt-3 text-sm font-sans text-[#44403C] leading-relaxed">
                  Distribuição calculada com paquímetro digital para leveza absoluta e liberdade total de movimento.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {MEGAHAIR_LEDGER.map((item, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#FAF3F0] border border-[#E8D0C8] shadow-xs flex items-start gap-3.5 sm:gap-4 transition-all hover:bg-white hover:border-[#C5A880]/60">
                    <div className="w-9 h-9 rounded-full bg-white border border-[#C5A880]/40 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Sparkles className="w-4 h-4 text-[#8F6E32]" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-2 mb-1">
                        <h4 className="font-serif font-bold text-base sm:text-lg text-[#1C1917]">
                          {item.title}
                        </h4>
                        <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#7A3E33]">
                          • {item.meta}
                        </span>
                      </div>
                      <p className="text-sm text-[#44403C] font-sans leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0EAE1] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-[#44403C] font-sans">
                  Atendimento privativo com hora marcada e diagnóstico com teste de mecha prévio.
                </p>
                <button
                  type="button"
                  onClick={() => onSelectService("megahair")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-sm tracking-wide shadow-md transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] touch-manipulation cursor-pointer"
                >
                  <span>Agendar Avaliação de Mega Hair</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default MegaHairShowcase;
