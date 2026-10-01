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
import InfiniteMarqueeGallery from "@/components/InfiniteMarqueeGallery";
import WhatsAppTriageDrawer, { ServiceCategory } from "@/components/WhatsAppTriageDrawer";
import { MessageCircle, MapPin } from "lucide-react";
import {
  MEGAHAIR_GALLERY_ITEMS,
  MECHAS_GALLERY_ITEMS,
  OLHAR_GALLERY_ITEMS,
  UNHAS_GALLERY_ITEMS,
  BRONZE_GALLERY_ITEMS,
  LASER_GALLERY_ITEMS,
  ESPACO_GALLERY_ITEMS,
} from "@/data/mediaCatalog";

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

      {/* ===================== 2. HERO SPLIT 50/50 COM VÍDEO OFICIAL INTACTO E CTA IMEDIATO ===================== */}
      <Hero 
        onOpenTriage={handleOpenGeneralTriage} 
        onExploreServices={() => {
          document.getElementById("megahair")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* ===================== ESPECIALIDADE MESTRE: MEGA HAIR DE NANOCÁPSULAS ===================== */}
      <MegaHairShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL: MEGA HAIR ===================== */}
      <InfiniteMarqueeGallery
        title="Mega Hair de Nanocápsulas"
        subtitle="HAUTE COIFFURE · DAYANE LIMA"
        items={MEGAHAIR_GALLERY_ITEMS}
      />

      {/* ===================== COLORIMETRIA & BALAYAGE: MECHAS & LOIROS NOBRES ===================== */}
      <MechasShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL: MECHAS & COLORIMETRIA ===================== */}
      <InfiniteMarqueeGallery
        title="Mechas & Balayage de Luxo"
        subtitle="COLORIMETRIA AVANÇADA · DAYANE LIMA"
        items={MECHAS_GALLERY_ITEMS}
      />

      {/* ===================== HARMONIZAÇÃO DO OLHAR: CÍLIOS & SOBRANCELHAS ===================== */}
      <OlharShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL: CÍLIOS & SOBRANCELHAS ===================== */}
      <InfiniteMarqueeGallery
        title="Cílios & Sobrancelhas"
        subtitle="VISAGISMO DO OLHAR · RAYSSA & HILLERY"
        items={OLHAR_GALLERY_ITEMS}
      />

      {/* ===================== ARQUITETURA UNGUEAL: UNHAS EM FIBRA & GEL ===================== */}
      <UnhasShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL: ARQUITETURA UNGUEAL ===================== */}
      <InfiniteMarqueeGallery
        title="Alongamento em Gel & Fibra"
        subtitle="ENGENHARIA UNGUEAL · EMILY LIMA NAILS"
        items={UNHAS_GALLERY_ITEMS}
      />

      {/* ===================== BRONZEAMENTO EM CABINE TECNOLÓGICA ===================== */}
      <BronzeShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL: BRONZEAMENTO EM CABINE ===================== */}
      <InfiniteMarqueeGallery
        title="Cabine Tecnológica & Marquinha"
        subtitle="SOL & BRONZE · CABINE TECNOLÓGICA"
        items={BRONZE_GALLERY_ITEMS}
      />

      {/* ===================== ESTÉTICA CORPORAL & DEPILAÇÃO A LASER SUBZERO ===================== */}
      <LaserShowcase onSelectService={handleSelectService} />

      {/* ===================== CARROSSEL: DEPILAÇÃO A LASER SUBZERO ===================== */}
      <InfiniteMarqueeGallery
        title="Depilação a Laser Subzero"
        subtitle="TECNOLOGIA CLÍNICA · HAKON SUBZERO"
        items={LASER_GALLERY_ITEMS}
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

      {/* ===================== CARROSSEL: O ATELIÊ & FACHADA ===================== */}
      <InfiniteMarqueeGallery
        title="Tour pelo Ateliê Monte Carmelo"
        subtitle="ESTRUTURA FÍSICA · RUA CALCEDÔNIA, 155"
        items={ESPACO_GALLERY_ITEMS}
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
