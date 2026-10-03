"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

export interface HeroScrollScrubProps {
  onExplore?: () => void;
}

const TOTAL_FRAMES = 120;
const FRAME_PATHS = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/midias/frames/hair_frame_${i}.webp`
);

export function HeroScrollScrub({ onExplore }: HeroScrollScrubProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  // Estado de pré-carregamento dos 120 frames
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Mapeia o scroll da página ao longo do container de 350vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Mapeia 0% -> 100% de scroll diretamente para os índices de frame 0 -> 119
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Sincronização do texto: fade out e deslize sutil para baixo (0 a 35% do scroll)
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.35], [0, 50]);

  // Névoa inferior de transição perfeita para as próximas seções (80% a 100%)
  const bottomFogOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  // Função otimizada para desenhar o frame no Canvas preservando o comportamento object-cover
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const nw = img.naturalWidth || 1920;
    const nh = img.naturalHeight || 1080;

    const canvasRatio = cw / ch;
    const imgRatio = nw / nh;

    let renderWidth = cw;
    let renderHeight = ch;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderHeight = cw / imgRatio;
      offsetY = (ch - renderHeight) / 2;
    } else {
      renderWidth = ch * imgRatio;
      offsetX = (cw - renderWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  }, []);

  // Ajusta a resolução nativa do Canvas com suporte estrito a Retina / High-DPI
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    // Redesenha o frame atual após redimensionamento
    const activeIndex = currentFrameRef.current >= 0 ? currentFrameRef.current : 0;
    const currentImg = imagesRef.current[activeIndex];
    if (currentImg && currentImg.complete) {
      drawFrame(currentImg);
    }
  }, [drawFrame]);

  // Preloading Engine: Carrega os 120 frames para a memória antes de liberar a visualização
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    FRAME_PATHS.forEach((path, i) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        loadedCount += 1;
        const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadProgress(percent);

        // Assim que o frame 0 carrega, renderiza imediatamente para evitar flash em branco
        if (i === 0 && currentFrameRef.current === -1) {
          currentFrameRef.current = 0;
          drawFrame(img);
        }

        if (loadedCount === TOTAL_FRAMES) {
          setIsReady(true);
        }
      };
      img.onerror = () => {
        // Fallback em caso de erro individual para não travar a barra
        loadedCount += 1;
        if (loadedCount === TOTAL_FRAMES) setIsReady(true);
      };
      images[i] = img;
    });

    imagesRef.current = images;

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [drawFrame, resizeCanvas]);

  // Listener de Scroll com ciclo de animação via RequestAnimationFrame a 60fps
  useEffect(() => {
    const render = (value: number) => {
      const targetIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(value)));
      if (targetIndex === currentFrameRef.current) return;
      currentFrameRef.current = targetIndex;

      const img = imagesRef.current[targetIndex];
      if (img && img.complete) {
        drawFrame(img);
      }
    };

    const unsubscribe = frameIndex.on("change", (latest) => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => render(latest));
    });

    return () => {
      unsubscribe();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [frameIndex, drawFrame]);

  const handleScrollDown = () => {
    if (onExplore) {
      onExplore();
      return;
    }
    if (containerRef.current) {
      const target = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[350vh] w-full bg-[#FBFBFC]"
      aria-label="Apresentação Interativa em Canvas • Scrubbing de Vídeo por Scroll"
    >
      {/* Viewport Fixa (Sticky) Conectada ao Scroll */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden bg-[#FBFBFC] flex items-center justify-center select-none">
        
        {/* ===================== CANVAS HARDWARE-ACCELERATED ===================== */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-[0.96] contrast-[1.02] transform-gpu"
        />

        {/* Véu Translúcido Editorial para Máxima Legibilidade Tipográfica */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#FBFBFC]/35 via-transparent to-[#FBFBFC]/50 pointer-events-none" 
          aria-hidden="true" 
        />

        {/* ===================== CONTEÚDO EDITORIAL CENTRALIZADO (SINCRONIZADO) ===================== */}
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
          }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 pointer-events-none text-center"
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            
            {/* Micro-tag Editorial */}
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-stone-200/60 shadow-xs">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-stone-600">
                BIOTECNOLOGIA & ALTA COSTURA CAPILAR
              </span>
            </div>

            {/* Headline Principal */}
            <h1 className="font-light tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1C1C1E] text-center leading-[1.12] [text-wrap:balance] max-w-3xl drop-shadow-xs">
              A arquitetura da densidade imperceptível.
            </h1>

            {/* Subtítulo da Marca */}
            <p className="font-light text-[11px] sm:text-[13px] tracking-[0.2em] uppercase text-stone-500 mt-5 sm:mt-6 drop-shadow-xs">
              RAYSSA LASH & HAIR — ESTÚDIO BOUTIQUE
            </p>

          </div>
        </motion.div>

        {/* ===================== INDICADOR INFERIOR DE SCRUBBING ===================== */}
        <motion.button
          type="button"
          onClick={handleScrollDown}
          style={{ opacity: textOpacity }}
          className="absolute bottom-6 sm:bottom-8 z-20 flex flex-col items-center gap-1.5 text-[#1C1C1E]/60 hover:text-[#1C1C1E] transition-colors cursor-pointer group pointer-events-auto"
          aria-label="Rolar para controlar a linha do tempo do vídeo"
        >
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone-500 group-hover:text-stone-700 transition-colors">
            Role para folhear frames
          </span>
          <ChevronDown className="w-4 h-4 text-stone-500 animate-bounce group-hover:text-stone-800 transition-colors" />
        </motion.button>

        {/* ===================== NÉVOA DE TRANSIÇÃO INFERIOR ===================== */}
        <motion.div
          style={{ opacity: bottomFogOpacity }}
          className="pointer-events-none absolute bottom-0 inset-x-0 h-40 sm:h-56 md:h-72 bg-gradient-to-t from-[#FBFBFC] via-[#FBFBFC]/40 to-transparent z-20"
          aria-hidden="true"
        />

        {/* ===================== PRELOADER EDITORIAL DE LUXO (0% a 100%) ===================== */}
        <AnimatePresence>
          {!isReady && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 z-50 bg-[#FBFBFC] flex flex-col items-center justify-center p-6 text-center select-none"
            >
              <div className="flex flex-col items-center max-w-xs w-full">
                {/* Monograma de Marca */}
                <span className="font-serif italic text-2xl text-[#1C1C1E] mb-4 tracking-wider">
                  Rayssa Lash & Hair
                </span>

                {/* Barra de Progresso Minimalista */}
                <div className="w-48 h-[2px] bg-stone-200 overflow-hidden rounded-full mb-3">
                  <div
                    className="h-full bg-[#C5A880] transition-all duration-150 ease-out"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>

                {/* Contador Numérico */}
                <div className="flex items-center justify-between w-48 text-[11px] font-mono tracking-widest text-stone-400">
                  <span>CARREGANDO</span>
                  <span className="text-[#1C1C1E] font-medium">{loadProgress.toString().padStart(3, "0")}%</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default HeroScrollScrub;
