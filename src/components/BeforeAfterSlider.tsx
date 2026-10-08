"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  title?: string;
  subtitle?: string;
  tag?: string;
  className?: string;
  aspectRatio?: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Cabelo Antes",
  afterAlt = "Cabelo Depois",
  title,
  subtitle,
  tag,
  className = "",
  aspectRatio = "aspect-[4/5]",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeTab, setActiveTab] = useState<"slider" | "before" | "after">("slider");
  const containerRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  // Otimização de arraste com requestAnimationFrame (sem travar a thread de renderização)
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      setSliderPosition(percentage);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Handlers de Touch com respeito ao scroll vertical (touch-action: pan-y)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    setActiveTab("slider");
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDraggingRef.current && e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Handlers de Mouse para Desktop
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    setActiveTab("slider");
    updatePosition(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      updatePosition(e.clientX);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className={`flex flex-col bg-white rounded-2xl border border-[#E8D0C8] overflow-hidden shadow-xs hover:shadow-md transition-shadow ${className}`}>
      
      {/* Header do Card */}
      {(title || tag) && (
        <div className="p-4 sm:p-5 border-b border-[#F0E4DE] flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            {tag && (
              <span className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase text-[#6E501E] bg-[#FAF3F0] px-2.5 py-1 rounded-full border border-[#E8D0C8]">
                {tag}
              </span>
            )}
            {/* Controles de visualização rápida */}
            <div className="flex items-center bg-[#FAF3F0] p-0.5 rounded-lg border border-[#E8D0C8] text-[11px] font-semibold text-[#44403C]">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("before");
                  setSliderPosition(100);
                }}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  activeTab === "before" ? "bg-white text-[#1C1917] shadow-xs" : "hover:text-[#1C1917]"
                }`}
              >
                Antes
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("slider");
                  setSliderPosition(50);
                }}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  activeTab === "slider" ? "bg-white text-[#1C1917] shadow-xs" : "hover:text-[#1C1917]"
                }`}
              >
                Interativo
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("after");
                  setSliderPosition(0);
                }}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  activeTab === "after" ? "bg-white text-[#1C1917] shadow-xs" : "hover:text-[#1C1917]"
                }`}
              >
                Depois
              </button>
            </div>
          </div>
          {title && (
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1917] mt-1 leading-snug">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs text-[#5D5752] font-sans leading-relaxed line-clamp-2">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Container do Slider Interativo com touch-action: pan-y explícito */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={{ touchAction: "pan-y" }}
        className={`relative w-full ${aspectRatio} overflow-hidden cursor-ew-resize select-none bg-neutral-900 touch-pan-y`}
      >
        {/* Imagem do DEPOIS (Fundo base) */}
        <img
          src={afterSrc}
          alt={afterAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Tag Flutuante: Depois */}
        <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-sans font-bold tracking-wider uppercase border border-white/20">
          Depois
        </div>

        {/* Imagem do ANTES (Sobreposição com clip) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeSrc}
            alt={beforeAlt}
            loading="lazy"
            decoding="async"
            className="absolute top-0 left-0 max-w-none h-full object-cover object-center"
            style={{
              width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%",
            }}
          />
          {/* Tag Flutuante: Antes */}
          <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-sans font-bold tracking-wider uppercase border border-white/20">
            Antes
          </div>
        </div>

        {/* Linha Divisória & Handle Arrastável */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Linha vertical dourada */}
          <div className="absolute top-0 bottom-0 -left-[1.5px] w-[3px] bg-gradient-to-b from-[#FAF3F0] via-[#C5A880] to-[#FAF3F0] shadow-[0_0_10px_rgba(197,168,128,0.8)]" />

          {/* Botão circular de arraste no centro */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1C1917] border-2 border-[#C5A880] text-[#E6C99B] flex items-center justify-center shadow-lg pointer-events-auto">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>

        {/* Dica de interação sutil na base */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-black/50 backdrop-blur-xs text-white/90 text-[10px] font-sans font-medium flex items-center gap-1.5 pointer-events-none">
          <Sparkles className="w-3 h-3 text-[#E6C99B]" />
          <span>Arraste para comparar</span>
        </div>
      </div>
    </div>
  );
}

export default BeforeAfterSlider;
