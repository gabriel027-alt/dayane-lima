import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "2.5rem",
        xl: "3rem",
      },
    },
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        // Paleta Haute Parfumerie & Joalheria
        brand: {
          // Fundos Luminosos com Nuance Rosa da Logo Oficial SB Dayane Lima
          pearl: "#F7EAE5",         // Rosa suave sofisticado extraído da logo oficial
          offwhite: "#FCF6F4",      // Nuance perolada suave
          cream: "#F2DDD6",         // Rosa blush sedoso
          
          // Paleta Rosa Sofisticada da Marca Dayane Lima SB
          rose: {
            50: "#FAF3F0",          // Fundo ultrassuave
            100: "#F7EAE5",         // Fundo oficial predominante
            200: "#EFD4CD",         // Tom nobre da logo oficial SB
            300: "#E5C2BA",         // Bordas e contornos sutis
            400: "#D4A398",         // Nude rosé intermediário
            500: "#C58B7E",         // Rosa sofisticado de destaque
            600: "#A86E61",         // Rosa terroso profundo
            700: "#8C5448",         // Contraste sênior WCAG 2.2 AA
            800: "#6B3B31",
            900: "#4A261F",
            950: "#2B1410",
          },

          // Escala de Nudes Terrosos
          nude: {
            50: "#FAF7F2",
            100: "#F4ECE2",
            200: "#E7D8C6",
            300: "#D6BF9F",
            400: "#BFA482",
            600: "#8C7150",
            700: "#6B5336",
            800: "#443424",
            900: "#2A2016",
            950: "#1A130D",
          },

          // Contrastes Escuros de Autoridade: Ônix Profundo & Grafite
          onyx: "#0F0E0D",          // Grafite ônix profundo (eliminando preto chapado)
          graphite: {
            50: "#F7F6F5",
            100: "#EAE8E6",
            200: "#D3CFCC",
            400: "#8D8782",
            500: "#5D5752",
            700: "#36322E",
            800: "#221F1C",
            900: "#1A1816",         // Grafite ônix sedoso
            950: "#0F0E0D",
          },

          // Acentos Metálicos Ouro Champanhe
            champagne: {
            50: "#FBF8F2",
            100: "#F5EDE0",
            200: "#EAD9C0",
            300: "#DCBF98",
            400: "#C5A880",         // Ouro Champanhe Refinado
            DEFAULT: "#B8934A",     // Ouro Nobre Primário
            dark: "#8F6E32",        // Contraste mínimo de 4.5:1 (WCAG 2.2 AA) sobre fundos pérola e brancos
            600: "#967433",
            700: "#745722",
            800: "#523D17",
            900: "#34260D",
          },

          // Canal WhatsApp VIP
          emerald: {
            50: "#ECFDF5",
            DEFAULT: "#15803D",
            hover: "#166534",
            dark: "#0F4622",
          },
        },

        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Montserrat", "Inter", "sans-serif"],
      },
      minHeight: {
        touch: "48px",
        "touch-lg": "56px",
      },
      minWidth: {
        touch: "48px",
        "touch-lg": "56px",
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "112": "28rem",
        "128": "32rem",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        mist: "0 20px 50px rgba(0, 0, 0, 0.04)",
        luxury: "0 20px 50px -10px rgba(15, 14, 13, 0.07), 0 10px 20px -5px rgba(15, 14, 13, 0.03)",
        "luxury-lg": "0 30px 60px -15px rgba(15, 14, 13, 0.12), 0 12px 24px -6px rgba(15, 14, 13, 0.05)",
        "champagne-glow": "0 0 35px -5px rgba(197, 168, 128, 0.35)",
        "drawer-up": "0 -10px 40px 0 rgba(15, 14, 13, 0.4)",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      letterSpacing: {
        widest: "0.22em",
        editorial: "0.12em",
        monumental: "0.04em",
      },
      scale: {
        "160": "1.6",
        "175": "1.75",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.04)" },
        },
        swipeUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "30%": { opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "translateY(-12px)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        swipeUp: "swipeUp 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
