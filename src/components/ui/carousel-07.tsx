"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

export interface Slide {
  type?: 'image' | 'video';
  image?: string;
  src?: string;
  title?: string;
  description?: string;
  badge?: string;
}

export interface CarouselConfig {
  distanceDivisor: number;
  velocityDivisor: number;
  sensitivity: number;
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
}

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 120,
      velocityDivisor: 500,
      sensitivity: 180,
      xMultiplier: 90,
      yMultiplier: 20,
      rotationMultiplier: 8,
      scaleReduction: 0.06,
    };
  }
  if (width < 1024) {
    return {
      distanceDivisor: 160,
      velocityDivisor: 650,
      sensitivity: 220,
      xMultiplier: 130,
      yMultiplier: 30,
      rotationMultiplier: 10,
      scaleReduction: 0.09,
    };
  }
  return {
    distanceDivisor: 200,
    velocityDivisor: 800,
    sensitivity: 250,
    xMultiplier: 170,
    yMultiplier: 40,
    rotationMultiplier: 12,
    scaleReduction: 0.12,
  };
};

export interface CarouselStackedProps {
  slides: Slide[];
  title?: string;
  subtitle?: string;
}

export const CarouselStacked = ({ slides, title, subtitle }: CarouselStackedProps) => {
  const scrollProgress = useMotionValue(0);
  const startProgress = React.useRef(0);
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(true);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const total = slides && slides.length > 0 ? slides.length : 1;

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Monitora o progresso do scroll e atualiza o índice do card central/ativo
  React.useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (latest) => {
      const rounded = Math.round(latest);
      let mod = rounded % total;
      if (mod < 0) mod += total;
      setCurrentIndex(mod);
    });
    return () => unsubscribe();
  }, [scrollProgress, total]);

  const isAdvancingRef = React.useRef(false);

  // Função para avançar suavemente ao próximo slide com física spring
  const handleNext = React.useCallback(() => {
    if (total <= 1) return;
    if (isAdvancingRef.current) return;
    isAdvancingRef.current = true;

    const current = scrollProgress.get();
    animate(scrollProgress, Math.round(current) + 1, {
      type: "spring",
      stiffness: 150,
      damping: 25,
      onComplete: () => {
        isAdvancingRef.current = false;
      },
    });
  }, [scrollProgress, total]);

  // Sincronização Dinâmica do Tempo de Transição:
  // - Para imagens estáticas: timer padrão de 3.8s por slide
  // - Para vídeos: o temporizador fixo é TOTALMENTE DESATIVADO.
  //   O vídeo é reproduzido por completo até o término (onEnded), evitando qualquer corte prematuro.
  React.useEffect(() => {
    if (!slides || slides.length === 0 || total <= 1) return;
    const currentSlide = slides[currentIndex];
    const isVideo =
      currentSlide?.type === "video" ||
      (currentSlide?.src || currentSlide?.image || "").endsWith(".mp4");

    if (!isVideo) {
      const timer = setTimeout(() => {
        handleNext();
      }, 3800);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, slides, total, handleNext]);

  const handleVideoEnded = React.useCallback(
    (index: number) => {
      if (index === currentIndex) {
        handleNext();
      }
    },
    [currentIndex, handleNext]
  );

  const config = React.useMemo(
    () => getCarouselConfig(windowWidth),
    [windowWidth]
  );

  const handleDragStart = () => {
    startProgress.current = scrollProgress.get();
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    const distanceShift = -dragDistance / config.distanceDivisor;
    const velocityShift = -velocity / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);
    totalShift = Math.max(-3, Math.min(3, totalShift));

    const target = Math.round(startProgress.current) + totalShift;

    animate(scrollProgress, target, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      mass: 1,
    });
  };

  if (!slides || slides.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-[#F7EAE5] border-b border-[#E8D0C8] overflow-hidden">
      {(title || subtitle) && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              {subtitle && (
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#6E501E] block mb-1">
                  {subtitle}
                </span>
              )}
              {title && (
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1C1917]">
                  {title}
                </h3>
              )}
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-sans text-[#6E501E] bg-white px-4 py-2 rounded-full border border-[#E8D0C8] shadow-xs self-start md:self-auto">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>Arraste para folhear • Toque para focar</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center w-full overflow-hidden select-none relative">
        <div className="absolute top-2 right-6 z-40">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-black text-white text-xs backdrop-blur-md border border-[#C5A880]/40 transition-all shadow-md cursor-pointer"
            aria-label="Controlar som dos vídeos"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-neutral-300" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#C5A880]" />
            )}
            <span>{isMuted ? "Ativar Áudio" : "Mutado"}</span>
          </button>
        </div>

        <div className="relative w-full max-w-7xl h-80 sm:h-112 lg:h-128 flex items-center justify-center">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={handleDragStart}
            onDrag={(_, info) => {
              const delta = -info.delta.x / config.sensitivity;
              scrollProgress.set(scrollProgress.get() + delta);
            }}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
          />

          {slides.map((slide, i) => (
            <Card
              key={`${slide.src || slide.image || i}-${i}`}
              slide={slide}
              index={i}
              total={total}
              progress={scrollProgress}
              config={config}
              isMuted={isMuted}
              isActive={currentIndex === i}
              onVideoEnded={handleVideoEnded}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface CardProps {
  slide: Slide;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
  isMuted: boolean;
  isActive: boolean;
  onVideoEnded?: (index: number) => void;
}

const Card = ({
  slide,
  index,
  total,
  progress,
  config,
  isMuted,
  isActive,
  onVideoEnded,
}: CardProps) => {
  const mediaSrc = slide.src || slide.image || "";
  const isVideo = slide.type === "video" || mediaSrc.endsWith(".mp4");
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Controla reprodução do vídeo: se for o card ativo, reproduz do início; caso contrário, pausa
  React.useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    if (isActive) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      videoRef.current.pause();
    }
  }, [isActive, isVideo]);

  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  });

  const x = useTransform(offset, (o) => o * config.xMultiplier);
  const rotate = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return o * config.rotationMultiplier;
  });
  const y = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return absO * config.yMultiplier;
  });
  const scale = useTransform(
    offset,
    (o) => 1 - Math.abs(o) * config.scaleReduction
  );
  const opacity = useTransform(
    offset,
    [-total / 2, -total / 2 + 0.5, 0, total / 2 - 0.5, total / 2],
    [0, 1, 1, 1, 0]
  );
  const zIndex = useTransform(offset, (o) =>
    Math.round(100 - Math.abs(o) * 10)
  );

  const handleEnded = () => {
    if (!isActive) return;
    if (total <= 1) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
      return;
    }
    if (onVideoEnded) {
      onVideoEnded(index);
    }
  };

  const handleError = () => {
    if (isActive && total > 1 && onVideoEnded) {
      onVideoEnded(index);
    }
  };

  return (
    <motion.div
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        zIndex,
      }}
      className={cn(
        "absolute rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl border border-[#C5A880]/30 pointer-events-none select-none",
        "w-56 h-72 sm:w-72 sm:h-96 lg:w-80 lg:h-[420px]"
      )}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={mediaSrc}
          autoPlay={isActive}
          loop={false}
          muted={isMuted}
          playsInline
          preload="auto"
          onEnded={handleEnded}
          onError={handleError}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      ) : (
        <img
          src={mediaSrc}
          alt={slide.title || "Procedimento Dayane Lima"}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loading="lazy"
        />
      )}

      {/* Borda interna sutil para acabamento acetinado de joalheria, sem nenhuma camada de texto */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
    </motion.div>
  );
};

export default CarouselStacked;
