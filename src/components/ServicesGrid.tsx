"use client";

import React from "react";
import { Sparkles, ArrowUpRight, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { ServiceCategory } from "./WhatsAppTriageDrawer";

interface RitualIndexItem {
  id: ServiceCategory;
  anchorId: string;
  number: string;
  name: string;
  category: string;
  duration: string;
  aspiration: string;
  tag: string;
}

const RITUALS_INDEX: RitualIndexItem[] = [
  {
    id: "megahair",
    anchorId: "megahair",
    number: "01",
    name: "Mega Hair Invisível & Nanocápsulas",
    category: "Alongamento & Densidade Imperceptível",
    duration: "Ritual Personalizado (3h a 5h)",
    aspiration: "Fios brasileiros virgens com fusão milimétrica e tração zero na raiz.",
    tag: "Especialidade Mestre",
  },
  {
    id: "mechas",
    anchorId: "mechas",
    number: "02",
    name: "Ruivos, Loiros Nobres, Pretos & Balayage",
    category: "Colorimetria Avançada & Luz Natural",
    duration: "Ritual de Iluminação (4h a 6h)",
    aspiration: "Nuances de alta fidelidade com infusão de Plex e preservação da fibra.",
    tag: "Colorimetria Autoral",
  },
  {
    id: "realinhamento",
    anchorId: "mechas",
    number: "03",
    name: "Realinhamento Capilar Avançado",
    category: "Disciplina & Preservação da Fibra",
    duration: "Ritual Personalizado (2h30 a 3h30)",
    aspiration: "Tratamentos de alinhamento orgânico com preservação absoluta da fibra e brilho espelhado.",
    tag: "Preservação da Fibra",
  },
  {
    id: "terapia",
    anchorId: "mechas",
    number: "04",
    name: "Terapias Capilares & Lavatório Spa",
    category: "Regeneração Cuticular & Folicular",
    duration: "Sessão Spa (1h a 1h30)",
    aspiration: "Reconstrução lipídica profunda e massagem craniana relaxante.",
    tag: "Saúde da Fibra",
  },
  {
    id: "cilios",
    anchorId: "olhar",
    number: "05",
    name: "Harmonização do Olhar & Cílios de Seda",
    category: "Visagismo Facial & Extensão",
    duration: "Sessão Fio a Fio (1h30 a 2h)",
    aspiration: "Extensões de seda ultraleves e simetria facial em proporção áurea.",
    tag: "Precisão Visagista",
  },
  {
    id: "sobrancelhas",
    anchorId: "olhar",
    number: "06",
    name: "Design Estratégico & Visagismo Facial",
    category: "Alinhamento & Brow Lamination",
    duration: "Sessão Visagista (45 min a 1h)",
    aspiration: "Mapeamento facial áureo, micropigmentação suave e valorização da expressão.",
    tag: "Expressão Facial",
  },
  {
    id: "unhas",
    anchorId: "unhas",
    number: "07",
    name: "Alongamento em Fibra & Gel Nobre",
    category: "Arquitetura Ungueal & Blindagem",
    duration: "Estruturação (1h30 a 2h)",
    aspiration: "Curvatura estruturada e bordas ultrafinas para resistência e elegância natural.",
    tag: "Acabamento Joia",
  },
  {
    id: "maosepes",
    anchorId: "unhas",
    number: "08",
    name: "Manicure & Pedicure de Luxo",
    category: "Beleza nas Mãos e Pés",
    duration: "Cuidado Ungueal (1h a 1h30)",
    aspiration: "Cuidado detalhado ungueal, cutilagem de precisão e esmaltação duradoura de alta cobertura.",
    tag: "Mãos & Pés",
  },
  {
    id: "bronze",
    anchorId: "bronze",
    number: "09",
    name: "Bronzeamento em Cabine Tecnológica",
    category: "Cabine Privativa Climatizada",
    duration: "Sessão Rápida & Exclusiva",
    aspiration: "Cabine privativa climatizada com dosimetria segura e marquinha perfeita.",
    tag: "Privacidade Total",
  },
  {
    id: "banhodelua",
    anchorId: "bronze",
    number: "10",
    name: "Banho de Lua & Estética Corporal",
    category: "Clareamento Suave & Esfoliação",
    duration: "Sessão Spa (1h a 1h30)",
    aspiration: "Clareamento suave de pelos sem pinicar, esfoliação aromática e hidratação profunda.",
    tag: "Pele Iluminada",
  },
  {
    id: "laser",
    anchorId: "laser",
    number: "11",
    name: "Depilação a Laser Subzero",
    category: "Tecnologia Ice Comfort",
    duration: "Sessões Rápidas (10 a 30 min)",
    aspiration: "Ponteira resfriada a -10°C para eliminação de pelos com conforto absoluto.",
    tag: "Zero Desconforto",
  },
  {
    id: "massoterapia",
    anchorId: "triagem-inteligente",
    number: "12",
    name: "Massoterapia & Drenagem Corporal",
    category: "Revitalização & Bem-Estar",
    duration: "Sessão Privativa (50 min a 1h20)",
    aspiration: "Alívio do estresse, revitalização corporal e drenagem linfática em cabine privativa climatizada.",
    tag: "Cabine Privativa",
  },
];

interface ServicesGridProps {
  onSelectService: (serviceId: ServiceCategory) => void;
}

export function ServicesGrid({ onSelectService }: ServicesGridProps) {
  const handleScrollTo = (anchorId: string) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="procedimentos"
      aria-labelledby="services-heading"
      className="relative z-10 py-20 md:py-28 bg-[#FAF3F0] border-b border-[#E8D0C8] scroll-mt-20 sm:scroll-mt-24 select-none"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Divisor Decorativo Superior */}
        <div className="w-full flex items-center justify-center pb-8 sm:pb-12" aria-hidden="true">
          <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
          <div className="mx-3 w-1.5 h-1.5 rotate-45 border border-[#C5A880]/60 bg-[#FAF3F0]" />
          <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
        </div>

        {/* Cabeçalho Editorial Minimalista */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E8D0C8] text-[#6E501E] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8F6E32]" aria-hidden="true" />
            <span>Sumário de Rituais Oficiais • Dayane Lima Ateliê Boutique</span>
          </div>

          <h2 
            id="services-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight [text-wrap:balance]"
          >
            A Coleção de Rituais de{" "}
            <span className="italic font-normal font-serif text-[#C58B7E]">
              Alta Costura Capilar & Estética
            </span>
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#44403C] font-sans leading-relaxed max-w-2xl mx-auto [text-wrap:pretty]">
            Protocolos autorais desenvolvidos com rigor técnico de mais de 20 anos e atendimento privativo com hora marcada.
          </p>
        </div>

        {/* Menu de Navegação Fluida (Grid de Luxo) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {RITUALS_INDEX.map((ritual) => (
            <div
              key={ritual.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8D0C8] shadow-xs hover:border-[#C5A880]/70 hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Acabamento de Luxo Acetinado */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C5A880]/10 to-transparent rounded-bl-full pointer-events-none" />

              <div>
                {/* Linha Superior: Número & Tag */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="font-mono text-sm font-bold text-[#8F6E32] tracking-widest">
                    {ritual.number}
                  </span>
                  <span className="text-xs uppercase font-sans font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#FAF3F0] text-[#6E501E] border border-[#E8D0C8]">
                    {ritual.tag}
                  </span>
                </div>

                {/* Categoria */}
                <p className="text-xs uppercase tracking-wider font-sans font-semibold text-[#6E501E] mb-1">
                  {ritual.category}
                </p>

                {/* Nome do Ritual */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] leading-snug group-hover:text-[#6E501E] transition-colors">
                  {ritual.name}
                </h3>

                {/* Duração */}
                <div className="flex items-center gap-1.5 text-sm text-[#44403C] font-sans mt-2 mb-3">
                  <Clock className="w-4 h-4 text-[#8F6E32]" />
                  <span>{ritual.duration}</span>
                </div>

                {/* Micro-copy Aspiracional */}
                <p className="text-sm text-[#292524] font-sans leading-relaxed pt-2 border-t border-[#F0EAE1]">
                  {ritual.aspiration}
                </p>
              </div>

              {/* Botões de Ação Imediata: Rolar para Seção + Agendar */}
              <div className="mt-6 pt-4 border-t border-[#F0EAE1] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleScrollTo(ritual.anchorId)}
                  className="inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-[#1C1917] hover:text-[#6E501E] transition-colors cursor-pointer px-3 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32] rounded-lg min-h-[48px] touch-manipulation"
                  aria-label={`Ver detalhes e galeria de ${ritual.name}`}
                >
                  <span>Ver Detalhes</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8F6E32] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelectService(ritual.id)}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[48px] px-5 py-2.5 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white text-sm font-sans font-semibold transition-all shadow-xs active:scale-95 cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32]"
                  aria-label={`Agendar triagem para ${ritual.name}`}
                >
                  <span>Agendar</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E6C99B]" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Banner Inferior com Garantia Biológica e CTA */}
        <div className="mt-14 sm:mt-16 bg-white rounded-2xl p-5 sm:p-6 border border-[#E8D0C8] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF3F0] border border-[#C5A880]/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#6E501E]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-[#1C1917]">
                Preservação Folicular & Teste de Mecha Obrigatório
              </h4>
              <p className="text-sm text-[#44403C] font-sans leading-relaxed mt-0.5 max-w-xl">
                Diagnóstico prévio e teste de mecha rigoroso antes de qualquer procedimento químico ou de extensão.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectService("megahair")}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 min-h-[50px] px-8 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-sm tracking-wide uppercase shadow-xl transition-all active:scale-95 cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32] shrink-0"
          >
            <span>Iniciar Triagem VIP com a Recepção</span>
            <ArrowRight className="w-4 h-4 text-[#E6C99B]" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default ServicesGrid;
