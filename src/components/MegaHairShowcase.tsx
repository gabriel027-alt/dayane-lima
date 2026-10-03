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
    title: "Preservação Rigorosa da Raiz",
    meta: "Divisão Geométrica Folicular",
    description:
      "A distribuição de peso é calculada mecha a mecha, sem tração no couro cabeludo. Suas raízes naturais continuam oxigenadas, respeitando o ciclo biológico de crescimento livre de danos mecânicos.",
  },
  {
    roman: "II",
    title: "Nanocápsulas Imperceptíveis",
    meta: "Fusão Biocompatível 0.5mm",
    description:
      "Junções milimétricas moldadas artesanalmente que se fundem ao caimento do cabelo. Totalmente invisíveis ao toque e imperceptíveis à visão, garantindo liberdade plena para amarrações e rotina ativa.",
  },
  {
    roman: "III",
    title: "Cutícula Intacta na Mesma Direção",
    meta: "Fios Humanos Brasileiros Virgens",
    description:
      "Acervo exclusivo de cabelos selecionados mecha a mecha. Garantia de sedosidade extrema, balanço fluido e reflexo espelhado duradouro que não embaraça nem se deteriora após as lavagens.",
  },
];

export function MegaHairShowcase({ onSelectService }: MegaHairShowcaseProps) {
  return (
    <section 
      id="megahair"
      aria-labelledby="megahair-heading"
      className="py-20 md:py-32 bg-[#F7EAE5] border-b border-[#E8D0C8] overflow-hidden scroll-mt-20 sm:scroll-mt-24 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* ===================== CABEÇALHO EDITORIAL ===================== */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#6E501E]">
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
            Não adicionamos apenas comprimento ou densidade. Desenhamos uma união milimétrica que respeita a biologia folicular, permitindo nuca limpa, penteados altos e caimento indistinguível do seu cabelo natural.
          </p>
        </div>

        {/* ===================== MANIFESTO TÉCNICO DE ENGENHARIA CAPILAR ===================== */}
        <div className="mb-16 sm:mb-20 bg-white rounded-3xl p-6 sm:p-12 border border-[#E8D0C8] shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#6E501E] block mb-2">
              O Manifesto Técnico • Ateliê Dayane Lima
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#1C1917] leading-tight">
              A Fusão Milimétrica que Protege a Saúde da Sua Raiz
            </h3>
            <p className="mt-3 text-sm sm:text-base font-sans text-[#44403C] leading-relaxed">
              Cada mecha é calculada com paquímetro digital a 0.5cm do couro cabeludo, garantindo leveza absoluta e preservação do ciclo folicular biológico.
            </p>
          </div>

          <div className="divide-y divide-[#F0EAE1]">
            {MEGAHAIR_LEDGER.map((item, idx) => (
              <div key={idx} className="py-5 first:pt-0 last:pb-0 flex items-start gap-4 sm:gap-6">
                <div className="w-8 h-8 rounded-full bg-[#FAF3F0] border border-[#C5A880]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                    <h4 className="font-serif font-bold text-base sm:text-lg text-[#1C1917]">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#8C5448]">
                      • {item.meta}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#574F4A] font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 mt-6 border-t border-[#F0EAE1] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#574F4A] font-sans">
              Atendimento com hora marcada e diagnóstico com teste de mecha prévio.
            </p>
            <button
              type="button"
              onClick={() => onSelectService("megahair")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-sm tracking-wide shadow-md transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] touch-manipulation cursor-pointer"
            >
              <span>Agendar Avaliação de Mega Hair</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </button>
          </div>
        </div>

        {/* ===================== QUEBRA DE OBJEÇÕES CIRÚRGICAS & DIFERENCIAIS ===================== */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#6E501E] block mb-2">
              Transparência & Rigor Técnico
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
              Mitos Desmistificados: A Verdade Sobre o Mega Hair de Luxo
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8D0C8] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold font-sans text-rose-800 uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Mito Frequente
              </div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#1C1917] mb-2">
                "Mega Hair quebra ou enfraquece a raiz natural?"
              </h4>
              <p className="text-xs sm:text-sm text-[#44403C] font-sans leading-relaxed">
                <strong className="text-[#1C1917] font-semibold">A Ciência no Ateliê:</strong> A divisão geométrica mecha a mecha distribui o peso milimetricamente. A fixação a 0.5cm do couro cabeludo elimina qualquer tração folicular, permitindo que seus fios biológicos cresçam com oxigenação plena.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8D0C8] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold font-sans text-rose-800 uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Mito Frequente
              </div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#1C1917] mb-2">
                "As cápsulas ficam visíveis ao prender ou sob sol forte?"
              </h4>
              <p className="text-xs sm:text-sm text-[#44403C] font-sans leading-relaxed">
                <strong className="text-[#1C1917] font-semibold">A Ciência no Ateliê:</strong> Nossas nanocápsulas de 0.5mm são polímeros biocompatíveis translúcidos que imitam a cor exata da sua raiz. Garantem invisibilidade 360° em rabos de cavalo, coques altos e sob qualquer iluminação.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8D0C8] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold font-sans text-rose-800 uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Mito Frequente
              </div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#1C1917] mb-2">
                "A manutenção é dolorosa ou puxa os fios?"
              </h4>
              <p className="text-xs sm:text-sm text-[#44403C] font-sans leading-relaxed">
                <strong className="text-[#1C1917] font-semibold">A Ciência no Ateliê:</strong> Utilizamos solvente orgânico nutritivo que dissolve a queratina suavemente sem força mecânica ou tração. Seus fios são penteados com condicionamento profundo, saindo 100% intactos.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8D0C8] shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold font-sans text-rose-800 uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Mito Frequente
              </div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#1C1917] mb-2">
                "Terei privacidade ou terei que esperar com várias pessoas?"
              </h4>
              <p className="text-xs sm:text-sm text-[#44403C] font-sans leading-relaxed">
                <strong className="text-[#1C1917] font-semibold">A Ciência no Ateliê:</strong> Recusamos o formato de esteira industrial. Atendemos com hora marcada exclusiva no Monte Carmelo: uma única bancada, ambiente climatizado e total discrição para você.
              </p>
            </div>
          </div>
        </div>

        {/* ===================== CONVITE EDITORIAL DISCRETO ===================== */}
        <div className="rounded-2xl bg-white border border-[#E8D0C8] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF3F0] border border-[#C5A880]/30 flex items-center justify-center text-[#6E501E] shrink-0">
              <Sparkles className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-[#1C1917]">
                Atendimento Consultivo Privativo em Monte Carmelo
              </h4>
              <p className="text-xs text-[#574F4A] font-sans mt-0.5">
                Avaliação individual com teste de mecha, toque nos cabelos virgens e diagnóstico capilar completo.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectService("megahair")}
            className="shrink-0 inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#FAF3F0] hover:bg-[#F2DDD6] text-[#1C1917] border border-[#C5A880]/40 font-sans font-semibold text-xs tracking-wider uppercase transition-colors touch-manipulation cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
          >
            <span>Consultar Disponibilidade</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default MegaHairShowcase;
