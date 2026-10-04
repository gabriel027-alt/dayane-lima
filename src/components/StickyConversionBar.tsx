"use client";

import React from "react";
import { MessageCircle, MapPin, Sparkles } from "lucide-react";

interface StickyConversionBarProps {
  onOpenTriage: () => void;
  isTriageOpen?: boolean;
}

export function StickyConversionBar({
  onOpenTriage,
  isTriageOpen = false,
}: StickyConversionBarProps) {
  return (
    <aside
      aria-label="Barra de ação rápida e agendamento VIP"
      className={`fixed bottom-4 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-50 pb-[env(safe-area-inset-bottom)] pointer-events-none sm:w-full sm:max-w-2xl lg:max-w-3xl select-none transition-all duration-300 ${
        isTriageOpen ? "opacity-0 translate-y-8 pointer-events-none" : "opacity-100 translate-y-0"
      }`}
      aria-hidden={isTriageOpen}
    >
      <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-[#E8D0C8] rounded-2xl sm:rounded-full p-2.5 sm:px-6 sm:py-3.5 shadow-2xl flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Informações Institucionais do Ateliê */}
        <div className="pl-1 sm:pl-0 flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span 
              className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" 
              aria-hidden="true" 
            />
            <p className="text-xs sm:text-sm font-serif font-bold text-[#1C1917] tracking-tight truncate">
              Ateliê Dayane Lima
            </p>
          </div>

          <p className="text-sm text-[#44403C] font-sans hidden sm:block mt-0.5">
            Avaliação VIP individual com diagnóstico prévio e preservação da raiz.
          </p>

          <p className="text-xs text-[#44403C] flex items-center gap-1 font-sans sm:hidden truncate mt-0.5">
            <MapPin className="w-3 h-3 text-[#6E501E] shrink-0" aria-hidden="true" />
            <span>Monte Carmelo</span>
          </p>
        </div>

        {/* Botão de Destaque para Conversão Imediata */}
        <button
          type="button"
          onClick={onOpenTriage}
          className="min-h-[48px] px-4 sm:px-7 py-3 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98] transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32] shrink-0 cursor-pointer"
          aria-label="Agendar Avaliação VIP no WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-[#E6C99B] shrink-0" aria-hidden="true" />
          <span className="sm:hidden">Triagem VIP</span>
          <span className="hidden sm:inline">Agendar Avaliação VIP no WhatsApp</span>
        </button>

      </div>
    </aside>
  );
}

export default StickyConversionBar;
