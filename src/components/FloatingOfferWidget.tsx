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
      <div className="relative rounded-2xl bg-brand-onyx/95 backdrop-blur-xl border border-brand-champagne/40 p-4 shadow-2xl text-left">
        
        {/* Botão de Fechar */}
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="absolute top-2.5 right-2.5 p-1 text-brand-graphite-400 hover:text-brand-pearl rounded-full transition-colors"
          aria-label="Dispensar aviso de agenda"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Indicador de Status Sobrio */}
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-3 h-3 text-brand-champagne shrink-0" aria-hidden="true" />
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-brand-champagne-300">
            Agenda VIP • Monte Carmelo
          </span>
        </div>

        {/* Título & Subtítulo de Posicionamento */}
        <p className="font-serif font-bold text-sm text-white leading-snug">
          Consultoria Capilar Personalizada
        </p>
        
        <p className="text-[11px] text-brand-nude-200 font-sans mt-0.5 leading-tight">
          Vagas limitadas para este mês com Dayane Lima.
        </p>

        {/* Botão de Triagem Imediata */}
        <button
          type="button"
          onClick={onOpenTriage}
          className="mt-3 w-full py-2.5 px-3.5 rounded-xl bg-brand-champagne hover:bg-brand-champagne-300 text-brand-onyx font-sans font-bold text-xs tracking-editorial flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
        >
          <Calendar className="w-3.5 h-3.5 text-brand-onyx" />
          <span>Solicitar Pré-Reserva</span>
          <ArrowRight className="w-3 h-3 text-brand-onyx" />
        </button>

      </div>
    </aside>
  );
}

export default FloatingOfferWidget;
