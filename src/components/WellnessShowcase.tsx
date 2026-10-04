"use client";

import React from "react";
import { HeartPulse, Moon, Waves, HandMetal, Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { ServiceCategory } from "./WhatsAppTriageDrawer";

interface WellnessShowcaseProps {
  onSelectService: (serviceId: ServiceCategory) => void;
}

const WELLNESS_CARDS = [
  {
    id: "massoterapia" as ServiceCategory,
    name: "Massoterapia & Drenagem Corporal",
    tag: "Cabine Privativa",
    icon: HeartPulse,
    focus: "Alívio de Estresse & Relaxamento",
    description: "Sessões terapêuticas personalizadas para liberação miofascial, alívio de sobrecargas e relaxamento absoluto em suíte privativa climatizada.",
    benefits: [
      "Alívio imediato de tensões musculares e estresse",
      "Drenagem linfática pós-cirúrgica e redução de edemas",
      "Aromaterapia relaxante com óleos essenciais nobres",
    ],
  },
  {
    id: "banhodelua" as ServiceCategory,
    name: "Banho de Lua & Estética Corporal",
    tag: "Pele Macia & Iluminada",
    icon: Moon,
    focus: "Clareamento Suave & Spa Corporal",
    description: "Protocolo exclusivo de descoloração suave dos pelos sem ardência ou pinicar, aliado à esfoliação revigorante e nutrição celular profunda.",
    benefits: [
      "Pelos perfeitamente dourados com fórmula suave",
      "Gomagem esfoliante aromática e renovação da derme",
      "Hidratação profunda para um toque aveludado e luminoso",
    ],
  },
  {
    id: "realinhamento" as ServiceCategory,
    name: "Realinhamento Capilar Avançado",
    tag: "Preservação da Fibra",
    icon: Waves,
    focus: "Alinhamento Térmico & Disciplina",
    description: "Tratamento de alinhamento orgânico sem agressão, garantindo disciplina impecável, eliminação do frizz e brilho espelho com integridade biológica.",
    benefits: [
      "Redução duradoura de volume e controle do frizz",
      "Preservação integral da massa capilar e do córtex",
      "Movimento leve, balanço sedoso e teste de mecha prévio",
    ],
  },
  {
    id: "maosepes" as ServiceCategory,
    name: "Beleza nas Mãos e Pés (Manicure & Pedicure VIP)",
    tag: "Cuidado Estético Ungueal",
    icon: HandMetal,
    focus: "Cuidado Refinado Mãos & Pés",
    description: "Protocolo clássico e combinado para mãos e pés com cutilagem milimétrica de segurança, spa esfoliante e esmaltação nobre de alta durabilidade.",
    benefits: [
      "Cutilagem de extrema precisão e biossegurança estéril",
      "Spa dos pés com esfoliação, massagem e nutrição",
      "Esmaltação de alto brilho com durabilidade estendida",
    ],
  },
];

export function WellnessShowcase({ onSelectService }: WellnessShowcaseProps) {
  return (
    <section 
      id="autocuidado"
      aria-labelledby="wellness-heading"
      className="py-20 md:py-28 bg-[#FAF3F0] border-b border-[#E8D0C8] overflow-hidden scroll-mt-20 sm:scroll-mt-24 select-none relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Divisor Decorativo com Selo Minimalista */}
        <div className="w-full flex items-center justify-center pb-8 sm:pb-12" aria-hidden="true">
          <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
          <div className="mx-3 flex items-center gap-1.5 text-[#C5A880]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span className="w-2 h-2 rotate-45 border border-[#C5A880] bg-[#FAF3F0]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
          </div>
          <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
        </div>

        {/* Cabeçalho Editorial */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8D0C8] text-[#6E501E] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8F6E32]" aria-hidden="true" />
            <span>Cabine Privativa & Autocuidado Integral · Monte Carmelo</span>
          </div>

          <h2 
            id="wellness-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight [text-wrap:balance]"
          >
            Rituais de Bem-Estar, Alinhamento &{" "}
            <span className="italic font-normal font-serif text-[#C58B7E]">
              Autocuidado de Alto Padrão
            </span>
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#44403C] font-sans leading-relaxed max-w-2xl [text-wrap:pretty]">
            Além da alta costura capilar, desfrute de protocolos corporais privativos, alívio de tensões e estética refinada para mãos e pés.
          </p>
        </div>

        {/* Grade de Cartões de Rituais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {WELLNESS_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8D0C8] shadow-xs hover:border-[#C5A880]/80 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Detalhe de Brilho Sutil */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#C5A880]/15 to-transparent rounded-bl-full pointer-events-none" />

                <div>
                  {/* Topo do Card: Ícone e Tag */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF3F0] border border-[#E8D0C8] flex items-center justify-center text-[#6E501E] group-hover:scale-105 group-hover:border-[#C5A880] transition-all">
                      <Icon className="w-6 h-6 text-[#8F6E32]" />
                    </div>
                    <span className="text-xs uppercase font-sans font-bold tracking-wider px-3 py-1 rounded-full bg-[#FAF3F0] text-[#6E501E] border border-[#E8D0C8]">
                      {card.tag}
                    </span>
                  </div>

                  {/* Foco e Título */}
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#6E501E] block mb-1">
                    {card.focus}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] leading-snug group-hover:text-[#6E501E] transition-colors mb-3">
                    {card.name}
                  </h3>

                  {/* Descrição */}
                  <p className="text-sm font-sans text-[#44403C] leading-relaxed mb-5">
                    {card.description}
                  </p>

                  {/* Lista de Benefícios */}
                  <div className="pt-4 border-t border-[#F0EAE1] space-y-2 mb-6">
                    {card.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-sans text-[#292524]">
                        <CheckCircle2 className="w-4 h-4 text-[#8F6E32] shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ação: Agendar Triagem VIP */}
                <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#6E501E] font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#8F6E32]" />
                    <span>Cabine individual com hora marcada</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectService(card.id)}
                    className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white text-xs sm:text-sm font-sans font-semibold transition-all shadow-xs active:scale-95 cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32] shrink-0"
                    aria-label={`Agendar ${card.name} no WhatsApp`}
                  >
                    <span>Agendar Sessão</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E6C99B]" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default WellnessShowcase;
