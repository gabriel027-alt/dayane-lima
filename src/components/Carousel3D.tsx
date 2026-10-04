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

  // Função para retroceder suavemente ao slide anterior
  const handlePrev = React.useCallback(() => {
    if (total <= 1) return;
    if (isAdvancingRef.current) return;
    isAdvancingRef.current = true;

    const current = scrollProgress.get();
    animate(scrollProgress, Math.round(current) - 1, {
      type: "spring",
      stiffness: 150,
      damping: 25,
      onComplete: () => {
        isAdvancingRef.current = false;
      },
    });
  }, [scrollProgress, total]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
  };

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
      stiffness: 150,
      damping: 25,
    });
  };

  const sectionRef = React.useRef<HTMLElement>(null);

  // Controle inteligente de áudio: pausa ao rolar para fora da seção do carrossel
  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setIsMuted(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Alterna o estado de áudio com sincronização para todos os elementos de mídia da página
  const handleToggleAudio = React.useCallback(() => {
    setIsMuted((prev) => {
      const nextMuted = !prev;

      try {
        const videos = document.querySelectorAll("video");
        videos.forEach((video) => {
          video.muted = nextMuted;
          if (!nextMuted) {
            video.volume = 1;
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
          }
        });
      } catch (e) {
        console.error("Erro ao alterar áudio:", e);
      }

      return nextMuted;
    });
  }, []);

  if (!slides || slides.length === 0) return null;

  return (
    <section 
      ref={sectionRef} 
      role="region"
      aria-roledescription="carousel"
      aria-label={title ? `Galeria de ${title}` : "Galeria de procedimentos Dayane Lima Ateliê"}
      className="py-16 md:py-20 bg-[#F7EAE5] border-b border-[#E8D0C8] overflow-hidden"
    >
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
              <span>Arraste ou use as setas • Toque para focar</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center w-full overflow-hidden select-none relative">
        {/* BOTÃO FLUTUANTE DE ÁUDIO COM Z-INDEX ELEVADO PARA NUNCA FICAR ENCOBERTO EM MOBILE OU PC */}
        <div className="absolute top-2 right-4 sm:top-2 sm:right-6 z-[120] pointer-events-auto">
          <button
            type="button"
            onClick={handleToggleAudio}
            className={cn(
              "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans font-medium backdrop-blur-md transition-all shadow-xl cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]",
              isMuted
                ? "bg-black/85 hover:bg-black text-neutral-300 border border-[#C5A880]/50 hover:border-[#C5A880]"
                : "bg-black/95 text-[#C5A880] border border-[#C5A880] shadow-[0_0_16px_rgba(197,168,128,0.35)]"
            )}
            aria-label={isMuted ? "Ativar áudio dos vídeos" : "Silenciar áudio dos vídeos"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#C5A880] animate-pulse" />
            )}
            <span className={isMuted ? "text-neutral-200" : "text-[#C5A880] font-semibold"}>
              {isMuted ? "Ativar Áudio" : "Áudio Ativado"}
            </span>
          </button>
        </div>

        <div className="relative w-full max-w-7xl h-80 sm:h-112 lg:h-128 flex items-center justify-center">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="button"
            aria-label="Controle interativo do carrossel: use as setas do teclado ou arraste"
            onDragStart={handleDragStart}
            onDrag={(_, info) => {
              const delta = -info.delta.x / config.sensitivity;
              scrollProgress.set(scrollProgress.get() + delta);
            }}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-3xl"
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
      videoRef.current.muted = isMuted;
      if (!isMuted) {
        videoRef.current.volume = 1;
      }
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      videoRef.current.pause();
    }
  }, [isActive, isVideo, isMuted]);

  // Sincroniza dinamicamente o status de áudio (mutado/desmutado)
  React.useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    videoRef.current.muted = isMuted;
    if (!isMuted) {
      videoRef.current.volume = 1;
      if (isActive) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    }
  }, [isMuted, isActive, isVideo]);

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
  // Blindagem visual absoluta: opacidade sólida fixa (1.0) em todos os cards visíveis,
  // eliminando qualquer transparência gradual que enfraqueça o fundo escuro #1C1917 ou a borda champagne #C5A880/60.
  const opacity = useTransform(offset, (o) => (Math.abs(o) > 2.5 ? 0 : 1));
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

  if (!mediaSrc) return null;

  return (
    <motion.div
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        zIndex,
        backgroundColor: "#1C1917",
      }}
      className="absolute w-56 h-72 sm:w-72 sm:h-96 lg:w-80 lg:h-[420px] bg-[#1C1917] rounded-3xl overflow-hidden border border-[#C5A880]/60 shadow-2xl pointer-events-none select-none isolate"
    >
      {/* Container interno unificado com cantos arredondados e contenção estrita */}
      <div 
        style={{ backgroundColor: "#1C1917" }}
        className="relative w-full h-full rounded-3xl overflow-hidden bg-[#1C1917] flex items-center justify-center"
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
            className="w-full h-full object-cover object-center rounded-3xl pointer-events-none bg-[#1C1917] block"
          />
        ) : (
          <img
            src={mediaSrc}
            alt={slide.title || "Procedimento Dayane Lima"}
            className="w-full h-full object-cover object-center rounded-3xl pointer-events-none select-none bg-[#1C1917] block"
            loading="lazy"
          />
        )}

        {/* Anel de acabamento interno Haute Couture unificado em todos os cards */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
      </div>
    </motion.div>
  );
};

export { CarouselStacked as Carousel3D };
export default CarouselStacked;
