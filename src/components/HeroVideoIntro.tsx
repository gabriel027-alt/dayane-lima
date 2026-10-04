"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface HeroVideoIntroProps {
  onExplore?: () => void;
}

export function HeroVideoIntro({ onExplore }: HeroVideoIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mapeia o progresso do scroll no contêiner de 200vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. Escala suave do vídeo: de 1.0 (tela cheia) a 0.92 (efeito moldura de luxo)
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // 2. Transição do raio de borda: de 0px para 24px à medida que encolhe
  const videoRadius = useTransform(scrollYProgress, [0, 1], ["0px", "24px"]);

  // 3. Moldura de contorno e sombra de joalheria que se revelam no encolhimento
  const frameBorderOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  // 4. Fade & Lift do Conteúdo Editorial: opacidade de 1 a 0 e elevação de 0 a -50px até 50% do scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], [0, -50]);

  // 5. Névoa gradiente inferior de transição invisível entre 80% e 100% do scroll
  const bottomFogOpacity = useTransform(scrollYProgress, [0.75, 1], [0, 1]);

  // Rolagem suave até o término da intro ao clicar na indicação
  const handleScrollDown = () => {
    if (onExplore) {
      onExplore();
      return;
    }
    if (containerRef.current) {
      const topOffset = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[200vh] w-full bg-[#FBFBFC]"
      aria-label="Apresentação Imersiva • Dayane Lima — Ateliê Boutique"
    >
      {/* Viewport Fixa (Sticky) de Alta Fidelidade */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden bg-[#FBFBFC] flex items-center justify-center select-none">
        
        {/* ===================== CANVAS DE VÍDEO COM ANIMAÇÃO ESPACIAL ===================== */}
        <motion.div
          style={{
            scale: videoScale,
            borderRadius: videoRadius,
          }}
          className="relative w-full h-full overflow-hidden shadow-2xl will-change-transform"
        >
          {/* Elemento de Vídeo Comercial 1080p */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-[0.94] contrast-[1.02] transform-gpu"
          >
            <source src="/midias/hair-commercial-hero.mp4" type="video/mp4" />
            <source src="/midias/Hair_commercial_video_montage_st%E2%80%A6_20261003133433.mp4" type="video/mp4" />
            <source src="/midias/Hair_commercial_video_montage_st…_20261003133433.mp4" type="video/mp4" />
          </video>

          {/* Véu Translúcido Editorial para Realce de Contraste Tipográfico */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[#FBFBFC]/40 via-transparent to-[#FBFBFC]/50 pointer-events-none" 
            aria-hidden="true" 
          />

          {/* Borda de Luxo Acetinada Ativada Durante o Scroll */}
          <motion.div
            style={{ 
              opacity: frameBorderOpacity,
              borderRadius: videoRadius,
            }}
            className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.08)]"
            aria-hidden="true"
          />
        </motion.div>

        {/* ===================== CONTEÚDO EDITORIAL CENTRALIZADO (FADE & LIFT) ===================== */}
        <motion.div
          style={{
            opacity: contentOpacity,
            y: contentY,
          }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-6 pointer-events-none text-center"
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            
            {/* Elemento de Mídia da Logo em Container Circular Elegante */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-[#C5A880]/50 shadow-md bg-[#FAF8F5] mb-5 flex items-center justify-center shrink-0">
              <video
                src="/midias/minivideo-logo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[#C5A880]/20 pointer-events-none" />
            </div>

            {/* Micro-tag Editorial */}
            <span className="font-mono text-xs sm:text-sm tracking-[0.4em] uppercase text-[#6E501E] font-bold mb-3 sm:mb-4 drop-shadow-xs">
              ALTA COSTURA CAPILAR
            </span>

            {/* Headline Principal */}
            <h1 className="font-serif font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1C1917] text-center leading-[1.12] [text-wrap:balance] max-w-3xl drop-shadow-xs">
              A arquitetura da densidade imperceptível.
            </h1>

            {/* Subtítulo da Marca Mestre */}
            <p className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase text-[#44403C] font-semibold mt-5 sm:mt-6 drop-shadow-xs">
              Dayane Lima • Ateliê Boutique
            </p>

          </div>
        </motion.div>

        {/* ===================== INDICADOR INFERIOR DE ROLAGEM ===================== */}
        <motion.button
          type="button"
          onClick={handleScrollDown}
          style={{ opacity: contentOpacity }}
          className="absolute bottom-6 sm:bottom-8 z-20 flex flex-col items-center gap-1.5 text-[#1C1917] hover:text-[#8F6E32] transition-colors cursor-pointer group pointer-events-auto"
          aria-label="Rolar para explorar o ateliê"
        >
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#44403C] group-hover:text-[#1C1917] transition-colors font-semibold">
            Role para explorar
          </span>
          <ChevronDown className="w-4 h-4 text-[#6E501E] animate-bounce group-hover:text-[#1C1917] transition-colors" />
        </motion.button>

        {/* ===================== NÉVOA DE TRANSIÇÃO INVISÍVEL (BOTTOM FOG) ===================== */}
        <motion.div
          style={{ opacity: bottomFogOpacity }}
          className="pointer-events-none absolute bottom-0 inset-x-0 h-40 sm:h-56 md:h-72 bg-gradient-to-t from-[#FBFBFC] via-[#FBFBFC]/40 to-transparent z-20"
          aria-hidden="true"
        />

      </div>
    </div>
  );
}

export default HeroVideoIntro;
