"use client";

import React from "react";
import { Calendar, Sparkles } from "lucide-react";
import { SbLogo } from "./SbLogo";

interface HeaderProps {
  onOpenTriage: () => void;
}

export function Header({ onOpenTriage }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#F7EAE5]/95 backdrop-blur-md border-b border-[#E8D0C8] transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-20 flex items-center justify-between">
        
        {/* Logotipo Oficial Dayane Lima Ateliê Boutique */}
        <a 
          href="#" 
          className="flex items-center group rounded-xl p-1 transition-transform hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] min-h-[48px] min-w-[48px]"
          aria-label="Página inicial Dayane Lima — Ateliê Boutique"
        >
          <SbLogo variant="dark" className="h-10 sm:h-12" />
        </a>

        {/* Navegação Condensada Respeitando a Lei de Hick (WCAG 2.2 AA Compliant) */}
        <nav 
          aria-label="Navegação principal"
          className="flex items-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm font-semibold text-[#1C1917] font-sans"
        >
          <a 
            href="#megahair" 
            className="inline-flex items-center min-h-[48px] px-3 rounded-lg text-[#3D3835] hover:text-[#1C1917] hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
          >
            Especialidades
          </a>

          <a 
            href="#laser" 
            className="hidden sm:inline-flex items-center min-h-[48px] px-3 rounded-lg text-[#3D3835] hover:text-[#1C1917] hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
          >
            Laser & Corporal
          </a>

          <a 
            href="#espaco" 
            className="hidden md:inline-flex items-center min-h-[48px] px-3 rounded-lg text-[#3D3835] hover:text-[#1C1917] hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
          >
            O Ateliê
          </a>

          <a 
            href="#triagem-inteligente" 
            className="hidden lg:inline-flex items-center min-h-[48px] px-3 rounded-lg text-[#6E501E] hover:text-[#1C1917] hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#C5A880]" />
            Triagem Online
          </a>

          {/* CTA de Agendamento VIP - Min 48px Touch Target */}
          <button
            type="button"
            onClick={onOpenTriage}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 sm:px-6 rounded-full bg-[#1C1917] hover:bg-neutral-800 text-white font-sans font-semibold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] cursor-pointer touch-manipulation"
            aria-label="Abrir triagem VIP com a recepção"
          >
            <Calendar className="w-4 h-4 text-[#C5A880]" aria-hidden="true" />
            <span>Triagem VIP</span>
          </button>
        </nav>

      </div>
    </header>
  );
}

export default Header;
