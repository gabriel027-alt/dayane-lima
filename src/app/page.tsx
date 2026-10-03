"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MegaHairShowcase from "@/components/MegaHairShowcase";
import MechasShowcase from "@/components/MechasShowcase";
import OlharShowcase from "@/components/OlharShowcase";
import UnhasShowcase from "@/components/UnhasShowcase";
import BronzeShowcase from "@/components/BronzeShowcase";
import LaserShowcase from "@/components/LaserShowcase";
import SmartTriageSection from "@/components/SmartTriageSection";
import ServicesGrid from "@/components/ServicesGrid";
import SpaceCarousel from "@/components/SpaceCarousel";
import AuthoritySection from "@/components/AuthoritySection";
import ReviewsSection from "@/components/ReviewsSection";
import LocationAndFooter from "@/components/LocationAndFooter";
import { CarouselStacked, Slide } from "@/components/ui/carousel-07";
import WhatsAppTriageDrawer, { ServiceCategory } from "@/components/WhatsAppTriageDrawer";
import { MessageCircle, MapPin } from "lucide-react";
import {
  GalleryItem,
  MEGAHAIR_GALLERY_ITEMS,
  MECHAS_GALLERY_ITEMS,
  OLHAR_GALLERY_ITEMS,
  UNHAS_GALLERY_ITEMS,
  BRONZE_GALLERY_ITEMS,
  LASER_GALLERY_ITEMS,
  ESPACO_GALLERY_ITEMS,
} from "@/data/mediaCatalog";

// Converte itens do acervo para o padrão visual do CarouselStacked (sem textos/tags)
const toSlides = (items: GalleryItem[]): Slide[] =>
  items.map((item) => ({
    type: item.type,
    src: item.src,
    image: item.src,
  }));

// Coleções estáticas de slides pré-computadas para estabilidade referencial perfeita nos carrosséis
const MEGAHAIR_SLIDES = toSlides(MEGAHAIR_GALLERY_ITEMS);
const MECHAS_SLIDES = toSlides(MECHAS_GALLERY_ITEMS);
const OLHAR_SLIDES = toSlides(OLHAR_GALLERY_ITEMS);
const UNHAS_SLIDES = toSlides(UNHAS_GALLERY_ITEMS);
const BRONZE_SLIDES = toSlides(BRONZE_GALLERY_ITEMS);
const LASER_SLIDES = toSlides(LASER_GALLERY_ITEMS);
const ESPACO_SLIDES = toSlides(ESPACO_GALLERY_ITEMS);

export default function HomePage() {
  const [isTriageOpen, setIsTriageOpen] = useState(false);
  const [initialService, setInitialService] = useState<ServiceCategory | null>(null);

  // Abertura genérica da triagem (Passo 1: Selecionar Serviço)
  const handleOpenGeneralTriage = () => {
    setInitialService(null);
    setIsTriageOpen(true);
  };

  // Abertura contextual a partir de um serviço ou transformação selecionada (Passo 2 direto)
  const handleSelectService = (serviceId: ServiceCategory) => {
    setInitialService(serviceId);
    setIsTriageOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7EAE5] text-[#1C1917] font-sans selection:bg-[#C5A880]/30 selection:text-[#1C1917]">
      
      {/* ===================== 1. CABEÇALHO CONDENSADO COM LOGOTIPO SB OFICIAL ===================== */}
      <Header onOpenTriage={handleOpenGeneralTriage} />

      {/* ===================== 2. HERO PRINCIPAL (VÍDEO DE FUNDO EM LOOP & CARD LATERAL) ===================== */}
      <Hero 
        onOpenTriage={handleOpenGeneralTriage} 
        onExploreServices={() => {
          document.getElementById("megahair")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* ===================== ESPECIALIDADE MESTRE: MEGA HAIR DE NANOCÁPSULAS ===================== */}
      <MegaHairShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL 3D EMPILHADO: MEGA HAIR ===================== */}
      <CarouselStacked
        title="Mega Hair de Nanocápsulas"
        subtitle="HAUTE COIFFURE · DAYANE LIMA"
        slides={MEGAHAIR_SLIDES}
      />

      {/* ===================== COLORIMETRIA & BALAYAGE: MECHAS & LOIROS NOBRES ===================== */}
      <MechasShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL 3D EMPILHADO: MECHAS, LOIROS NOBRES & BALAYAGE ===================== */}
      <CarouselStacked
        title="Mechas, Loiros Nobres & Balayage de Luxo"
        subtitle="COLORIMETRIA AVANÇADA · DAYANE LIMA"
        slides={MECHAS_SLIDES}
      />

      {/* ===================== HARMONIZAÇÃO DO OLHAR: CÍLIOS & SOBRANCELHAS ===================== */}
      <OlharShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL 3D EMPILHADO: CÍLIOS & SOBRANCELHAS ===================== */}
      <CarouselStacked
        title="Cílios & Sobrancelhas"
        subtitle="VISAGISMO DO OLHAR · RAYSSA & HILLERY"
        slides={OLHAR_SLIDES}
      />

      {/* ===================== ARQUITETURA UNGUEAL: UNHAS EM FIBRA & GEL ===================== */}
      <UnhasShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL 3D EMPILHADO: ARQUITETURA UNGUEAL ===================== */}
      <CarouselStacked
        title="Alongamento em Gel & Fibra"
        subtitle="ENGENHARIA UNGUEAL · EMILY LIMA NAILS"
        slides={UNHAS_SLIDES}
      />

      {/* ===================== BRONZEAMENTO EM CABINE TECNOLÓGICA ===================== */}
      <BronzeShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL 3D EMPILHADO: BRONZEAMENTO EM CABINE ===================== */}
      <CarouselStacked
        title="Cabine Tecnológica & Marquinha"
        subtitle="SOL & BRONZE · CABINE TECNOLÓGICA"
        slides={BRONZE_SLIDES}
      />

      {/* ===================== ESTÉTICA CORPORAL & DEPILAÇÃO A LASER SUBZERO ===================== */}
      <LaserShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL 3D EMPILHADO: DEPILAÇÃO A LASER SUBZERO ===================== */}
      <CarouselStacked
        title="Depilação a Laser Subzero"
        subtitle="TECNOLOGIA CLÍNICA · HAKON SUBZERO"
        slides={LASER_SLIDES}
      />

      {/* ===================== TRIAGEM INTELIGENTE DE QUALIFICAÇÃO ===================== */}
      <SmartTriageSection 
        whatsappPhone="5538999999999" 
        onOpenDrawer={handleOpenGeneralTriage} 
      />

      {/* ===================== CATÁLOGO COMPLETO DE PROCEDIMENTOS ===================== */}
      <ServicesGrid onSelectService={handleSelectService} />

      {/* ===================== TOUR IMERSIVO PELO ATELIÊ NO MONTE CARMELO ===================== */}
      <SpaceCarousel onOpenTriage={handleOpenGeneralTriage} />

      {/* ===================== CARROSSEL 3D EMPILHADO: O ATELIÊ & FACHADA ===================== */}
      <CarouselStacked
        title="Tour pelo Ateliê Monte Carmelo"
        subtitle="ESTRUTURA FÍSICA · RUA CALCEDÔNIA, 155"
        slides={ESPACO_SLIDES}
      />

      {/* ===================== AUTORIDADE INSTITUCIONAL: 20+ ANOS DE EXPERIÊNCIA ===================== */}
      <AuthoritySection onOpenTriage={handleOpenGeneralTriage} />

      {/* ===================== CASOS CLÍNICOS & RELATOS REAIS ===================== */}
      <ReviewsSection onOpenTriage={handleOpenGeneralTriage} />

      {/* ===================== LOCALIZAÇÃO NO MONTE CARMELO & FOOTER INSTITUCIONAL ===================== */}
      <LocationAndFooter onOpenTriage={handleOpenGeneralTriage} />

      {/* ===================== DOCK INFERIOR ÚNICA MOBILE (48px TOUCH TARGET) ===================== */}
      <div 
        className="md:hidden fixed bottom-4 inset-x-4 z-40 pb-[env(safe-area-inset-bottom)] pointer-events-none"
        aria-hidden={isTriageOpen}
      >
        <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-[#E8D0C8] rounded-2xl p-2.5 shadow-lg flex items-center justify-between gap-3">
          <div className="pl-2">
            <p className="text-[11px] font-serif font-bold text-[#1C1917]">
              Dayane Lima • Monte Carmelo
            </p>
            <p className="text-[10px] text-[#3D3835] flex items-center gap-1 font-sans">
              <MapPin className="w-3 h-3 text-[#6E501E]" />
              Rua Calcedônia, 155
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenGeneralTriage}
            className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#1C1917] hover:bg-neutral-800 text-white font-sans font-semibold text-xs tracking-wide flex items-center gap-2 shadow-sm active:scale-[0.97] transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
            aria-label="Abrir triagem VIP no WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-[#C5A880]" />
            <span>Triagem VIP</span>
          </button>
        </div>
      </div>

      {/* ===================== GAVETA DE TRIAGEM PRÉVIA PARA WHATSAPP ===================== */}
      <WhatsAppTriageDrawer
        isOpen={isTriageOpen}
        initialServiceId={initialService}
        onClose={() => setIsTriageOpen(false)}
        whatsappPhone="5538999999999" // Número comercial da recepção Dayane Lima SB Estética
      />

    </div>
  );
}
