"use client";

import React from "react";
import { Zap, ArrowRight } from "lucide-react";
import { ServiceCategory } from "./WhatsAppTriageDrawer";

interface LaserShowcaseProps {
  onSelectService: (serviceId: ServiceCategory) => void;
}

const LASER_AREAS = [
  {
    name: "Virilha Completa & Linha VIP",
    indication: "Pele sem foliculite, clareada e livre de irritação pós-lâmina.",
    sessions: "6 a 8 sessões",
  },
  {
    name: "Axilas com Efeito Clareador",
    indication: "Eliminação do escurecimento por atrito e de pelos encravados.",
    sessions: "5 a 8 sessões",
  },
  {
    name: "Pernas Inteiras & Meia Perna",
    indication: "Toque acetinado permanente e liberdade total no dia a dia.",
    sessions: "6 a 10 sessões",
  },
  {
    name: "Buço & Contorno Facial",
    indication: "Disparos milimétricos suaves para penugens e pelos finos faciais.",
    sessions: "4 a 6 sessões",
  },
];

export function LaserShowcase({ onSelectService }: LaserShowcaseProps) {
  return (
    <section 
      id="laser"
      aria-labelledby="laser-heading"
      className="py-20 md:py-32 bg-[#FAF3F0] border-b border-[#E8D0C8] overflow-hidden scroll-mt-20 sm:scroll-mt-24 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* ===================== CABEÇALHO CLÍNICO HAUTE-TECH ===================== */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#6E501E]">
              ESTÉTICA AVANÇADA · DEPILAÇÃO A LASER SUBZERO
            </span>
          </div>

          <h2 
            id="laser-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.1] [text-wrap:balance]"
          >
            Depilação a Laser Subzero &{" "}
            <span className="italic font-normal font-serif text-[#C58B7E]">
              Estética Corporal Avançada
            </span>
          </h2>
          
          <p className="mt-5 text-base sm:text-lg text-[#44403C] font-sans leading-relaxed max-w-2xl [text-wrap:pretty]">
            Pele lisa, sem foliculite e livre de pelos com tecnologia de ponteira super-resfriada a -10°C para máximo conforto em Monte Carmelo.
          </p>
        </div>

        {/* ===================== 1. TABELA DE ÁREAS TRATADAS ===================== */}
        <div className="mb-16 sm:mb-20">
          <div className="mb-6">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#6E501E] block">
              Zonas Corporais • Protocolos Sob Medida
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917] mt-0.5">
              Áreas de Tratamento Mais Procuradas
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LASER_AREAS.map((area, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8D0C8] shadow-xs hover:border-[#8F6E32]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-sans font-bold text-[#6E501E] uppercase tracking-wider block mb-2">
                    Área Corporal
                  </span>
                  <h4 className="font-serif font-bold text-lg text-[#1C1917] mb-2">
                    {area.name}
                  </h4>
                  <p className="text-sm text-[#44403C] font-sans leading-relaxed mb-4">
                    {area.indication}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2DDD6] flex items-center justify-between text-xs font-sans text-[#7A4237] font-semibold">
                  <span>Plano sugerido:</span>
                  <span>{area.sessions}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================== CONVITE EDITORIAL ===================== */}
        <div className="rounded-2xl bg-white border border-[#E8D0C8] p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF3F0] border border-[#C5A880]/30 flex items-center justify-center text-[#6E501E] shrink-0">
              <Zap className="w-5 h-5 text-[#8F6E32]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-[#1C1917]">
                Avaliação de Fototipo & Pacotes de Laser
              </h4>
              <p className="text-sm text-[#44403C] font-sans mt-0.5">
                Consulte valores por sessão avulsa ou pacotes combinados com a recepção no WhatsApp.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectService("laser")}
            aria-label="Consultar pacotes e valores de depilação a laser subzero no WhatsApp"
            className="shrink-0 inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-sm tracking-wide uppercase transition-colors touch-manipulation cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32]"
          >
            <span>Consultar Pacotes de Laser</span>
            <ArrowRight className="w-4 h-4 text-[#E6C99B]" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default LaserShowcase;
