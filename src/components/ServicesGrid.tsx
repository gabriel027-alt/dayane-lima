"use client";

import React, { useState, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight, Clock, CheckCircle2, ChevronRight, Play, Pause, Camera } from "lucide-react";
import { ServiceCategory } from "./WhatsAppTriageDrawer";

interface RitualDetail {
  id: ServiceCategory;
  tabValue: string;
  number: string;
  name: string;
  category: string;
  duration: string;
  mediaType: "video" | "image";
  mediaSrc: string;
  poster?: string;
  alt: string;
  mediaClassName?: string;
  headline: string;
  description: string;
  highlights: string[];
}

const RITUALS_CATALOG: RitualDetail[] = [
  {
    id: "megahair",
    tabValue: "megahair",
    number: "01",
    name: "Mega Hair Invisível & Nanocápsulas",
    category: "Alongamento & Densidade Imperceptível",
    duration: "Ritual de 3h a 5h",
    mediaType: "video",
    mediaSrc: "/midias/video-megahair-dayane1.mp4",
    mediaClassName: "object-cover object-center",
    alt: "Aplicação técnica de Nanocápsulas de Mega Hair na raiz no ateliê SB Estética",
    headline: "União milimétrica na raiz com liberdade e preservação total",
    description:
      "Aplicação mecha a mecha com nanocápsulas e fita biocompatível ultrafina que se integram de forma imperceptível ao seu couro cabeludo. Fios 100% humanos brasileiros selecionados com cutícula intacta, permitindo coques altos e movimento fluido sem tração.",
    highlights: [
      "Fixação biocompatível ultrafina livre de tração",
      "Fios humanos nobres com movimento e caimento sedoso",
      "Divisão geométrica que respeita o ciclo biológico capilar",
    ],
  },
  {
    id: "mechas",
    tabValue: "mechas",
    number: "02",
    name: "Mechas, Loiros Nobres & Balayage de Luxo",
    category: "Loiros Nobres & Morenas Iluminadas",
    duration: "Ritual de 4h a 6h",
    mediaType: "video",
    mediaSrc: "/midias/cabelo2-dayane.mp4",
    mediaClassName: "object-cover object-center",
    poster: "/midias/cabelo3-dayane.jpg",
    alt: "Mechas e morena iluminada com reflexos e brilho sob luz natural",
    headline: "Clareamento estratégico com proteção total das pontes de queratina",
    description:
      "Loiros nobres e morenas iluminadas desenvolvidos sob medida sob a luz natural do nosso ateliê. Micro-mechas sem marcações abruptas, acompanhadas de plex reconstrutor e infusão lipídica durante a descoloração para preservar a sedosidade.",
    highlights: [
      "Diagnóstico e teste de mecha obrigatórios",
      "Degradê personalizado em tons avelã, mel e pérola",
      "Preservação da elasticidade e integridade da fibra",
    ],
  },
  {
    id: "cilios",
    tabValue: "cilios",
    number: "03",
    name: "Extensão de Cílios Fio a Fio",
    category: "Harmonização do Olhar • Rayssa Lash",
    duration: "Ritual de 1h30 a 2h",
    mediaType: "video",
    mediaSrc: "/midias/cilios-sobrancelha3-dayane.mp4",
    mediaClassName: "object-cover object-center",
    poster: "/midias/cilios-sobrancelha1-dayane.jpg",
    alt: "Extensão de cílios de alta precisão com higienização spa e fios de seda ultraleves",
    headline: "Isolamento milimétrico com fios ultraleves e mapeamento visagista",
    description:
      "Mapeamento anatômico personalizado que respeita o formato dos seus olhos e a saúde dos fios naturais. Fios de seda ultraleves, adesivos certificados e desenho harmônico executado por especialista dedicada para valorizar o olhar.",
    highlights: [
      "Higienização spa preparatória e isolamento fio a fio",
      "Fios de seda levíssimos com zero sensação de peso",
      "Harmonização visagista com a curvatura ocular",
    ],
  },
  {
    id: "sobrancelhas",
    tabValue: "sobrancelhas",
    number: "04",
    name: "Design de Sobrancelhas & Visagismo",
    category: "Simetria Facial • Hillery Thauanne",
    duration: "Sessão de 45min a 1h",
    mediaType: "image",
    mediaSrc: "/midias/cilios-sobrancelha2-dayane.jpg",
    mediaClassName: "object-cover object-center",
    alt: "Design de sobrancelhas com visagismo facial, proporção áurea e alinhamento",
    headline: "Proporção áurea facial e harmonização da expressão",
    description:
      "Desenho estratégico calculado de acordo com as linhas faciais e a estrutura óssea de cada cliente. Técnicas de visagismo sob medida, tintura personalizada e alinhamento que valorizam sua identidade sem artificialidade.",
    highlights: [
      "Mapeamento milimétrico de simetria com paquímetro",
      "Tintura personalizada respeitando seu tom de pele e fios",
      "Design que valoriza e recupera o desenho natural",
    ],
  },
  {
    id: "unhas",
    tabValue: "unhas",
    number: "05",
    name: "Alongamento de Unhas em Gel & Fibra",
    category: "Alta Resistência • Emily Lima Nails",
    duration: "Sessão de 1h30 a 2h",
    mediaType: "video",
    mediaSrc: "/midias/video-unhas-dayane1.mp4",
    mediaClassName: "object-cover object-center",
    poster: "/midias/unha-dayane4.jpg",
    alt: "Alongamento de unhas em gel e fibra com francesa impecável e joias",
    headline: "Estruturação milimétrica em fibra de vidro e francesa impecável",
    description:
      "Acabamento ultrafino e curvatura C perfeita que aliam extrema resistência mecânica e aparência de unha natural. Blindagem estruturada em gel, esmaltação de alta durabilidade e acabamentos joia exclusivos por Emily Lima Nails.",
    highlights: [
      "Fibra de vidro e gel de alta pureza e durabilidade",
      "Acabamento fino sem aspecto grosseiro ou pesado",
      "Manutenção programada que preserva a matriz ungueal",
    ],
  },
  {
    id: "bronze",
    tabValue: "bronze",
    number: "06",
    name: "Bronzeamento em Cabine Tecnológica",
    category: "Cabine Privativa • Sol & Bronze",
    duration: "Sessão individual rápida",
    mediaType: "video",
    mediaSrc: "/midias/video-bronzeamento-dayane.mp4",
    mediaClassName: "object-cover object-center",
    poster: "/midias/foto-bronzeamento-dayane1.jpg",
    alt: "Cabine moderna de bronzeamento e marquinha de fita milimétrica",
    headline: "Bronzeamento de precisão em cabine moderna e fitas anatômicas",
    description:
      "Espaço privativo equipado com cabine de bronzeamento de alta precisão e controle de emissão para um tom dourado homogêneo e duradouro. Protocolos integrados de marquinha de fita sob medida e hidratação profunda aceleradora.",
    highlights: [
      "Cabine individual climatizada com emissão calibrada",
      "Marquinha de fita milimétrica e contorno perfeito",
      "Cosmecêuticos aceleradores nutritivos e certificados",
    ],
  },
  {
    id: "laser",
    tabValue: "laser",
    number: "07",
    name: "Depilação a Laser & Estética Corporal",
    category: "Alta Tecnologia • Pele Lisa",
    duration: "Sessões de 10 a 30 min",
    mediaType: "video",
    mediaSrc: "/midias/video-depilação-lazer-dayane1.mp4",
    mediaClassName: "object-cover object-center",
    alt: "Depilação a laser Hakon 4D com ponteira subzero e feixe de alta precisão",
    headline: "Eliminação definitiva dos pelos com ponteira ultra-resfriada",
    description:
      "Tecnologia Hakon 4D com resfriamento contínuo de até -5°C que destrói a raiz dos pelos sem dor nem agressão cutânea. Clareamento de axilas e virilhas manchadas por atrito e fim absoluto da foliculite.",
    highlights: [
      "Ponteira Subzero Ice Comfort para máximo conforto",
      "Ação clareadora e tratamento definitivo de foliculite",
      "Segurança comprovada para peles claras, morenas e negras",
    ],
  },
  {
    id: "terapia",
    tabValue: "terapia",
    number: "08",
    name: "Terapias Capilares & Cronograma",
    category: "Regeneração & Saúde da Fibra",
    duration: "Sessão de 1h a 1h30",
    mediaType: "image",
    mediaSrc: "/midias/brevecapa-cabelohidratação-dayane.jpg",
    mediaClassName: "object-cover object-center",
    alt: "Terapia capilar profunda no lavatório spa climatizado com massagem craniana",
    headline: "Reconstrução lipídica profunda e rituais de lavatório spa",
    description:
      "Tratamentos profundos de reposição de massa, aminoácidos e nutrientes essenciais. Diagnóstico do couro cabeludo e cronograma capilar personalizado no lavatório spa climatizado para devolver elasticidade, densidade e reflexo espelhado aos fios.",
    highlights: [
      "Repositor de massa e lipídios com selagem de cutículas",
      "Tratamentos no lavatório spa climatizado com massagem craniana",
      "Recuperação imediata do toque sedoso e brilho espelhado",
    ],
  },
];

interface ServicesGridProps {
  onSelectService: (serviceId: ServiceCategory) => void;
}

export function ServicesGrid({ onSelectService }: ServicesGridProps) {
  const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({
    megahair: true,
    mechas: true,
    cilios: true,
    sobrancelhas: true,
    unhas: true,
    bronze: true,
    laser: true,
    terapia: true,
  });

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const toggleVideo = (tabValue: string) => {
    const video = videoRefs.current[tabValue];
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setPlayingVideos((prev) => ({ ...prev, [tabValue]: true }));
    } else {
      video.pause();
      setPlayingVideos((prev) => ({ ...prev, [tabValue]: false }));
    }
  };

  return (
    <section 
      id="procedimentos"
      aria-labelledby="services-heading"
      className="py-20 md:py-28 bg-[#F7EAE5] border-b border-[#E8D0C8] scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Divisor Decorativo Superior */}
        <div className="w-full flex items-center justify-center pb-8 sm:pb-12" aria-hidden="true">
          <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
          <div className="mx-3 w-1.5 h-1.5 rotate-45 border border-[#C5A880]/60 bg-[#F7EAE5]" />
          <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
        </div>

        {/* Cabeçalho Editorial Clean */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8D0C8] text-[#6E501E] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" aria-hidden="true" />
            <span>Cardápio de Rituais Oficiais • SB Estética e Beleza</span>
          </div>

          <h2 
            id="services-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight [text-wrap:balance]"
          >
            Procedimentos Realizados com{" "}
            <span className="italic font-normal font-serif text-[#C58B7E]">
              Precisão de Alta Costura
            </span>
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#574F4A] font-sans leading-relaxed [text-wrap:pretty]">
            Sete especialidades executadas com atendimento individualizado no Monte Carmelo, respeitando a biologia da fibra capilar e o rigor estético.
          </p>
        </div>

        {/* Módulo de Abas Integrado com Shadcn/UI Tabs */}
        <Tabs defaultValue="megahair" className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* COLUNA ESQUERDA: TabsList Elegante com 7 Procedimentos */}
            <TabsList className="lg:col-span-5 flex flex-col space-y-2.5 bg-transparent p-0 w-full h-auto">
              {RITUALS_CATALOG.map((ritual) => (
                <TabsTrigger
                  key={ritual.tabValue}
                  value={ritual.tabValue}
                  className="w-full text-left py-4 px-5 rounded-2xl border flex items-center justify-between gap-4 touch-manipulation cursor-pointer transition-all duration-200 h-auto bg-white border-[#E8D0C8] text-[#44403C] hover:bg-[#FAF3F0] hover:border-[#C5A880]/40 data-active:bg-white data-active:border-[#C58B7E] data-active:shadow-sm data-active:text-[#1C1917] data-active:translate-x-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#C5A880] shrink-0" />
                    <div>
                      <h3 className="font-serif text-sm sm:text-base font-bold text-[#1C1917] leading-snug">
                        {ritual.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#574F4A] font-sans mt-0.5">
                        {ritual.category}
                      </p>
                    </div>
                  </div>

                  <ChevronRight 
                    className="w-4 h-4 shrink-0 text-[#4D4642] group-data-active:text-[#1C1917]"
                    aria-hidden="true" 
                  />
                </TabsTrigger>
              ))}
            </TabsList>

            {/* COLUNA DIREITA: Card Branco com Mídia Real e Especificações */}
            <div className="lg:col-span-7">
              {RITUALS_CATALOG.map((ritual) => (
                <TabsContent 
                  key={ritual.tabValue} 
                  value={ritual.tabValue}
                  className="mt-0 outline-none transition-all duration-300 animate-in fade-in-50"
                >
                  <Card className="rounded-3xl border border-[#E8D0C8] shadow-xs overflow-hidden bg-white min-h-[520px] p-0 gap-0">
                    
                    {/* Container de Mídia: Vídeo Real ou Fotografia Macro */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                      {ritual.mediaType === "video" ? (
                        <>
                          <video
                            ref={(el) => {
                              videoRefs.current[ritual.tabValue] = el;
                            }}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            poster={ritual.poster}
                            className={`w-full h-full ${ritual.mediaClassName || "object-cover object-center"}`}
                          >
                            <source src={ritual.mediaSrc} type="video/mp4" />
                          </video>

                          {/* Botão Play / Pause */}
                          <button
                            type="button"
                            onClick={() => toggleVideo(ritual.tabValue)}
                            className="absolute top-4 right-4 z-20 inline-flex items-center justify-center min-w-[48px] min-h-[48px] w-12 h-12 rounded-full bg-black/60 hover:bg-white hover:text-neutral-900 text-white backdrop-blur-md border border-white/20 transition-all duration-200 shadow-md active:scale-95 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                            aria-label={playingVideos[ritual.tabValue] ? "Pausar vídeo" : "Reproduzir vídeo"}
                          >
                            {playingVideos[ritual.tabValue] ? (
                              <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                            ) : (
                              <Play className="w-3.5 h-3.5 fill-current ml-0.5" aria-hidden="true" />
                            )}
                          </button>
                        </>
                      ) : (
                        <div className="relative w-full h-full group overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={ritual.mediaSrc}
                            alt={ritual.alt}
                            className={`w-full h-full ${ritual.mediaClassName || "object-cover object-center"} transition-transform duration-700 ease-out group-hover:scale-105`}
                          />
                        </div>
                      )}
                    </div>

                    {/* Especificações Técnicas e Botão de Ação */}
                    <CardContent className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-[#F2DDD6]">
                          <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#6E501E]">
                            {ritual.category}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-[#574F4A] font-sans">
                            <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                            {ritual.duration}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-serif text-sm font-semibold text-[#6E501E]">
                            Procedimento Oficial
                          </span>
                          <span className="w-1 h-1 rounded-full bg-[#D6CBBF]" />
                          <span className="text-xs text-[#574F4A] font-sans">
                            Monte Carmelo • Montes Claros
                          </span>
                        </div>

                        <h3 className="font-serif text-2xl font-bold text-[#1C1917] leading-snug">
                          {ritual.name}
                        </h3>

                        <p className="mt-1.5 text-sm sm:text-base font-serif italic text-[#6E501E] leading-snug">
                          {ritual.headline}
                        </p>

                        <p className="mt-3 text-xs sm:text-sm text-[#44403C] font-sans leading-relaxed">
                          {ritual.description}
                        </p>

                        {/* Especificações Técnicas */}
                        <div className="mt-5 pt-5 border-t border-[#F0EAE1] space-y-2.5">
                          {ritual.highlights.map((item, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1C1917] font-sans">
                              <CheckCircle2 className="w-4 h-4 text-[#6E501E] shrink-0" aria-hidden="true" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Botão de Ação para Triagem Direta */}
                      <div className="mt-8 pt-6 border-t border-[#F0EAE1] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="text-xs text-[#574F4A] font-sans">
                          Atendimento sob agendamento prévio com Dayane Lima
                        </span>

                        <button
                          type="button"
                          onClick={() => onSelectService(ritual.id)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-[#1C1917] hover:bg-neutral-800 text-white font-sans font-semibold text-xs tracking-wide shadow-sm hover:shadow transition-all duration-200 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] cursor-pointer"
                          aria-label={`Consultar disponibilidade para ${ritual.name}`}
                        >
                          <span>Consultar Disponibilidade</span>
                          <ArrowRight className="w-4 h-4 text-[#C5A880] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </button>
                      </div>
                    </CardContent>

                  </Card>
                </TabsContent>
              ))}
            </div>

          </div>
        </Tabs>

        {/* CTA Geral do Catálogo de Procedimentos */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => onSelectService("megahair")}
            className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-8 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl transition-all active:scale-95 cursor-pointer"
          >
            <span>Falar com a Recepção no WhatsApp sobre Procedimentos</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default ServicesGrid;
