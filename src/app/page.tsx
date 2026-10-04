"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import HeroScrollScrub from "@/components/HeroScrollScrub";
import BrandRevelationHero from "@/components/BrandRevelationHero";
import MegaHairShowcase from "@/components/MegaHairShowcase";
import MechasShowcase from "@/components/MechasShowcase";
import OlharShowcase from "@/components/OlharShowcase";
import UnhasShowcase from "@/components/UnhasShowcase";
import BronzeShowcase from "@/components/BronzeShowcase";
import LaserShowcase from "@/components/LaserShowcase";
import WellnessShowcase from "@/components/WellnessShowcase";
import SmartTriageSection from "@/components/SmartTriageSection";
import ServicesGrid from "@/components/ServicesGrid";
import SpaceCarousel from "@/components/SpaceCarousel";
import AuthoritySection from "@/components/AuthoritySection";
import ReviewsSection from "@/components/ReviewsSection";
import LocationAndFooter from "@/components/LocationAndFooter";
import StickyConversionBar from "@/components/StickyConversionBar";
import { CarouselStacked, Slide } from "@/components/ui/carousel-07";
import WhatsAppTriageDrawer, { ServiceCategory } from "@/components/WhatsAppTriageDrawer";
import {
  GalleryItem,
  AtelierContentData,
  ATELIER_CONTENT,
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

export default function HomePage() {
  const [isTriageOpen, setIsTriageOpen] = useState(false);
  const [initialService, setInitialService] = useState<ServiceCategory | null>(null);

  // Estado dinâmico do conteúdo do ateliê
  const [content, setContent] = useState<AtelierContentData>(ATELIER_CONTENT);

  // Sincronização automática com localStorage e API do painel administrativo
  useEffect(() => {
    const syncLocal = () => {
      try {
        const stored = localStorage.getItem("atelier_content_override");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === "object") {
            setContent(parsed);
          }
        }
      } catch {}
    };

    // 1. Carregamento imediato do cache local
    syncLocal();

    // 2. Sincronização em background com a API do servidor
    fetch("/api/admin/content", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.content) {
          setContent(data.content);
        }
      })
      .catch(() => {});

    // 3. Ouvir atualizações de outras abas ou do painel admin
    window.addEventListener("storage", syncLocal);
    return () => window.removeEventListener("storage", syncLocal);
  }, []);

  // Slides dinâmicos computados com memoização de alta performance
  const megahairSlides = useMemo(
    () => toSlides(content.megahair || MEGAHAIR_GALLERY_ITEMS),
    [content.megahair]
  );
  const mechasSlides = useMemo(
    () => toSlides(content.mechas || MECHAS_GALLERY_ITEMS),
    [content.mechas]
  );
  const olharSlides = useMemo(
    () => toSlides(content.olhar || OLHAR_GALLERY_ITEMS),
    [content.olhar]
  );
  const unhasSlides = useMemo(
    () => toSlides(content.unhas || UNHAS_GALLERY_ITEMS),
    [content.unhas]
  );
  const bronzeSlides = useMemo(
    () => toSlides(content.bronze || BRONZE_GALLERY_ITEMS),
    [content.bronze]
  );
  const laserSlides = useMemo(
    () => toSlides(content.laser || LASER_GALLERY_ITEMS),
    [content.laser]
  );
  const espacoSlides = useMemo(
    () => toSlides(content.espaco || ESPACO_GALLERY_ITEMS),
    [content.espaco]
  );

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
    <div className="min-h-screen bg-[#FAF3F0] text-[#1C1917] font-sans selection:bg-[#C5A880]/30 selection:text-[#1C1917]">
      
      {/* ===================== 0. ULTRA-PREMIUM SCROLL-LINKED FRAME SCRUBBING (CANVAS HERO) ===================== */}
      <HeroScrollScrub 
        onOpenTriage={handleOpenGeneralTriage}
        onExplore={() => {
          const target = document.getElementById("revelacao") || document.getElementById("procedimentos");
          target?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* ===================== 1. CABEÇALHO CONDENSADO COM LOGOTIPO OFICIAL DAYANE LIMA (STICKY) ===================== */}
      <Header onOpenTriage={handleOpenGeneralTriage} />

      {/* ===================== 2. SEÇÃO 2: A REVELAÇÃO DA MARCA & CONVERSÃO (HERO LIGHT) ===================== */}
      <BrandRevelationHero 
        onOpenTriage={handleOpenGeneralTriage} 
        onExploreServices={() => {
          const target = document.getElementById("procedimentos") || document.getElementById("megahair");
          target?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* ===================== ESPECIALIDADE MESTRE: MEGA HAIR DE NANOCÁPSULAS ===================== */}
      <MegaHairShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL 3D EMPILHADO: MEGA HAIR ===================== */}
      <CarouselStacked
        title="Mega Hair de Nanocápsulas"
        subtitle="HAUTE COIFFURE · DAYANE LIMA"
        slides={megahairSlides}
      />

      {/* ===================== COLORIMETRIA & BALAYAGE: MECHAS & LOIROS NOBRES ===================== */}
      <MechasShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL 3D EMPILHADO: RUIVOS, LOIROS NOBRES, CABELOS PRETOS & BALAYAGE ===================== */}
      <CarouselStacked
        title="Ruivos Luminosos, Loiros Nobres, Cabelos Pretos & Balayage de Luxo"
        subtitle="COLORIMETRIA AVANÇADA · DAYANE LIMA"
        slides={mechasSlides}
      />

      {/* ===================== HARMONIZAÇÃO DO OLHAR: CÍLIOS & SOBRANCELHAS ===================== */}
      <OlharShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL 3D EMPILHADO: CÍLIOS & SOBRANCELHAS ===================== */}
      <CarouselStacked
        title="Cílios & Sobrancelhas"
        subtitle="VISAGISMO DO OLHAR · RAYSSA & HILLERY"
        slides={olharSlides}
      />

      {/* ===================== ARQUITETURA UNGUEAL: UNHAS EM FIBRA & GEL ===================== */}
      <UnhasShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL 3D EMPILHADO: ARQUITETURA UNGUEAL ===================== */}
      <CarouselStacked
        title="Alongamento em Gel & Fibra"
        subtitle="ENGENHARIA UNGUEAL · EMILY LIMA NAILS"
        slides={unhasSlides}
      />

      {/* ===================== BRONZEAMENTO EM CABINE TECNOLÓGICA ===================== */}
      <BronzeShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL 3D EMPILHADO: BRONZEAMENTO EM CABINE ===================== */}
      <CarouselStacked
        title="Cabine Tecnológica & Marquinha"
        subtitle="SOL & BRONZE · CABINE TECNOLÓGICA"
        slides={bronzeSlides}
      />

      {/* ===================== ESTÉTICA CORPORAL & DEPILAÇÃO A LASER SUBZERO ===================== */}
      <LaserShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL 3D EMPILHADO: DEPILAÇÃO A LASER SUBZERO ===================== */}
      <CarouselStacked
        title="Depilação a Laser Subzero"
        subtitle="TECNOLOGIA CLÍNICA · HAKON SUBZERO"
        slides={laserSlides}
      />

      {/* ===================== RITUAIS DE BEM-ESTAR, CABINE PRIVATIVA & AUTOCUIDADO ===================== */}
      <WellnessShowcase onSelectService={handleSelectService} />

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
        slides={espacoSlides}
      />

      {/* ===================== AUTORIDADE INSTITUCIONAL: 20+ ANOS DE EXPERIÊNCIA ===================== */}
      <AuthoritySection onOpenTriage={handleOpenGeneralTriage} />

      {/* ===================== CASOS CLÍNICOS & RELATOS REAIS ===================== */}
      <ReviewsSection onOpenTriage={handleOpenGeneralTriage} />

      {/* ===================== LOCALIZAÇÃO NO MONTE CARMELO & FOOTER INSTITUCIONAL ===================== */}
      <LocationAndFooter onOpenTriage={handleOpenGeneralTriage} />

      {/* ===================== BARRA DE CONVERSÃO FLUTUANTE PERSISTENTE (DESKTOP & MOBILE) ===================== */}
      <StickyConversionBar 
        onOpenTriage={handleOpenGeneralTriage} 
        isTriageOpen={isTriageOpen} 
      />

      {/* ===================== GAVETA DE TRIAGEM PRÉVIA PARA WHATSAPP ===================== */}
      <WhatsAppTriageDrawer
        isOpen={isTriageOpen}
        initialServiceId={initialService}
        onClose={() => setIsTriageOpen(false)}
        whatsappPhone="5538999999999" // Número comercial da recepção Dayane Lima — Ateliê Boutique
      />

    </div>
  );
}
