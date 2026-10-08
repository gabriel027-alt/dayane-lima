import React from "react";

interface SbLogoProps {
  className?: string;
  variant?: "dark" | "light" | "gold";
  showSubtitle?: boolean;
  showStamp?: boolean;
}

export function SbLogo({
  className = "h-10",
  variant = "dark",
  showSubtitle = true,
  showStamp = true,
}: SbLogoProps) {
  const isLight = variant === "light";
  const isGold = variant === "gold";

  // Cores dinâmicas de acordo com a paleta oficial:
  // Grafite Profundo (#1C1917), Ouro Champanhe (#C5A880 / #8F6E32) e Off-White (#FAF8F5)
  const primaryColor = isLight ? "#FFFFFF" : isGold ? "#C5A880" : "#1C1917";
  const accentColor = isLight ? "#E5D1B8" : "#C5A880";
  const subtitleColor = isLight ? "#D4CDC5" : isGold ? "#8F6E32" : "#5D5752";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Monograma Vetorial Sagrado FG */}
      <div className="relative h-full aspect-square rounded-full overflow-hidden border border-[#C5A880]/50 shrink-0 shadow-xs bg-[#1C1917] flex items-center justify-center p-1.5">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Círculo com detalhes em ouro champanhe */}
          <circle cx="50" cy="50" r="46" stroke="#C5A880" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="50" cy="50" r="42" stroke="#C5A880" strokeWidth="1" opacity="0.9" />
          
          {/* Monograma FG estilizado */}
          <text
            x="50"
            y="58"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="34"
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
      </div>

      {/* TEXTO INSTITUCIONAL COMPLETO */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1.5">
          <span
            className="font-serif font-bold tracking-tight text-base sm:text-lg md:text-xl leading-none"
            style={{ color: primaryColor }}
          >
            Fernanda Garroni
          </span>
        </div>

        {showSubtitle && (
          <span
            className="text-[10px] sm:text-xs font-sans font-medium tracking-[0.16em] uppercase mt-0.5 leading-tight"
            style={{ color: subtitleColor }}
          >
            Cabeleireira & Visagista
          </span>
        )}
      </div>
    </div>
  );
}

export default SbLogo;
