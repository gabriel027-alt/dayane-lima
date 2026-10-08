"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronDown } from "lucide-react";

interface StoryFrame {
  id: number;
  image: string;
  tag: string;
  title: string;
  subtitle: string;
}

const FRAME_DURATION_MS = 2200; // 2.2 segundos por frame

const FRAMES: StoryFrame[] = [
  {
    id: 1,
    image: "/midias/frame1-fernanda.jpg",
    tag: "ARQUITETURA FACIAL & VISAGISMO",
    title: "Fernanda Garroni",
    subtitle: "Cabeleireira & Visagista em Porto Alegre • Av. Nonoai, 151",
  },
  {
    id: 2,
    image: "/midias/frame2-fernanda.jpg",
    tag: "DIAGNÓSTICO & SEGURANÇA",
    title: "Consultoria Personalizada",
    subtitle: "Análise minuciosa de traços faciais e teste de mecha prévio",
  },
  {
    id: 3,
    image: "/midias/frame3-fernanda.jpg",
    tag: "COR CARRO-CHEFE",
    title: "Tríade de Morenas Iluminadas",
    subtitle: "Nuances Moça Mousse, avelã e caramelo com transição suave e zero marcas",
  },
  {
    id: 4,
    image: "/midias/frame4-fernanda.jpg",
    tag: "CURVATURAS EM MOVIMENTO",
    title: "Cortes & Cachos Definidos",
    subtitle: "Preservação da elasticidade da mola capilar e volume tridimensional",
  },
  {
    id: 5,
    image: "/midias/frame5-fernanda.jpg",
    tag: "RITUAL DE RECUPERAÇÃO",
    title: "Saúde da Fibra & Lavatório Spa",
    subtitle: "Tratamentos profundos e atmosfera relaxante na Sala 205",
  },
];

export function CinematicIntro() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [progress, setProgress] = useState(0); // 0 a 100

  const touchStartY = useRef<number | null>(null);
  const isClosingRef = useRef(false);

  // Gatilho de saída com fade-out suave de 700ms e desbloqueio do scroll
  const handleExit = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    try {
      sessionStorage.setItem("fg_intro_viewed", "true");
    } catch {}

    // 1. Inicia fade-out visual
    setIsExiting(true);

    // 2. Destrava rolagem imediatamente
    document.body.style.overflow = "auto";

    // 3. Desmonta do DOM após a conclusão da animação (700ms)
    setTimeout(() => {
      setDismissed(true);
    }, 700);
  }, []);

  // Avança para o próximo frame ou encerra
  const handleNext = useCallback(() => {
    if (currentFrame < FRAMES.length - 1) {
      setCurrentFrame((prev) => prev + 1);
      setProgress(0);
    } else {
      handleExit();
    }
  }, [currentFrame, handleExit]);

  // Retorna para o frame anterior
  const handlePrev = useCallback(() => {
    if (currentFrame > 0) {
      setCurrentFrame((prev) => prev - 1);
      setProgress(0);
    } else {
      setProgress(0);
    }
  }, [currentFrame]);

  // Montagem segura e verificação do sessionStorage contra Hydration Mismatch
  useEffect(() => {
    setMounted(true);

    let alreadyViewed = false;
    try {
      alreadyViewed = sessionStorage.getItem("fg_intro_viewed") === "true";
    } catch {}

    if (alreadyViewed) {
      setDismissed(true);
      return;
    }

    // Trava scroll durante a exibição inicial da intro
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Loop de progresso do frame atual (2.2s)
  useEffect(() => {
    if (!mounted || dismissed || isExiting) return;

    const intervalStepMs = 30;
    const increment = (intervalStepMs / FRAME_DURATION_MS) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, intervalStepMs);

    return () => clearInterval(timer);
  }, [mounted, dismissed, isExiting, currentFrame, handleNext]);

  // Detecção de Scroll da Roda do Mouse (Wheel) para pular e rolar para o site
  useEffect(() => {
    if (!mounted || dismissed || isExiting) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 15) {
        handleExit();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [mounted, dismissed, isExiting, handleExit]);

  // Detecção de Gesto de Toque (Swipe up para explorar o espaço)
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current !== null && e.changedTouches.length > 0) {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      // Arrastou mais de 40px para cima: sai da intro
      if (deltaY > 40) {
        handleExit();
      }
    }
    touchStartY.current = null;
  };

  // Clique na tela: 30% esquerda volta, 70% direita avança
  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width * 0.3) {
      handlePrev();
    } else {
      handleNext();
    }
  };

  // Se não montado ou dispensado, não renderiza nada
  if (!mounted || dismissed) return null;

  const activeData = FRAMES[currentFrame];

  return (
    <aside
      aria-label="Apresentação cinemática Fernanda Garroni"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={`fixed inset-0 z-[9999] bg-[#121110] select-none flex flex-col justify-between overflow-hidden transition-opacity duration-700 ease-out ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
    >
      {/* ===================== CAMADA DE IMAGEM COM TRANSIÇÃO & ZOOM CONTÍNUO ===================== */}
      {FRAMES.map((f, idx) => {
        const isCurrent = idx === currentFrame;
        return (
          <div
            key={f.id}
            aria-hidden={!isCurrent}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              isCurrent ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
            }`}
          >
            <img
              src={f.image}
              alt={f.title}
              className={`w-full h-full object-cover object-center ${
                isCurrent ? "scale-105 transition-transform duration-[2400ms] ease-out" : "scale-100"
              }`}
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        );
      })}

      {/* Máscara inferior de contraste profundo (55% inferiores da tela) */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/95 via-black/55 to-transparent z-20 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Máscara superior suave para leitura das barras e do botão pular */}
      <div 
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 via-black/25 to-transparent z-20 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* ===================== TOPO: BARRAS DE STORIES & BOTÃO PULAR ===================== */}
      <div className="relative z-30 pt-4 sm:pt-6 px-4 sm:px-6 w-full max-w-5xl mx-auto flex flex-col gap-3">
        
        {/* 5 Barras de Progresso Horizontais */}
        <div className="flex items-center gap-1.5 w-full">
          {FRAMES.map((f, idx) => {
            let widthPercent = 0;
            if (idx < currentFrame) {
              widthPercent = 100;
            } else if (idx === currentFrame) {
              widthPercent = progress;
            } else {
              widthPercent = 0;
            }

            return (
              <div
                key={f.id}
                className="h-1 bg-white/25 rounded-full overflow-hidden flex-1 backdrop-blur-xs"
              >
                <div
                  className="h-full bg-[#C5A880] transition-[width] duration-75 ease-linear"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* Linha com Monograma FG e Botão Pular */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 text-white/90">
            <span className="font-serif italic font-bold text-lg sm:text-xl text-[#E5C392]">
              FG
            </span>
            <span className="text-[11px] font-sans font-medium tracking-[0.18em] uppercase text-white/70 hidden sm:inline">
              Porto Alegre • RS
            </span>
          </div>

          <button
            type="button"
            onClick={handleExit}
            className="bg-black/40 backdrop-blur-md border border-white/10 text-white/90 text-xs px-3.5 py-1.5 rounded-full hover:bg-black/70 hover:text-white transition cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-md"
            aria-label="Pular apresentação inicial"
          >
            <span>Pular Intro</span>
            <X className="w-3.5 h-3.5 text-white/70" />
          </button>
        </div>

      </div>

      {/* ===================== ÁREA INTERATIVA DE TOQUE (TAP TO ADVANCE/REWIND) ===================== */}
      <div
        onClick={handleScreenClick}
        className="absolute inset-0 z-25 cursor-pointer"
        aria-label="Toque para navegar pelos stories"
      >
        {/* Lado esquerdo 30%: anterior | Lado direito 70%: próximo */}
      </div>

      {/* ===================== BASE: BLOCO DE CONTEÚDO EDITORIAL & SCROLL INDICATOR ===================== */}
      <div className="relative z-30 px-6 sm:px-10 pb-6 sm:pb-8 w-full max-w-4xl mx-auto flex flex-col items-center text-center pointer-events-none">
        
        {/* Tag Superior Dourada */}
        <span className="text-[10px] sm:text-xs text-[#E5C392] tracking-[0.25em] font-semibold uppercase mb-1.5 drop-shadow-sm">
          {activeData.tag}
        </span>

        {/* Título Editorial em Playfair Display */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-tight mb-2 drop-shadow-md">
          {activeData.title}
        </h2>

        {/* Subtítulo Refinado */}
        <p className="text-white/80 text-xs sm:text-sm font-light max-w-lg leading-relaxed mb-6 drop-shadow-sm">
          {activeData.subtitle}
        </p>

        {/* Indicador de Scroll Animado (Igual ao da Dayane) */}
        <button
          type="button"
          onClick={handleExit}
          className="pointer-events-auto mt-2 flex flex-col items-center gap-1.5 group cursor-pointer transition-transform hover:scale-105"
          aria-label="Rolar para explorar o site"
        >
          {/* Ícone de Mouse Minimalista com Rodinha Animada */}
          <div className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1">
            <span className="w-1 h-2 rounded-full bg-[#E5C392] animate-bounce" />
          </div>

          <span className="text-[10px] tracking-[0.25em] text-white/70 uppercase font-medium flex items-center gap-1 group-hover:text-white transition-colors">
            ROLE PARA EXPLORAR O ESPAÇO
            <ChevronDown className="w-3 h-3 text-[#E5C392]" />
          </span>
        </button>

      </div>
    </aside>
  );
}

export default CinematicIntro;
