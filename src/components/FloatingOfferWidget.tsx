"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, X, Calendar } from "lucide-react";

interface FloatingOfferWidgetProps {
  onOpenTriage: () => void;
}

export function FloatingOfferWidget({ onOpenTriage }: FloatingOfferWidgetProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Aviso de disponibilidade de agenda"
      className="hidden sm:block fixed bottom-6 right-6 z-40 max-w-xs transition-all duration-300 animate-fade-in"
    >
      <div className="relative rounded-2xl bg-[#1C1917]/95 backdrop-blur-xl border border-[#C5A880]/50 p-4 shadow-2xl text-left">
        
        {/* Botão de Fechar */}
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="absolute top-2.5 right-2.5 min-w-[32px] min-h-[32px] p-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-neutral-300 hover:text-white transition-all shadow-md flex items-center justify-center cursor-pointer"
          aria-label="Dispensar aviso de agenda"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Indicador de Status Sobrio */}
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#E6C99B] shrink-0" aria-hidden="true" />
          <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#E6C99B]">
            Agenda VIP • Monte Carmelo
          </span>
        </div>

        {/* Título & Subtítulo de Posicionamento */}
        <p className="font-serif font-bold text-base text-white leading-snug">
          Consultoria Capilar Personalizada
        </p>
        
        <p className="text-xs text-neutral-200 font-sans mt-0.5 leading-tight">
          Vagas limitadas para este mês com Dayane Lima.
        </p>

        {/* Botão de Triagem Imediata */}
        <button
          type="button"
          onClick={onOpenTriage}
          className="mt-3 w-full min-h-[48px] py-2.5 px-4 rounded-xl bg-[#C5A880] hover:bg-[#D4BC96] text-[#1C1917] font-sans font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#1C1917]" />
          <span>Solicitar Pré-Reserva</span>
          <ArrowRight className="w-4 h-4 text-[#1C1917]" />
        </button>

      </div>
    </aside>
  );
}

export default FloatingOfferWidget;
