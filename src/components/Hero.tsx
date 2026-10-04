"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, ArrowRight, Star, ShieldCheck, ChevronDown } from "lucide-react";

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
      {/* VÍDEO DE FUNDO EM LOOP CONTÍNUO (Alta performance e estabilidade nativa) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video 
          src="/midias/hero-dayane.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          className="w-full h-full object-cover opacity-45 filter brightness-95 contrast-105"
        />
        {/* Overlays escuros de contraste cinematográfico e atmosfera de luxo */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141211] via-[#141211]/85 to-transparent/30" />
        <div className="absolute inset-0 bg-[#141211]/40 sm:bg-transparent" />
      </div>

      {/* CONTEÚDO EDITORIAL EM PRIMEIRA DOBRA */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* COLUNA ESQUERDA: Tipografia Serifada de Luxo & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-8 flex flex-col items-start text-left"
          >
            
            {/* Badge Oficial de Alta Costura */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#C5A880]/50 text-[#C5A880] shadow-sm mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-sans font-semibold tracking-wider uppercase text-white">
                DAYANE LIMA • ALTA COSTURA CAPILAR • 20+ ANOS
              </span>
            </div>

            {/* H1 com Presença Editorial e Tipografia Serifada de Luxo */}
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

            {/* Botões de Conversão e CTA Imediato */}
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

            {/* Bloco Imponente de Instrução de Rolagem & Setinhas Contínuas (Luxury Minimal) */}
            <div className="mt-6 inline-flex flex-col items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-black/75 backdrop-blur-xl border border-[#C5A880]/70 shadow-2xl">
              <span className="font-serif italic text-base sm:text-lg md:text-xl text-[#FAF3F0] tracking-wide text-center drop-shadow-md">
                Role a página <span className="font-sans font-normal not-italic text-xs sm:text-sm uppercase tracking-wider text-[#E8D0B3]">ou</span> deslize para explorar
              </span>
              <div className="flex flex-col items-center -space-y-1.5 text-[#C5A880]">
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>
            </div>

            {/* Micro-avaliações e Selos de Confiança (WCAG 2.2 AA) */}
            <div className="mt-6 sm:mt-7 pt-4 border-t border-white/15 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-neutral-300 font-sans">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400" aria-label="5 estrelas">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-white">Nota 5.0</span>
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

          {/* CARD LATERAL DIREITO COM RETRATO OFICIAL DA DAYANE (Exclusivo, sem cortes e sem tarjas pretas) */}
          <div className="hidden lg:flex lg:col-span-4 justify-end relative z-10">
            <div className="w-full max-w-[340px] xl:max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden border border-[#C5A880]/50 shadow-2xl bg-[#1C1917] relative group">
              <img 
                src="/midias/Retratoeleganteemtonsquentes-dayane.png" 
                alt="Dayane Lima • Especialista em Mega Hair" 
                className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-105 pointer-events-none transition-transform duration-700 group-hover:scale-105" 
                loading="eager" 
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
