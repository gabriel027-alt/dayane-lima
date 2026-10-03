'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  label: string;
}

export interface InteractivePortfolioGridProps {
  title: string;
  subtitle?: string;
  items: GalleryItem[];
}

export default function InteractivePortfolioGrid({ title, subtitle, items }: InteractivePortfolioGridProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Loop automático de destaque a cada 5 segundos
  useEffect(() => {
    if (!items || items.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items?.length]);

  if (!items || items.length === 0) return null;

  return (
    <section className="py-20 bg-[#F7EAE5] border-b border-[#E8D0C8] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            {subtitle && <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#6E501E] block mb-1">{subtitle}</span>}
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917]">{title}</h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-sans text-[#6E501E] bg-white px-4 py-2 rounded-full border border-[#E8D0C8] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#C5A880]"/>
            <span>Clique em qualquer card para focar • Áudio interativo disponível</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={index}
                onClick={() => setActiveIndex(index)}
                className="relative rounded-3xl overflow-hidden border border-[#C5A880]/50 shadow-2xl transition-all duration-500 cursor-pointer bg-[#1C1917] flex flex-col group"
              >
                {/* Container de Mídia */}
                <div className="relative aspect-[4/5] w-full bg-[#1C1917] overflow-hidden flex items-center justify-center">
                  {item.type === 'video' ? (
                    <>
                      <video 
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                        src={item.src} 
                        autoPlay 
                        loop 
                        muted={isMuted} 
                        playsInline 
                        preload="auto" 
                        className="w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
                      />
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMuted(!isMuted);
                        }}
                        className="absolute bottom-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#C5A880] text-white backdrop-blur-md border border-white/20 transition-all shadow-md"
                        aria-label="Controlar som do vídeo"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4"/> : <Volume2 className="w-4 h-4 text-[#1C1917]"/>}
                      </button>
                    </>
                  ) : (
                    <img 
                      src={item.src} 
                      alt={item.alt} 
                      className="w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105" 
                      loading="lazy" 
                    />
                  )}

                  {isActive && (
                    <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1917]/80 backdrop-blur-md border border-[#C5A880]/40 text-[10px] font-sans font-semibold uppercase tracking-wider text-white shadow-md">
                      <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse"></span>
                      Em Destaque VIP
                    </div>
                  )}
                </div>

                {/* Legenda */}
                <div className="p-5 bg-[#1C1917] border-t border-[#C5A880]/20 flex-1 flex flex-col justify-between">
                  <p className="font-serif font-bold text-base text-white leading-snug">{item.label}</p>
                </div>

                {/* Borda interna acetinada */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
