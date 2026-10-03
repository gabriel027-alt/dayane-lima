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
      {/* Carimbo de Selo Oficial ou Monograma Vetorial Sagrado */}
      {showStamp ? (
        <div className="relative h-full aspect-square rounded-full overflow-hidden border border-[#C5A880]/40 shrink-0 shadow-xs bg-[#FAF8F5]">
          <video
            src="/midias/minivideo-logo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <svg
          viewBox="0 0 140 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto aspect-[1.4/1] shrink-0"
          aria-hidden="true"
        >
          {/* FLOR DE LÓTUS ESTILIZADA (Emblema superior) */}
          <g transform="translate(72, 8) scale(0.65)">
            <path
              d="M 15 0 C 10 12 8 20 15 28 C 22 20 20 12 15 0 Z"
              fill={accentColor}
              opacity="0.95"
            />
            <path
              d="M 12 5 C 4 14 3 22 13 28 C 9 20 10 13 12 5 Z"
              fill={accentColor}
              opacity="0.8"
            />
            <path
              d="M 18 5 C 26 14 27 22 17 28 C 21 20 20 13 18 5 Z"
              fill={accentColor}
              opacity="0.8"
            />
          </g>

          {/* MONOGRAMA CURSIVO ENTRELAÇADO DE ALTA COSTURA */}
          <path
            d="M 38 42 C 33 34 26 36 21 41 C 15 48 18 57 26 61 C 34 65 41 71 39 79 C 37 87 27 90 19 86 C 13 83 10 77 11 74"
            stroke={primaryColor}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 52 86 L 68 32 C 69 29 73 28 77 31"
            stroke={primaryColor}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d="M 68 32 C 76 30 89 31 89 44 C 89 54 77 56 65 56"
            stroke={primaryColor}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 65 56 C 81 56 94 60 94 72 C 94 84 79 87 63 87 C 54 87 49 84 52 86"
            stroke={primaryColor}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <circle cx="63" cy="87" r="2.2" fill={accentColor} />
        </svg>
      )}

      {/* TEXTO INSTITUCIONAL COMPLETO */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1.5">
          <span
            className="font-serif font-bold tracking-tight text-lg sm:text-xl leading-none"
            style={{ color: primaryColor }}
          >
            Dayane Lima
          </span>
        </div>

        {showSubtitle && (
          <span
            className="text-[9px] sm:text-[10px] font-sans font-medium tracking-[0.25em] uppercase mt-1 leading-tight"
            style={{ color: subtitleColor }}
          >
            Ateliê Boutique
          </span>
        )}
      </div>
    </div>
  );
}

export default SbLogo;
