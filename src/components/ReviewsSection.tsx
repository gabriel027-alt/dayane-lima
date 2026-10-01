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
    specialist: "Dayane Lima • Especialista em Mega Hair e Tricologia Prática",
    protocol: "Protocolo Folicular de Tração Zero (Nanocápsulas 0.5mm)",
    diagnosis: "Haste capilar com perda severa de massa cortical após descoloração agressiva em salão anterior. Pontas afinadas, corte químico e fragilidade nos bulbos occipitais.",
    intervention: "Reconstrução lipídica profunda com aminoácidos biomiméticos, seguida de fusão precisa mecha a mecha com microcápsulas de queratina biocompatível de 0.5mm, respeitando a inclinação anatômica natural dos fios.",
    outcome: "Densidade restaurada de forma homogênea, sem qualquer ponto de tração na raiz biológica. A cliente recuperou comprimento e peso mantendo o crescimento saudável dos fios originais.",
    metrics: [
      { label: "Técnica", value: "Nanocápsulas 0.5mm" },
      { label: "Segurança Folicular", value: "100% Preservada" },
      { label: "Tempo de Aplicação", value: "4h com foco exclusivo" },
      { label: "Ciclo de Retorno", value: "90 a 110 dias" },
    ],
  },
  {
    id: "caso-02",
    tag: "Colorimetria de Precisão • Plex",
    title: "Transição para Loiro Nobre & Morena Iluminada com Preservação de Pontes Cistínicas",
    specialist: "Dayane Lima • Colorista Sênior",
    protocol: "Clareamento Fisiológico com Plex Reconstrutor Contínuo",
    diagnosis: "Cabelo castanho escuro natural com acúmulo de pigmentos metálicos em água de poço e ressecamento cuticular. Desejo de luminosidade sem quebra da fibra.",
    intervention: "Detox capilar quelante para neutralização de metais pesados, teste de mecha prévio com leitura microscópica, aplicação de balayage livre com descoloração controlada a 20 volumes e infusão contínua de Plex reconstrutor.",
    outcome: "Clareamento em 4 níveis com nuances avelã e pérola de alta luminosidade tridimensional sob luz natural, preservando a elasticidade e o toque aveludado da fibra.",
    metrics: [
      { label: "Protocolo", value: "Balayage Freehand + Plex" },
      { label: "Fundo de Clareamento", value: "Altura 8/9 Saudável" },
      { label: "Teste de Mecha", value: "Aprovado com 100% de Força" },
      { label: "Brilho Final", value: "Acabamento Espelhado" },
    ],
  },
  {
    id: "caso-03",
    tag: "Visagismo & Harmonização do Olhar",
    title: "Harmonização de Proporção Áurea Facial & Extensão Fio a Fio de Seda Ultra Leve",
    specialist: "Rayssa Lash & Hillery Thauanne • Especialistas do Ateliê",
    protocol: "Mapeamento Anatômico com Paquímetro & Isolamento Fio a Fio",
    diagnosis: "Assimetria sutil no arco superciliar direito e cílios naturais finos com crescimento reto, demandando realce óptico sem sobrecarga folicular.",
    intervention: "Mapeamento das linhas de força do rosto com paquímetro digital para definição do desenho das sobrancelhas, associado à extensão fio a fio de seda premium (curvatura D, espessura 0.07mm) com adesivo de secagem médica hipoalergênica.",
    outcome: "Olhar aberto, simétrico e expressivo com efeito rímel de alta definição, mantendo a higienização fácil e sem queda prematura dos fios naturais.",
    metrics: [
      { label: "Isolamento", value: "Fio a Fio Clássico de Seda" },
      { label: "Espessura dos Fios", value: "0.07mm (Ultra Leve)" },
      { label: "Simetria", value: "Proporção Áurea Facial" },
      { label: "Manutenção", value: "21 a 28 dias" },
    ],
  },
  {
    id: "caso-04",
    tag: "Arquitetura Capilar & Camuflagem",
    title: "Preenchimento de Laterais & Nuca Anatômica para Penteados Altos",
    specialist: "Dayane Lima • Especialista em Mega Hair",
    protocol: "Distribuição Estratégica em Zonas de Segurança",
    diagnosis: "Cabelos encurtados nas regiões laterais e occipitais por atrito de elásticos de prender e uso excessivo de fontes térmicas desprotegidas.",
    intervention: "Mapeamento em ferradura nas zonas occipitais seguras, inserindo mechas com peso calibrado para não exercer tensão sobre o couro cabeludo. Acabamento especial de nuca limpa.",
    outcome: "Camuflagem completa de emendas. Liberdade absoluta para prender o cabelo em rabo de cavalo alto ou coque sem que nenhuma nanocápsula fique visível.",
    metrics: [
      { label: "Origem dos Fios", value: "100% Humano Brasileiro do Sul" },
      { label: "Penteados", value: "Liberdade Total 360°" },
      { label: "Tração no Bulbo", value: "Zero Sobrecarga" },
      { label: "Alinhamento", value: "Cutículas Unidirecionais (Remy)" },
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
      className="py-20 md:py-28 bg-[#F7EAE5] border-b border-[#E8D0C8] overflow-hidden relative scroll-mt-20 sm:scroll-mt-24"
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
              No Monte Carmelo, não realizamos procedimentos sem antes diagnosticar a biologia do seu fio. Conheça nossos protocolos documentados de preservação folicular e restauração capilar de alta precisão.
            </p>
          </div>

          {/* Controles de Navegação */}
          <div className="flex items-center gap-4 self-start md:self-end">
            <div className="text-xs font-sans text-[#574F4A] tracking-wider">
              <span className="font-bold text-[#1C1917]">0{selectedIndex + 1}</span>
              <span className="mx-1 text-[#4D4642]">/</span>
              <span>0{CLINICAL_CASES.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollPrev}
                className="min-w-[48px] min-h-[48px] w-12 h-12 rounded-full bg-white hover:bg-neutral-100 text-[#1C1917] border border-[#E8D0C8] shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] cursor-pointer"
                aria-label="Caso clínico anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="min-w-[48px] min-h-[48px] w-12 h-12 rounded-full bg-white hover:bg-neutral-100 text-[#1C1917] border border-[#E8D0C8] shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] cursor-pointer"
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
                <article className="bg-white rounded-3xl p-7 sm:p-8 border border-[#E8D0C8] shadow-xs flex flex-col justify-between h-full select-none hover:border-[#C5A880]/60 transition-all duration-200">
                  <div>
                    {/* Tag Superior & Especialista */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-bold bg-[#F4EFEA] text-[#6E501E] border border-[#E8D0C8]">
                        <Sparkles className="w-3 h-3 text-[#C5A880]" />
                        {item.tag}
                      </span>
                      <span className="text-[11px] font-sans font-medium text-[#574F4A]">
                        Registro Clínico Documentado
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1C1917] leading-snug mb-3">
                      {item.title}
                    </h3>

                    <p className="text-xs font-sans font-semibold text-[#6E501E] mb-5">
                      Responsável: {item.specialist}
                    </p>

                    {/* Ficha Diagnóstico vs Intervenção */}
                    <div className="space-y-4 pt-4 border-t border-[#F0EAE1]">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-sans font-bold text-[#4D4642] block mb-1">
                          Diagnóstico & Desafio Fisiológico:
                        </span>
                        <p className="text-sm font-sans text-[#44403C] leading-relaxed">
                          {item.diagnosis}
                        </p>
                      </div>

                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-sans font-bold text-[#4D4642] block mb-1">
                          Intervenção Técnica & Protocolo:
                        </span>
                        <p className="text-sm font-sans text-[#44403C] leading-relaxed">
                          {item.intervention}
                        </p>
                      </div>

                      <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E8D0C8]">
                        <span className="text-[11px] uppercase tracking-wider font-sans font-bold text-[#6E501E] flex items-center gap-1.5 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Desfecho & Preservação Folicular:
                        </span>
                        <p className="text-sm font-sans font-medium text-[#1C1917] leading-relaxed">
                          {item.outcome}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Grade de Metadados Clínicos */}
                  <div className="mt-6 pt-5 border-t border-[#F0EAE1] grid grid-cols-2 gap-3 sm:gap-4">
                    {item.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-[#F8F5F0] rounded-xl p-2.5 border border-[#EBE4D8]">
                        <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-[#4D4642] block">
                          {metric.label}
                        </span>
                        <span className="text-xs font-sans font-bold text-[#1C1917] mt-0.5 block">
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
        <div className="mt-14 sm:mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-[#E5DDD0] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(ellipse_at_top_right,rgba(197,168,128,0.12),transparent_70%)] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#C5A880]/30 text-[#6E501E] text-xs font-sans font-bold uppercase tracking-wider mb-4">
                <HeartHandshake className="w-3.5 h-3.5 text-[#6E501E]" />
                O Manifesto de Atendimento VIP
              </div>

              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1C1917] leading-snug">
                Seu Horário é Sagrado:{" "}
                <span className="italic font-normal font-serif text-[#6E501E]">
                  Sem Esteira, Sem Espera, Sem Tumulto.
                </span>
              </h3>

              <p className="mt-4 text-sm sm:text-base font-sans text-[#44403C] leading-relaxed">
                Recusamos categoricamente o formato industrial de salões que atendem três ou quatro clientes simultaneamente. No Monte Carmelo, seu horário é reservado exclusivamente para você. Nossa bancada, nossa especialista e nossa atenção plena são dedicadas a um único cabelo por vez, com café gourmet selecionado, ambiente climatizado e acústica serena.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E5DDD0]">
                <Clock className="w-5 h-5 text-[#6E501E] mb-2" />
                <h4 className="font-sans font-bold text-sm text-[#1C1917]">Hora Marcada com Rigor</h4>
                <p className="text-xs font-sans text-[#574F4A] mt-1">
                  Atendimento sem atrasos e sem clientes sobrepostas na mesma bancada.
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E5DDD0]">
                <Microscope className="w-5 h-5 text-[#6E501E] mb-2" />
                <h4 className="font-sans font-bold text-sm text-[#1C1917]">Diagnóstico Pré-Procedimento</h4>
                <p className="text-xs font-sans text-[#574F4A] mt-1">
                  Teste de mecha obrigatório e análise tricoscópica da densidade biológica.
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E5DDD0]">
                <ShieldCheck className="w-5 h-5 text-[#6E501E] mb-2" />
                <h4 className="font-sans font-bold text-sm text-[#1C1917]">Saúde Folicular Inegociável</h4>
                <p className="text-xs font-sans text-[#574F4A] mt-1">
                  Se o fio não estiver apto quimicamente, priorizamos o tratamento à química.
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E5DDD0]">
                <UserCheck className="w-5 h-5 text-[#6E501E] mb-2" />
                <h4 className="font-sans font-bold text-sm text-[#1C1917]">Acompanhamento Pós-Aplicação</h4>
                <p className="text-xs font-sans text-[#574F4A] mt-1">
                  Suporte direto com orientações de lavagem e manutenção domiciliar.
                </p>
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
              className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-8 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <span>Agendar Diagnóstico Clínico no WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default ReviewsSection;
