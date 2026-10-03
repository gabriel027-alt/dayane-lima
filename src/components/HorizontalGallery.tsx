'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface HorizontalGalleryProps {
  id?: string;
  title: string;
  subtitle?: string;
  theme?: 'light' | 'dark';
  items: { type: 'image' | 'video'; src: string; alt: string; label: string }[];
}

export default function HorizontalGallery({ 
  id,
  title, 
  subtitle, 
  theme = 'light',
  items 
}: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Mouse drag-to-scroll state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const isDark = theme === 'dark';

  // Navegação suave lateral
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft: currentScroll, clientWidth } = scrollRef.current;
      const offset = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollTo({ left: currentScroll + offset, behavior: 'smooth' });
    }
  };

  // Suporte a arrastar com mouse fluido
  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  // Integração com GSAP & ScrollTrigger
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animação de entrada suave do cabeçalho
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Animação escalonada (stagger) dos cards do trilho horizontal
      if (trackRef.current) {
        const cards = trackRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <section 
      id={id}
      ref={sectionRef}
      className={`py-16 md:py-20 border-b transition-colors duration-300 scroll-mt-20 ${
        isDark 
          ? 'bg-[#1C1917] border-[#C5A880]/30 text-white' 
          : 'bg-[#F7EAE5] border-[#E8D0C8] text-[#1C1917]'
      }`}
    >
      <div 
        ref={headerRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-8 flex items-end justify-between"
      >
        <div>
          {subtitle && (
            <span 
              className={`text-xs font-sans font-bold uppercase tracking-widest block mb-1 ${
                isDark ? 'text-[#C5A880]' : 'text-[#6E501E]'
              }`}
            >
              {subtitle}
            </span>
          )}
          <h3 
            className={`text-2xl sm:text-3xl font-serif font-bold ${
              isDark ? 'text-white' : 'text-[#1C1917]'
            }`}
          >
            {title}
          </h3>
        </div>

        {/* Botões de Controle do Trilho com Touch Target Amplo */}
        <div className="hidden sm:flex gap-2">
          <button 
            type="button"
            onClick={() => scroll('left')} 
            className={`p-3 min-w-[48px] min-h-[48px] rounded-full border transition-all cursor-pointer flex items-center justify-center active:scale-95 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] ${
              isDark 
                ? 'bg-neutral-900 border-[#C5A880]/40 text-white hover:bg-neutral-800' 
                : 'bg-white border-[#E8D0C8] hover:bg-[#FAF3F0] text-[#1C1917]'
            }`}
            aria-label="Anterior"
          >
            ←
          </button>
          <button 
            type="button"
            onClick={() => scroll('right')} 
            className={`p-3 min-w-[48px] min-h-[48px] rounded-full border transition-all cursor-pointer flex items-center justify-center active:scale-95 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] ${
              isDark 
                ? 'bg-neutral-900 border-[#C5A880]/40 text-white hover:bg-neutral-800' 
                : 'bg-white border-[#E8D0C8] hover:bg-[#FAF3F0] text-[#1C1917]'
            }`}
            aria-label="Próximo"
          >
            →
          </button>
        </div>
      </div>

      {/* Trilho Horizontal com Toque e Arrastar Fluido */}
      <div 
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className="flex gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-6 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div ref={trackRef} className="flex gap-6">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="relative w-full h-full bg-[#1C1917] rounded-3xl overflow-hidden border border-[#C5A880]/60 shadow-2xl flex-[0_0_280px] sm:flex-[0_0_340px] snap-start flex flex-col transition-all duration-300"
            >
              <div className="relative aspect-[4/5] w-full bg-[#1C1917] overflow-hidden">
                {item.type === 'video' ? (
                  <video 
                    src={item.src} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover pointer-events-none" 
                  />
                ) : (
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="w-full h-full object-cover pointer-events-none transition-transform duration-500 hover:scale-105" 
                    loading="lazy" 
                  />
                )}
              </div>
              <div className="p-4 bg-[#1C1917] border-t border-[#C5A880]/20">
                <p className="font-serif font-bold text-base leading-snug text-white">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
