"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, ArrowRight, Star, ShieldCheck, MapPin } from "lucide-react";

interface HeroProps {
  onOpenTriage: () => void;
  onExploreServices?: () => void;
}

export function Hero({ onOpenTriage, onExploreServices }: HeroProps) {
  return (
    <section 
      aria-labelledby="hero-title"
      className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] md:h-[90vh] md:max-h-[820px] flex items-center bg-[#1C1917] overflow-hidden border-b border-[#C5A880]/30"
    >
      {/* ===================== 1. VÍDEO OFICIAL DE FUNDO (2.7K WIDESCREEN) ===================== */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/midias/foto-paratopodosite-dayane.jpg"
        className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01]"
      >
        <source src="/midias/hero-dayane.mp4" type="video/mp4" />
      </video>

      {/* ===================== 2. GRADIENTES DE SOBREPOSIÇÃO ESCURA (CONFORMIDADE WCAG 2.2 AA) ===================== */}
      {/* Gradiente Lateral: Garante legibilidade absoluta da copy e botões */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-[#141211]/95 via-[#141211]/80 to-[#141211]/30 pointer-events-none"
        aria-hidden="true" 
      />
      {/* Gradiente Vertical: Suaviza a transição com a navbar e a base */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-[#141211] via-transparent to-[#141211]/60 pointer-events-none"
        aria-hidden="true" 
      />
      {/* Reflexo Dourado Acetinado Sutil */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(197,168,128,0.12),transparent_60%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* ===================== 3. CONTEÚDO EDITORIAL EM PRIMEIRA DOBRA (SEM SCROLL) ===================== */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* COLUNA ESQUERDA: Texto Editorial de Alta Precisão & CTA Imediato */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-8 flex flex-col items-start text-left"
          >
            
            {/* Badge Oficial da Marca */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#C5A880]/50 text-[#C5A880] shadow-sm mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-sans font-semibold tracking-wider uppercase text-white">
                DAYANE LIMA • ALTA COSTURA CAPILAR • 20+ ANOS
              </span>
            </div>

            {/* H1 com Presença Editorial e Tipografia Nobre */}
            <h1 
              id="hero-title"
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.14] [text-wrap:balance]"
            >
              Sua melhor versão com{" "}
              <span className="font-normal italic text-[#C5A880]">
                Mega Hair invisível
              </span>{" "}
              e mechas nobres em Montes Claros.
            </h1>

            {/* Subtítulo Claro e com Alto Contraste */}
            <p className="mt-3.5 sm:mt-4 text-sm sm:text-base text-neutral-200 font-sans leading-relaxed max-w-xl [text-wrap:pretty]">
              Atendimento consultivo e personalizado no Monte Carmelo. Preservação biológica da sua raiz folicular, mechas iluminadas sob luz natural e acervo exclusivo de cabelos 100% humanos selecionados.
            </p>

            {/* Botão Primário 100% Visível Imediatamente Sem Necessidade de Rolagem */}
            <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <motion.button
                type="button"
                onClick={onOpenTriage}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-8 rounded-full bg-[#C5A880] hover:bg-[#b8976b] text-[#1C1917] font-sans font-bold text-sm tracking-wide shadow-xl transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
                aria-label="Agendar Avaliação no WhatsApp"
              >
                <Calendar className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />
                <span>Agendar Avaliação VIP</span>
                <ArrowRight className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />
              </motion.button>

              {onExploreServices && (
                <button
                  type="button"
                  onClick={onExploreServices}
                  className="inline-flex items-center justify-center gap-2 min-h-[50px] px-6 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 font-sans font-medium text-xs tracking-wider uppercase transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                >
                  <span>Explorar Procedimentos</span>
                </button>
              )}
            </div>

            {/* Micro-avaliações e Selos de Confiança (WCAG 2.2 AA) */}
            <div className="mt-6 sm:mt-7 pt-4 border-t border-white/15 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-neutral-300 font-sans">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400" aria-label="5 estrelas">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-white">Nota 4.9</span>
                <span className="text-neutral-300">no Google Reviews</span>
              </div>
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/30" />
              <div className="flex items-center gap-1.5 text-neutral-200">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="font-semibold text-white">Ateliê Privado</span>
                <span className="text-neutral-300">Rua Calcedônia, 155</span>
              </div>
            </div>

          </motion.div>

          {/* COLUNA DIREITA: Card Flutuante Lateral com Retrato Oficial de Dayane Lima */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <div className="w-full max-w-sm overflow-hidden rounded-3xl relative aspect-[3/4] border border-[#C5A880]/40 shadow-2xl bg-neutral-900 group">
              <img 
                src="/midias/foto-paratopodosite-dayane.jpg" 
                alt="Dayane Lima • Especialista em Mega Hair" 
                className="w-full h-full object-cover object-[center_30%] scale-150 brightness-[0.75] contrast-125 filter saturate-[0.85] pointer-events-none transition-all duration-500" 
                loading="eager" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141211]/80 via-[#141211]/20 to-transparent pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
