"use client";

import React from "react";
import { Eye, ArrowRight, CheckCircle2 } from "lucide-react";
import { ServiceCategory } from "./WhatsAppTriageDrawer";

interface OlharShowcaseProps {
  onSelectService: (serviceId: ServiceCategory) => void;
}

export function OlharShowcase({ onSelectService }: OlharShowcaseProps) {
  return (
    <section 
      id="olhar"
      aria-labelledby="olhar-heading"
      className="py-20 md:py-32 bg-[#F7EAE5] border-b border-[#E8D0C8] overflow-hidden scroll-mt-20 sm:scroll-mt-24 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* ===================== CABEÇALHO DO ATELIÊ DUPLO ===================== */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#6E501E]">
              VISAGISMO DO OLHAR · E MAIS!
            </span>
          </div>

          <h2 
            id="olhar-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.1] [text-wrap:balance]"
          >
            A Arquitetura do Olhar: Cílios de Seda &{" "}
            <span className="italic font-normal font-serif text-[#C58B7E]">
              Simetria Áurea
            </span>
          </h2>
          
          <p className="mt-5 text-base sm:text-lg text-[#44403C] font-sans leading-relaxed max-w-2xl [text-wrap:pretty]">
            A sofisticação do ateliê não se limita a um único ritual: extensões de seda levíssimas aplicadas com isolamento fio a fio por Rayssa Lash e visagismo em proporção áurea por Hillery Thauanne — versatilidade e exclusividade absoluta em Monte Carmelo.
          </p>
        </div>

        {/* ===================== 1. APRESENTAÇÃO DAS ESPECIALISTAS ===================== */}
        <div className="mb-16 sm:mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card: Rayssa Lash (Cílios) */}
          <div id="cilios" className="bg-white rounded-3xl p-8 border border-[#E8D0C8] shadow-xs flex flex-col justify-between scroll-mt-24 sm:scroll-mt-28">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#6E501E]">
                  Especialista em Extensão de Cílios & Spa Ocular
                </span>
                <span className="text-xs font-mono font-medium text-[#7A4237]">Ateliê VIP</span>
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#1C1917]">
                Rayssa Lash
              </h3>
              <p className="text-sm text-[#3D3835] font-sans mt-3 leading-relaxed">
                Fios de seda com curvatura personalizada e diâmetro milimétrico que respeita a saúde folicular. Isolamento anatômico mecha a mecha com adesivos oftálmicos de alta pureza.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F2DDD6] space-y-2.5 text-sm font-sans text-[#292524]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8F6E32] shrink-0" />
                <span>Higienização prévia com espuma micelar calmante</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8F6E32] shrink-0" />
                <span>Zero ardência e conforto total para olhos sensíveis</span>
              </div>
            </div>
          </div>

          {/* Card: Hillery Thauanne (Sobrancelhas) */}
          <div id="sobrancelhas" className="bg-white rounded-3xl p-8 border border-[#E8D0C8] shadow-xs flex flex-col justify-between scroll-mt-24 sm:scroll-mt-28">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#6E501E]">
                  Visagismo & Proporção Áurea Facial
                </span>
                <span className="text-xs font-mono font-medium text-[#7A4237]">Monte Carmelo</span>
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#1C1917]">
                Hillery Thauanne
              </h3>
              <p className="text-sm text-[#3D3835] font-sans mt-3 leading-relaxed">
                Mapeamento milimétrico calculado em proporção áurea facial de acordo com as linhas naturais do seu rosto. Pigmentação dosada para valorizar a arquitetura dos olhos com naturalidade.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F2DDD6] space-y-2.5 text-sm font-sans text-[#292524]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8F6E32] shrink-0" />
                <span>Mapeamento simétrico com paquímetro digital</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8F6E32] shrink-0" />
                <span>Tinturas e pigmentos hipoalergênicos de alta retenção</span>
              </div>
            </div>
          </div>

        </div>

        {/* ===================== CONVITE EDITORIAL ===================== */}
        <div className="rounded-2xl bg-white border border-[#E8D0C8] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF3F0] border border-[#C5A880]/30 flex items-center justify-center text-[#6E501E] shrink-0">
              <Eye className="w-5 h-5 text-[#8F6E32]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-[#1C1917]">
                Harmonização Ocular Completa em Sessão VIP
              </h4>
              <p className="text-sm text-[#3D3835] font-sans mt-0.5">
                Reserve atendimento com Rayssa Lash e Hillery Thauanne no mesmo horário na Rua Calcedônia, 155.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectService("cilios")}
            className="shrink-0 inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-sm tracking-wide transition-colors touch-manipulation cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32]"
          >
            <span>Agendar com Rayssa & Hillery</span>
            <ArrowRight className="w-4 h-4 text-[#E6C99B]" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default OlharShowcase;
