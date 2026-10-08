"use client";

import React, { useRef, useEffect, useState } from "react";

interface HeroScrollCanvasProps {
  onOpenTriage?: () => void;
  onExplore?: () => void;
}

export function HeroScrollCanvas({ onOpenTriage, onExplore }: HeroScrollCanvasProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [textOpacity, setTextOpacity] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Garante que o vídeo esteja estritamente pausado para controle por scroll
    video.pause();

    let targetTime = 0;
    let isTicking = false;

    const updateScroll = () => {
      const container = document.getElementById("hero-scroll-container");
      if (!container || !video.duration || isNaN(video.duration)) return;

      const rect = container.getBoundingClientRect();
      const maxScroll = container.offsetHeight - window.innerHeight;
      const currentScroll = Math.max(0, -rect.top);
      const progress = maxScroll > 0 ? Math.min(Math.max(currentScroll / maxScroll, 0), 1) : 0;

      targetTime = progress * video.duration;

      // Suavização do vídeo com interpolação contínua
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(() => {
          if (video && Math.abs(video.currentTime - targetTime) > 0.03) {
            video.currentTime = targetTime;
          }
          // Fade-out do texto no final do scroll
          if (progress > 0.65) {
            setTextOpacity(Math.max(0, 1 - (progress - 0.65) * 3.5));
          } else {
            setTextOpacity(1);
          }
          isTicking = false;
        });
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    video.addEventListener("loadedmetadata", updateScroll);
    video.addEventListener("canplay", updateScroll);

    // Se os metadados já estiverem prontos no mount
    if (video.readyState >= 1) {
      updateScroll();
    }

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      video.removeEventListener("loadedmetadata", updateScroll);
      video.removeEventListener("canplay", updateScroll);
    };
  }, []);

  return (
    <div id="hero-scroll-container" className="relative h-[350vh] w-full bg-[#141210]">
      <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden flex items-center justify-center select-none">
        {/* Tag de vídeo sem autoplay, sem loop e com preload total */}
        <video
          ref={videoRef}
          src="/midias/intro-fernanda.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none filter brightness-[0.90] contrast-[1.04]"
        />

        {/* Overlays de contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/65 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.50)_0%,transparent_75%)] pointer-events-none z-10" />

        {/* Overlay Editorial e Ações (z-20) com Fade-out no scroll */}
        <div
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 max-w-5xl mx-auto transition-opacity duration-150"
          style={{ opacity: textOpacity }}
        >
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg">
            <span className="text-[#C99065]">✨</span>
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-white/90">
              ARQUITETURA FACIAL & ILUMINAÇÃO AUTORAL
            </span>
          </div>

          <h1 className="font-light tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white/95 text-center leading-[1.12] max-w-4xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.70)]">
            Sua melhor versão com{" "}
            <span className="font-serif italic font-normal text-[#E0CEB5] drop-shadow-[0_2px_12px_rgba(201,144,101,0.50)]">
              Morenas Iluminadas
            </span>{" "}
            e corte visagista sob medida.
          </h1>

          <p className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-white/80 mt-5 sm:mt-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.70)]">
            FERNANDA GARRONI — ATELIÊ BOUTIQUE • PORTO ALEGRE (AV. NONOAI, 151)
          </p>

          <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5 pointer-events-auto">
            <a
              href="#triagem-inteligente"
              onClick={(e) => {
                if (onOpenTriage) {
                  e.preventDefault();
                  onOpenTriage();
                }
              }}
              className="min-h-[48px] px-8 py-3.5 bg-[#C99065] hover:bg-[#b57f56] text-[#141210] font-sans font-bold text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-2xl transition-all cursor-pointer inline-flex items-center gap-2 active:scale-95"
            >
              <span>Agendar Avaliação VIP</span>
              <span>→</span>
            </a>
            <a
              href="#procedimentos"
              onClick={(e) => {
                if (onExplore) {
                  e.preventDefault();
                  onExplore();
                }
              }}
              className="min-h-[48px] px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 font-sans font-semibold text-xs tracking-wider uppercase rounded-full transition-all cursor-pointer active:scale-95"
            >
              <span>Explorar Procedimentos</span>
            </a>
          </div>

          {/* Indicador de Swipe */}
          <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-2.5 pointer-events-auto select-none">
            <div className="relative w-8 h-12 flex items-center justify-center">
              <div className="absolute w-[1.5px] h-9 rounded-full bg-gradient-to-t from-transparent via-[#C99065]/50 to-transparent pointer-events-none" />
              <div className="text-[#E0CEB5] animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 rotate-[-6deg]"
                >
                  <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
                  <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
                  <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
                  <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                </svg>
              </div>
            </div>
            <span className="font-sans font-bold text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#E0CEB5]">
              DESLIZE PARA BAIXO PARA EXPLORAR
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#FAF3F0] to-transparent z-20" />
      </div>
    </div>
  );
}

export default HeroScrollCanvas;
