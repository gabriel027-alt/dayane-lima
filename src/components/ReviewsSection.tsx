"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ShieldCheck, ChevronLeft, ChevronRight, Sparkles, CheckCircle2, Clock, Microscope, HeartHandshake, UserCheck, ArrowRight } from "lucide-react";

interface ClinicalCase {
  id: string;
  tag: string;
  title: string;
  specialist: string;
  protocol: string;
  diagnosis: string;
  intervention: string;
  outcome: string;
  metrics: { label: string; value: string }[];
}

const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: "caso-01",
    tag: "Alta Costura Capilar • Nanocápsulas",
    title: "Recuperação Pós-Corte Químico & Extensão em Nanocápsulas Biocompatíveis",
    specialist: "Dayane Lima • Mega Hair & Tricologia",
    protocol: "Tração Zero em Nanocápsulas 0.5mm",
    diagnosis: "Perda severa de massa cortical e corte químico pós-descoloração em salão anterior.",
    intervention: "Reconstrução lipídica profunda e extensão mecha a mecha com nanocápsulas de 0.5mm.",
    outcome: "Densidade e comprimento restaurados com tração zero e crescimento natural preservado.",
    metrics: [
      { label: "Técnica", value: "Nanocápsulas 0.5mm" },
      { label: "Segurança Folicular", value: "100% Preservada" },
      { label: "Aplicação", value: "Foco Exclusivo" },
      { label: "Manutenção", value: "90 a 110 dias" },
    ],
  },
  {
    id: "caso-02",
    tag: "Colorimetria de Precisão • Plex",
    title: "Transição para Loiro Nobre & Morena Iluminada com Preservação da Fibra",
    specialist: "Dayane Lima • Colorista Sênior",
    protocol: "Clareamento Fisiológico com Plex",
    diagnosis: "Castanho escuro com ressecamento e histórico químico, demandando iluminação segura.",
    intervention: "Detox quelante de metais, teste de mecha e balayage com infusão contínua de Plex.",
    outcome: "Nuances luminosas em 4 níveis com toque sedoso e fibra capilar 100% íntegra.",
    metrics: [
      { label: "Protocolo", value: "Balayage + Plex" },
      { label: "Fundo de Cor", value: "Altura 8/9 Saudável" },
      { label: "Teste de Mecha", value: "100% Resistência" },
      { label: "Acabamento", value: "Brilho Espelhado" },
    ],
  },
  {
    id: "caso-03",
    tag: "Visagismo & Harmonização do Olhar",
    title: "Harmonização em Proporção Áurea & Extensão Fio a Fio de Seda",
    specialist: "Rayssa Lash & Hillery Thauanne",
    protocol: "Mapeamento Anatômico & Seda Ultra Leve",
    diagnosis: "Fios naturais finos e assimetria sutil no arco superciliar.",
    intervention: "Mapeamento facial com paquímetro digital e extensão fio a fio de seda 0.07mm.",
    outcome: "Olhar aberto, simétrico e expressivo com alta retenção e zero sobrecarga.",
    metrics: [
      { label: "Isolamento", value: "Fio a Fio de Seda" },
      { label: "Espessura", value: "0.07mm Ultra Leve" },
      { label: "Simetria", value: "Proporção Áurea" },
      { label: "Retorno", value: "21 a 28 dias" },
    ],
  },
  {
    id: "caso-04",
    tag: "Arquitetura Capilar & Camuflagem",
    title: "Preenchimento de Laterais & Nuca Anatômica para Penteados Altos",
    specialist: "Dayane Lima • Mega Hair",
    protocol: "Distribuição Estratégica em Zonas Seguras",
    diagnosis: "Laterais encurtadas por atrito mecânico e tração cotidiana.",
    intervention: "Distribuição em zonas de segurança com peso calibrado e acabamento de nuca limpa.",
    outcome: "Camuflagem imperceptível e liberdade total para coques e rabos de cavalo altos.",
    metrics: [
      { label: "Origem", value: "100% Humano Brasileiro" },
      { label: "Penteados", value: "Liberdade 360°" },
      { label: "Tração", value: "Zero Sobrecarga" },
      { label: "Alinhamento", value: "Cutículas Intactas" },
    ],
  },
];

interface ReviewsSectionProps {
  onOpenTriage?: () => void;
}

export function ReviewsSection({ onOpenTriage }: ReviewsSectionProps = {}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section 
      id="casos-clinicos"
      aria-labelledby="casos-clinicos-heading"
      className="relative z-10 py-20 md:py-28 bg-[#FAF3F0] border-b border-[#E8D0C8] overflow-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Cabeçalho Editorial com Selo de Rigor Clínico */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E8D0C8] text-[#1C1917] shadow-sm mb-4">
              <Microscope className="w-3.5 h-3.5 text-[#6E501E]" aria-hidden="true" />
              <span className="text-xs font-sans font-bold tracking-wider uppercase text-[#1C1917]">
                Casos Clínicos & Relatos Reais de Autoridade
              </span>
            </div>

            <h2 
              id="casos-clinicos-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight [text-wrap:balance]"
            >
              A Ciência & Arte por Trás de{" "}
              <span className="italic font-normal font-serif text-[#C58B7E]">
                Cada Transformação
              </span>
            </h2>
            
            <p className="mt-4 text-base sm:text-lg text-[#44403C] font-sans leading-relaxed [text-wrap:pretty]">
              Protocolos documentados de preservação folicular, colorimetria de precisão e extensão capilar no Monte Carmelo.
            </p>
          </div>

          {/* Controles de Navegação */}
          <div className="flex items-center gap-4 self-start md:self-end">
            <div className="text-xs font-sans text-[#44403C] tracking-wider font-medium">
              <span className="font-bold text-[#1C1917]">0{selectedIndex + 1}</span>
              <span className="mx-1 text-[#44403C]">/</span>
              <span>0{CLINICAL_CASES.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollPrev}
                className="min-w-[48px] min-h-[48px] w-12 h-12 rounded-full bg-white hover:bg-neutral-100 text-[#1C1917] border border-[#E8D0C8] shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32] cursor-pointer"
                aria-label="Caso clínico anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="min-w-[48px] min-h-[48px] w-12 h-12 rounded-full bg-white hover:bg-neutral-100 text-[#1C1917] border border-[#E8D0C8] shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32] cursor-pointer"
                aria-label="Próximo caso clínico"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carrossel Embla com Fichas Técnicas Editoriais */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing -mx-4 px-4 sm:-mx-6 sm:px-6" ref={emblaRef}>
          <div className="flex -ml-5 sm:-ml-6">
            {CLINICAL_CASES.map((item) => (
              <div 
                key={item.id}
                className="flex-[0_0_100%] lg:flex-[0_0_50%] pl-5 sm:pl-6 min-w-0"
              >
                <article className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8D0C8] shadow-xs flex flex-col justify-between h-full select-none hover:border-[#C5A880]/60 transition-all duration-200">
                  <div>
                    {/* Tag Superior & Especialista */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-bold bg-[#F4EFEA] text-[#6E501E] border border-[#E8D0C8]">
                        <Sparkles className="w-3.5 h-3.5 text-[#8F6E32]" />
                        {item.tag}
                      </span>
                      <span className="text-xs font-sans font-semibold text-[#44403C]">
                        Registro Clínico
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1917] leading-snug mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs font-sans font-semibold text-[#6E501E] mb-4">
                      {item.specialist}
                    </p>

                    {/* Resumo Clínico Condensado */}
                    <div className="space-y-2.5 pt-3 border-t border-[#F0EAE1] text-xs sm:text-sm font-sans">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-[#1C1917] shrink-0">Desafio:</span>
                        <span className="text-[#44403C]">{item.diagnosis}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-[#1C1917] shrink-0">Protocolo:</span>
                        <span className="text-[#44403C]">{item.intervention}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8D0C8] flex items-start gap-2 text-[#1C1917]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="font-medium text-xs sm:text-sm">{item.outcome}</span>
                      </div>
                    </div>
                  </div>

                  {/* Grade de Metadados Clínicos */}
                  <div className="mt-5 pt-4 border-t border-[#F0EAE1] grid grid-cols-2 gap-2.5">
                    {item.metrics.slice(0, 2).map((metric, idx) => (
                      <div key={idx} className="bg-[#F8F5F0] rounded-xl p-2.5 border border-[#EBE4D8]">
                        <span className="text-[11px] uppercase font-sans font-semibold tracking-wider text-[#44403C] block">
                          {metric.label}
                        </span>
                        <span className="text-xs sm:text-sm font-sans font-bold text-[#1C1917] mt-0.5 block">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* ===================== MANIFESTO: ATENDIMENTO VIP SEM ESTEIRA NO MONTE CARMELO ===================== */}
        <div className="mt-14 sm:mt-16 bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-[#E5DDD0] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(ellipse_at_top_right,rgba(197,168,128,0.12),transparent_70%)] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#C5A880]/30 text-[#6E501E] text-xs font-sans font-bold uppercase tracking-wider mb-4">
                <HeartHandshake className="w-4 h-4 text-[#6E501E]" />
                O Manifesto de Atendimento VIP
              </div>

              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1C1917] leading-snug">
                Seu Horário é Sagrado:{" "}
                <span className="italic font-normal font-serif text-[#6E501E]">
                  Sem Esteira, Sem Espera.
                </span>
              </h3>

              <p className="mt-3 text-sm sm:text-base font-sans text-[#292524] leading-relaxed">
                Atendimento individual e exclusivo. Uma única cliente por horário, com atenção plena da especialista e atmosfera privativa no Monte Carmelo.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-3.5">
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E5DDD0]">
                <Clock className="w-4 h-4 text-[#8F6E32] mb-1" />
                <h4 className="font-sans font-bold text-xs sm:text-sm text-[#1C1917]">Zero Atrasos</h4>
                <p className="text-xs text-[#44403C] mt-0.5">Dedicação exclusiva por horário.</p>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E5DDD0]">
                <Microscope className="w-4 h-4 text-[#8F6E32] mb-1" />
                <h4 className="font-sans font-bold text-xs sm:text-sm text-[#1C1917]">Diagnóstico</h4>
                <p className="text-xs text-[#44403C] mt-0.5">Teste de mecha obrigatório.</p>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E5DDD0]">
                <ShieldCheck className="w-4 h-4 text-[#8F6E32] mb-1" />
                <h4 className="font-sans font-bold text-xs sm:text-sm text-[#1C1917]">Saúde Folicular</h4>
                <p className="text-xs text-[#44403C] mt-0.5">Preservação biológica da raiz.</p>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E5DDD0]">
                <UserCheck className="w-4 h-4 text-[#8F6E32] mb-1" />
                <h4 className="font-sans font-bold text-xs sm:text-sm text-[#1C1917]">Pós-Aplicação</h4>
                <p className="text-xs text-[#44403C] mt-0.5">Suporte direto de manutenção.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA de Agendamento de Caso Clínico no WhatsApp */}
        {onOpenTriage && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={onOpenTriage}
              aria-label="Agendar diagnóstico clínico capilar com teste de mecha no WhatsApp"
              className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-8 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-sm tracking-wide uppercase shadow-xl transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32]"
            >
              <span>Agendar Diagnóstico Clínico no WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-[#E6C99B]" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default ReviewsSection;
