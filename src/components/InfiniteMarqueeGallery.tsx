'use client';
import React from 'react';

interface GalleryItem {
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
  // Triplicamos os itens para garantir que nunca falte conteúdo durante a transição horizontal
  const extendedItems = [...items, ...items, ...items];

  return (
    <section className="py-16 bg-[#F7EAE5] border-b border-[#E8D0C8] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-8">
        {subtitle && <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#6E501E] block mb-1">{subtitle}</span>}
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">{title}</h3>
      </div>

      <div className="relative w-full overflow-hidden flex select-none">
        <div className="flex gap-6 animate-marquee py-4">
          {extendedItems.map((item, index) => (
            <div key={index} className="w-[280px] sm:w-[340px] shrink-0 bg-white rounded-3xl overflow-hidden border border-[#E8D0C8] shadow-sm flex flex-col">
              <div className="relative aspect-[4/5] w-full bg-[#FAF3F0] overflow-hidden flex items-center justify-center">
                {item.type === 'video' ? (
                  <video 
                    src={item.src} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="auto" 
                    className="w-full h-full object-cover pointer-events-none"
                  />
                ) : (
                  <img src={item.src} alt={item.alt} className="w-full h-full object-cover pointer-events-none" loading="lazy" />
                )}
              </div>
              <div className="p-4 bg-white whitespace-normal">
                <p className="font-serif font-bold text-base text-[#1C1917]">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-33.333% - 1rem)); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
