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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-0 sm:h-20">
          
          {/* Linha Superior (Mobile e Desktop): Logotipo à esquerda e CTA VIP à direita no Mobile com respiro total */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <a 
              href="#" 
              className="flex items-center group rounded-xl p-1 transition-transform hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] min-h-[44px] sm:min-h-[48px] shrink-0"
              aria-label="Página inicial Dayane Lima — Ateliê Boutique"
            >
              <SbLogo variant="dark" className="h-8 sm:h-10 md:h-12" />
            </a>

            {/* Botão de Destaque VIP Mobile (Alinhado à direita com respiro lateral garantido) */}
            <div className="sm:hidden flex items-center shrink-0">
              <button
                type="button"
                onClick={onOpenTriage}
                className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-4 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-xs tracking-wide shadow-md transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
                aria-label="Iniciar triagem VIP e agendamento pelo WhatsApp"
              >
                <Calendar className="w-3.5 h-3.5 text-[#E6C99B] shrink-0" aria-hidden="true" />
                <span>Triagem VIP</span>
              </button>
            </div>
          </div>

          {/* Navegação de Âncoras: Compacta e centralizada abaixo no Mobile, em linha no Desktop */}
          <nav 
            aria-label="Navegação principal"
            className="flex items-center justify-center sm:justify-end gap-2.5 sm:gap-4 md:gap-6 text-xs sm:text-sm font-semibold text-[#1C1917] font-sans pt-1.5 pb-0.5 sm:py-0 border-t border-[#E8D0C8]/40 sm:border-0 mt-1 sm:mt-0"
          >
            <a 
              href="#megahair" 
              className="inline-flex items-center justify-center min-h-[36px] sm:min-h-[48px] px-2.5 sm:px-3 rounded-full text-[#44403C] hover:text-[#1C1917] hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] shrink-0"
            >
              Especialidades
            </a>

            <a 
              href="#espaco" 
              className="inline-flex items-center justify-center min-h-[36px] sm:min-h-[48px] px-2.5 sm:px-3 rounded-full text-[#44403C] hover:text-[#1C1917] hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] shrink-0"
            >
              O Ateliê
            </a>

            <a 
              href="#localizacao" 
              className="inline-flex items-center justify-center min-h-[36px] sm:min-h-[48px] px-2.5 sm:px-3 rounded-full text-[#44403C] hover:text-[#1C1917] hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] shrink-0"
            >
              Localização
            </a>

            {/* CTA de Destaque Principal Desktop (>= 640px) */}
            <button
              type="button"
              onClick={onOpenTriage}
              className="hidden sm:inline-flex items-center justify-center gap-2 min-h-[48px] px-5 md:px-6 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-sm tracking-wide shadow-md transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32] cursor-pointer touch-manipulation whitespace-nowrap shrink-0 ml-2"
              aria-label="Iniciar triagem VIP e agendamento pelo WhatsApp"
            >
              <Calendar className="w-4 h-4 text-[#E6C99B] shrink-0" aria-hidden="true" />
              <span>Triagem VIP</span>
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
}

export default Header;
