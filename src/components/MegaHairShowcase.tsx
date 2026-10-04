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

        {/* ===================== MANIFESTO TÉCNICO DE ENGENHARIA CAPILAR & DESTAQUE VISUAL ===================== */}
        <div className="mb-16 sm:mb-20 bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8D0C8] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Coluna Visual de Destaque Fotográfico: Mega Hair */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden bg-[#1C1917] border border-[#C5A880]/50 shadow-2xl group">
                <img 
                  src="/midias/foto-megahair4-dayane.jpg"
                  alt="Resultado de Mega Hair de Nanocápsulas por Dayane Lima"
                  className="object-cover w-full h-full object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" aria-hidden="true" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#C5A880] block mb-1">
                    Alta Costura Capilar • Monte Carmelo
                  </span>
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-white leading-snug">
                    Fusão Invisível & Balanço Natural
                  </h4>
                  <p className="text-sm text-white/95 font-sans mt-1">
                    Nanocápsulas de 0.5mm com distribuição milimétrica e preservação integral da raiz.
                  </p>
                </div>
              </div>
            </div>

            {/* Coluna com os Pilares Técnicos */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="mb-6">
                <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#6E501E] block mb-2">
                  O Manifesto Técnico • Ateliê Dayane Lima
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] leading-tight">
                  A Fusão Milimétrica que Protege a Saúde da Sua Raiz
                </h3>
                <p className="mt-3 text-xs sm:text-sm font-sans text-[#44403C] leading-relaxed">
                  Cada mecha é calculada com paquímetro digital a 0.5cm do couro cabeludo, garantindo leveza absoluta e preservação do ciclo folicular biológico.
                </p>
              </div>

              <div className="divide-y divide-[#F0EAE1]">
                {MEGAHAIR_LEDGER.map((item, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-start gap-3 sm:gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#FAF3F0] border border-[#C5A880]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4 text-[#6E501E]" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-2 mb-1">
                        <h4 className="font-serif font-bold text-base text-[#1C1917]">
                          {item.title}
                        </h4>
                        <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#7A3E33]">
                          • {item.meta}
                        </span>
                      </div>
                      <p className="text-sm text-[#3D3835] font-sans leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0EAE1] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-[#3D3835] font-sans">
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

        {/* ===================== QUEBRA DE OBJEÇÕES CIRÚRGICAS & DIFERENCIAIS ===================== */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#6E501E] block mb-2">
              Transparência & Rigor Técnico
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
              Mitos Desmistificados: A Verdade Sobre o Mega Hair de Luxo
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8D0C8] shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-sans bg-rose-50 text-[#881337] border border-rose-200 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                  Mito #1: Quebra da Raiz
                </div>
                <h4 className="font-serif font-bold text-lg text-[#1C1917] mb-2">
                  "O Mega Hair quebra ou enfraquece a raiz natural?"
                </h4>
                <p className="text-sm text-[#292524] font-sans leading-relaxed">
                  <strong className="text-[#1C1917] font-semibold">A Ciência no Ateliê:</strong> A fixação a 0.5cm do couro cabeludo com divisão folicular geométrica distribui o peso com precisão. O folículo permanece livre de tração mecânica e com oxigenação plena para crescer saudável.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8D0C8] shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-sans bg-rose-50 text-[#881337] border border-rose-200 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                  Mito #2: Visibilidade das Cápsulas
                </div>
                <h4 className="font-serif font-bold text-lg text-[#1C1917] mb-2">
                  "As cápsulas ficam visíveis ao prender ou sob o sol?"
                </h4>
                <p className="text-sm text-[#292524] font-sans leading-relaxed">
                  <strong className="text-[#1C1917] font-semibold">A Ciência no Ateliê:</strong> As nanocápsulas de 0.5mm são polímeros biocompatíveis translúcidos que se fundem ao tom exato da raiz, garantindo invisibilidade 360° em rabos de cavalo, coques e luz natural.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8D0C8] shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-sans bg-rose-50 text-[#881337] border border-rose-200 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                  Mito #3: Dor na Manutenção
                </div>
                <h4 className="font-serif font-bold text-lg text-[#1C1917] mb-2">
                  "A manutenção é dolorosa ou repuxa os fios?"
                </h4>
                <p className="text-sm text-[#292524] font-sans leading-relaxed">
                  <strong className="text-[#1C1917] font-semibold">A Ciência no Ateliê:</strong> Usamos solvente orgânico nutritivo que dissolve o polímero suavemente por emulsão, sem força mecânica ou puxões. Os fios são penteados com condicionamento profundo e saem 100% intactos.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8D0C8] shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-sans bg-rose-50 text-[#881337] border border-rose-200 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                  Mito #4: Falta de Privacidade
                </div>
                <h4 className="font-serif font-bold text-lg text-[#1C1917] mb-2">
                  "Terei privacidade ou terei que esperar com várias pessoas?"
                </h4>
                <p className="text-sm text-[#292524] font-sans leading-relaxed">
                  <strong className="text-[#1C1917] font-semibold">A Ciência no Ateliê:</strong> Recusamos o formato de esteira industrial. Atendemos com hora marcada exclusiva no Monte Carmelo: bancada única, ambiente climatizado sereno e total discrição para você.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== CONVITE EDITORIAL DISCRETO ===================== */}
        <div className="rounded-2xl bg-white border border-[#E8D0C8] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF3F0] border border-[#C5A880]/40 flex items-center justify-center text-[#6E501E] shrink-0">
              <Sparkles className="w-5 h-5 text-[#6E501E]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-[#1C1917]">
                Atendimento Consultivo Privativo em Monte Carmelo
              </h4>
              <p className="text-sm text-[#3D3835] font-sans mt-0.5">
                Avaliação individual com teste de mecha, toque nos cabelos virgens e diagnóstico capilar completo.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectService("megahair")}
            className="shrink-0 inline-flex items-center gap-2 min-h-[48px] px-7 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-sm tracking-wide shadow-md transition-all active:scale-[0.98] touch-manipulation cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
          >
            <span>Consultar Disponibilidade</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default MegaHairShowcase;
