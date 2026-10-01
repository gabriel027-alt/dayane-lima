'use client';
import React from 'react';

export interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  label: string;
}

interface InfiniteMarqueeGalleryProps {
  title: string;
  subtitle?: string;
  items: GalleryItem[];
}

export default function InfiniteMarqueeGallery({ title, subtitle, items }: InfiniteMarqueeGalleryProps) {
  if (!items || items.length === 0) return null;

  // Garante densidade mínima para que cada metade da trilha cubra telas ultrawide
  const repeatCount = items.length < 4 ? Math.ceil(6 / items.length) : 1;
  const baseList = Array(repeatCount).fill(items).flat();

  return (
    <section className="py-16 bg-[#F7EAE5] border-b border-[#E8D0C8] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-8">
        {subtitle && (
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#6E501E] block mb-1">
            {subtitle}
          </span>
        )}
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">{title}</h3>
      </div>

      <div className="relative w-full overflow-hidden select-none">
        {/* Trilha contínua com duplicação simétrica em max-content e keyframe de 0% a -50% */}
        <div className="flex animate-marquee py-4 w-max">
          {/* Cópia 1 da trilha */}
          <div className="flex gap-6 shrink-0 pr-6">
            {baseList.map((item, index) => (
              <div 
                key={`c1-${item.src}-${index}`} 
                className="w-[280px] sm:w-[340px] shrink-0 bg-white rounded-3xl overflow-hidden border border-[#E8D0C8] shadow-sm flex flex-col"
              >
                <div className="relative aspect-[4/5] w-full bg-[#1C1917] overflow-hidden">
                  {item.type === 'video' ? (
                    <>
                      {/* Fallback elegante com gradiente escuro e indicador sutil de loading */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-[#2D2825] via-[#1C1917] to-[#141211] flex items-center justify-center pointer-events-none"
                        aria-hidden="true"
                      >
                        <div className="w-10 h-10 rounded-full border border-[#C5A880]/30 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#C5A880]/60 animate-ping" />
                        </div>
                      </div>
                      <video 
                        src={item.src} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        preload="auto"
                        className="relative z-10 w-full h-full object-cover pointer-events-none" 
                      />
                    </>
                  ) : (
                    <img 
                      src={item.src} 
                      alt={item.alt} 
                      className="w-full h-full object-cover pointer-events-none" 
                      loading="lazy" 
                    />
                  )}
                </div>
                <div className="p-4 bg-white whitespace-normal">
                  <p className="font-serif font-bold text-base text-[#1C1917]">{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cópia 2 da trilha: inicia exatamente onde a primeira termina, gerando movimento infinito */}
          <div className="flex gap-6 shrink-0 pr-6" aria-hidden="true">
            {baseList.map((item, index) => (
              <div 
                key={`c2-${item.src}-${index}`} 
                className="w-[280px] sm:w-[340px] shrink-0 bg-white rounded-3xl overflow-hidden border border-[#E8D0C8] shadow-sm flex flex-col"
              >
                <div className="relative aspect-[4/5] w-full bg-[#1C1917] overflow-hidden">
                  {item.type === 'video' ? (
                    <>
                      {/* Fallback elegante com gradiente escuro e indicador sutil de loading */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-[#2D2825] via-[#1C1917] to-[#141211] flex items-center justify-center pointer-events-none"
                        aria-hidden="true"
                      >
                        <div className="w-10 h-10 rounded-full border border-[#C5A880]/30 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#C5A880]/60 animate-ping" />
                        </div>
                      </div>
                      <video 
                        src={item.src} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        preload="auto"
                        className="relative z-10 w-full h-full object-cover pointer-events-none" 
                      />
                    </>
                  ) : (
                    <img 
                      src={item.src} 
                      alt={item.alt} 
                      className="w-full h-full object-cover pointer-events-none" 
                      loading="lazy" 
                    />
                  )}
                </div>
                <div className="p-4 bg-white whitespace-normal">
                  <p className="font-serif font-bold text-base text-[#1C1917]">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

