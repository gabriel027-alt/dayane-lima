"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import { MediaCatalogItem, MediaCategory, getMediaByCategory, MEDIA_CATALOG } from "@/data/mediaCatalog";

export interface EditorialArchiveGalleryProps {
  category?: MediaCategory;
  items?: MediaCatalogItem[];
  theme?: "light" | "dark";
  badgeText?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  className?: string;
}

export function EditorialArchiveGallery({
  category,
  items: customItems,
  theme = "light",
  badgeText = "Vitrine em Movimento Lateral • Acervo Oficial",
  sectionTitle,
  sectionSubtitle,
  className = "",
}: EditorialArchiveGalleryProps) {
  // Resolução estrita dos itens sem repetição
  const items = customItems || (category ? getMediaByCategory(category) : MEDIA_CATALOG);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Drag-to-scroll state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const isDark = theme === "dark";

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft: current, clientWidth } = scrollRef.current;
      const offset = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollTo({ left: current + offset, behavior: "smooth" });
    }
  };

  // Suporte a toque e clique/arrasto fluido com mouse
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

  // Animações GSAP & ScrollTrigger elegantes
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (trackRef.current) {
        const cards = trackRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {/* Cabeçalho da Vitrine com Botões de Navegação */}
      {(sectionTitle || sectionSubtitle || badgeText) && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            {badgeText && (
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider mb-2 ${
                  isDark
                    ? "bg-white/10 border border-white/20 text-[#C5A880]"
                    : "bg-white border border-[#E8D0C8] text-[#6E501E] shadow-2xs"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{badgeText}</span>
              </div>
            )}
            {sectionTitle && (
              <h3
                className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight ${
                  isDark ? "text-white" : "text-[#1C1917]"
                }`}
              >
                {sectionTitle}
              </h3>
            )}
            {sectionSubtitle && (
              <p
                className={`text-xs sm:text-sm font-sans mt-1.5 max-w-2xl leading-relaxed ${
                  isDark ? "text-neutral-300" : "text-[#574F4A]"
                }`}
              >
                {sectionSubtitle}
              </p>
            )}
          </div>

          {/* Botões de Navegação Lateral (Touch Target 48x48px) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scroll("left")}
              className={`min-w-[48px] min-h-[48px] w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] active:scale-95 ${
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-md"
                  : "bg-white hover:bg-[#FAF3F0] text-[#1C1917] border border-[#E8D0C8] shadow-xs"
              }`}
              aria-label="Rolar vitrine para a esquerda"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className={`min-w-[48px] min-h-[48px] w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] active:scale-95 ${
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-md"
                  : "bg-white hover:bg-[#FAF3F0] text-[#1C1917] border border-[#E8D0C8] shadow-xs"
              }`}
              aria-label="Rolar vitrine para a direita"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Trilho Deslizante em Movimento Horizontal Fluido */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth py-2 px-1 cursor-grab active:cursor-grabbing select-none scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div ref={trackRef} className="flex gap-5 sm:gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative w-full h-full bg-[#1C1917] rounded-3xl overflow-hidden border border-[#C5A880]/60 shadow-2xl flex-[0_0_280px] sm:flex-[0_0_340px] snap-start flex flex-col justify-between transition-all duration-300"
            >
              {/* Moldura de Mídia com Aspect Ratio 4/5 */}
              <div className="relative aspect-[4/5] w-full bg-[#1C1917] overflow-hidden">
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ backgroundColor: "#1C1917" }}
                    className="w-full h-full object-cover object-center pointer-events-none"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    style={{ backgroundColor: "#1C1917" }}
                    className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Informações Editoriais */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-[#1C1917] border-t border-[#C5A880]/20">
                <div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider block mb-1 text-[#C5A880]">
                    {item.author}
                  </span>
                  <p className="font-serif font-bold text-base leading-snug line-clamp-2 text-white">
                    {item.title}
                  </p>
                  <p className="font-sans text-xs mt-1.5 leading-relaxed line-clamp-2 text-neutral-300">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EditorialArchiveGallery;
