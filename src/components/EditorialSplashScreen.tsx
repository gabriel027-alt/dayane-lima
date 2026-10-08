"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface EditorialSplashScreenProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export function EditorialSplashScreen({
  onComplete,
  minDurationMs = 1800,
}: EditorialSplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Trava rolagem enquanto a splash estiver visível
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "unset";
      if (onComplete) onComplete();
    }, minDurationMs);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [minDurationMs, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1C1917] text-[#FAF3F0] select-none pointer-events-auto"
          aria-label="Carregando experiência Fernanda Garroni"
          role="status"
        >
          {/* Luz dourada ambiente suave no centro */}
          <div className="absolute w-[450px] h-[450px] bg-[#C5A880]/15 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
            
            {/* Monograma FG Dourado com moldura sutil em rotação suave */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-[#C5A880]/40 flex items-center justify-center p-2 mb-6 shadow-[0_0_40px_rgba(197,168,128,0.2)]"
            >
              {/* Círculo externo com rotação decorativa */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-[#C5A880]/30 border-dashed"
              />

              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                aria-hidden="true"
              >
                <circle cx="50" cy="50" r="44" stroke="#C5A880" strokeWidth="1" opacity="0.8" />
                <text
                  x="50"
                  y="59"
                  fontFamily="'Playfair Display', Georgia, serif"
                  fontSize="38"
                  fontWeight="bold"
                  fontStyle="italic"
                  fill="#E6C99B"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  letterSpacing="-1"
                >
                  FG
                </text>
              </svg>
            </motion.div>

            {/* Revelação Tipográfica em Playfair Display */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="space-y-2"
            >
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Fernanda Garroni
              </h1>
              <p className="text-xs sm:text-sm font-sans font-medium tracking-[0.22em] uppercase text-[#E6C99B]">
                Cabeleireira & Visagista
              </p>
            </motion.div>

            {/* Linha Divisória Dourada Animada */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
              className="w-28 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent my-4"
            />

            {/* Badge de Localização & Posicionamento */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-2 text-[11px] font-sans font-medium text-neutral-400 tracking-wider"
            >
              <Sparkles className="w-3 h-3 text-[#E6C99B]" />
              <span>Morenas Iluminadas & Curvaturas • Porto Alegre</span>
            </motion.div>

            {/* Barra de Progresso Fina e Sofisticada */}
            <div className="w-36 h-[2px] bg-neutral-800 rounded-full mt-6 overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full bg-gradient-to-r from-transparent via-[#E6C99B] to-transparent"
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EditorialSplashScreen;
