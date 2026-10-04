"use client";

import React from "react";
import { Calendar, Sparkles } from "lucide-react";
import { SbLogo } from "./SbLogo";

interface HeaderProps {
  onOpenTriage: () => void;
}

export function Header({ onOpenTriage }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF3F0]/95 backdrop-blur-md border-b border-[#E8D0C8] transition-all">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl h-20 flex items-center justify-between gap-2">
        
        {/* Logotipo Oficial Dayane Lima Ateliê Boutique */}
        <a 
          href="#" 
          className="flex items-center group rounded-xl p-1 transition-transform hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] min-h-[48px] shrink-0"
          aria-label="Página inicial Dayane Lima — Ateliê Boutique"
        >
          <SbLogo variant="dark" className="h-9 sm:h-11 md:h-12" />
        </a>

        {/* Navegação Simplificada (Lei de Hick) - Apenas Links Essenciais e CTA VIP */}
        <nav 
          aria-label="Navegação principal"
          className="flex items-center gap-1 sm:gap-2 md:gap-4 text-sm font-semibold text-[#1C1917] font-sans shrink-0"
        >
          <a 
            href="#megahair" 
            className="hidden min-[420px]:inline-flex items-center justify-center min-h-[48px] px-2.5 sm:px-3 text-xs sm:text-sm rounded-full text-[#292524] hover:text-[#1C1917] hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] shrink-0"
          >
            Especialidades
          </a>

          <a 
            href="#espaco" 
            className="hidden sm:inline-flex items-center justify-center min-h-[48px] px-2.5 sm:px-3 text-xs sm:text-sm rounded-full text-[#292524] hover:text-[#1C1917] hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] shrink-0"
          >
            O Ateliê
          </a>

          <a 
            href="#localizacao" 
            className="hidden md:inline-flex items-center justify-center min-h-[48px] px-2.5 sm:px-3 text-xs sm:text-sm rounded-full text-[#292524] hover:text-[#1C1917] hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] shrink-0"
          >
            Localização
          </a>

          {/* CTA de Destaque Principal - Triagem VIP (Lei de Hick) */}
          <button
            type="button"
            onClick={onOpenTriage}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-[48px] px-3.5 sm:px-5 md:px-6 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32] cursor-pointer touch-manipulation whitespace-nowrap shrink-0"
            aria-label="Iniciar triagem VIP e agendamento pelo WhatsApp"
          >
            <Calendar className="w-4 h-4 text-[#E6C99B] shrink-0" aria-hidden="true" />
            <span>Triagem VIP</span>
          </button>
        </nav>

      </div>
    </header>
  );
}

export default Header;
