"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
  type PanInfo,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";

// ============================================================================
// GESTÃO GLOBAL DE INSTÂNCIA ÚNICA DE ÁUDIO E CONTROLE DE DEBOUNCE (Cards 3D)
// ============================================================================
let globalActiveMediaElement: HTMLMediaElement | null = null;
let globalAudioDebounceTimer: NodeJS.Timeout | null = null;

/**
 * Pausa imediatamente qualquer instância anterior de áudio/vídeo e reinicia
 * o tempo de reprodução (audio.currentTime = 0), prevenindo sobreposição de sons.
 */
export function stopAllPreviousAudio(except?: HTMLMediaElement | null) {
  // 1. Pausa e reinicia a instância global registrada anteriormente
  if (globalActiveMediaElement && globalActiveMediaElement !== except) {
    try {
      globalActiveMediaElement.pause();
      globalActiveMediaElement.currentTime = 0;
    } catch {
      // safe fallback
    }
  }

  // 2. Garante que qualquer outro vídeo em reprodução com som no documento seja pausado e resetado
  if (typeof document !== "undefined") {
    const allVideos = document.querySelectorAll<HTMLVideoElement>("video");
    allVideos.forEach((v) => {
      if (v !== except && !v.muted) {
        try {
          v.pause();
          v.currentTime = 0;
          v.muted = true;
        } catch {
          // safe fallback
        }
      }
    });
  }

  globalActiveMediaElement = except || null;
}

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
  const [selectedModalSlide, setSelectedModalSlide] = React.useState<Slide | null>(null);
  const isDraggingRef = React.useRef(false);
  const sectionRef = React.useRef<HTMLElement>(null);
  const [isInView, setIsInView] = React.useState(true);

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
    if (total <= 1) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
  };

  // Reativação do Auto-Play Inteligente e Fluido:
  // - Avança suavemente os slides (4.2s para fotos, 5.5s para vídeos)
  // - Pausa temporariamente por 7s quando a usuária clica nas setas ou arrasta manualmente
  // - Pausa quando o carrossel sai de viewport ou o modal de mídia está aberto
  const [isPaused, setIsPaused] = React.useState(false);
  const pauseTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const pauseAutoPlayTemporarily = React.useCallback(() => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 7000);
  }, []);

  React.useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  // Autoplay inteligente sincronizado com a duração dos vídeos:
  // - Para vídeos (<video>): aguarda o término natural do vídeo (onEnded) para avançar
  // - Para imagens: mantém o tempo padrão de 4.5 segundos
  React.useEffect(() => {
    if (!slides || slides.length === 0 || total <= 1 || !isInView || isPaused || selectedModalSlide) return;

    const currentSlide = slides[currentIndex];
    const isVideo =
      currentSlide?.type === "video" ||
      (currentSlide?.src || currentSlide?.image || "").endsWith(".mp4");

    // Se for vídeo, aguarda o evento onEnded do vídeo ativo (com fallback de segurança de 60s)
    if (isVideo) {
      const fallbackTimer = setTimeout(() => {
        handleNext();
      }, 60000);

      return () => clearTimeout(fallbackTimer);
    }

    // Se for imagem estática, avança após 4.5 segundos
    const timer = setTimeout(() => {
      handleNext();
    }, 4500);

    return () => clearTimeout(timer);
  }, [currentIndex, slides, total, isInView, isPaused, selectedModalSlide, handleNext]);

  const handleVideoEnded = React.useCallback(
    (index: number) => {
      if (index === currentIndex && !isPaused && total > 1) {
        handleNext();
      }
    },
    [currentIndex, isPaused, handleNext, total]
  );

  const config = React.useMemo(
    () => getCarouselConfig(windowWidth),
    [windowWidth]
  );

  const handleDragStart = () => {
    pauseAutoPlayTemporarily();
    isDraggingRef.current = true;
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
      onComplete: () => {
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 120);
      },
    });
  };

  // Fecha o modal ao pressionar Escape
  React.useEffect(() => {
    if (!selectedModalSlide) return;
    const handleModalKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedModalSlide(null);
      }
    };
    window.addEventListener("keydown", handleModalKey);
    return () => window.removeEventListener("keydown", handleModalKey);
  }, [selectedModalSlide]);

  // Controle inteligente de áudio e visibilidade ao rolar para fora da seção do carrossel
  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          if (!entry.isIntersecting) {
            setIsMuted(true);
            stopAllPreviousAudio();
          }
        });
      },
      { threshold: 0.05, rootMargin: "60px 0px 60px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Alterna o estado de áudio do carrossel garantindo instância única
  const handleToggleAudio = React.useCallback(() => {
    setIsMuted((prev) => {
      const nextMuted = !prev;

      if (!nextMuted) {
        // Antes de disparar um novo áudio, interrompe e zera qualquer instância anterior
        stopAllPreviousAudio();

        // Localiza e reproduz exclusivamente o vídeo do card ativo deste carrossel
        if (sectionRef.current) {
          const activeVideo = sectionRef.current.querySelector<HTMLVideoElement>(
            "video[data-active='true']"
          );
          if (activeVideo) {
            stopAllPreviousAudio(activeVideo);
            activeVideo.muted = false;
            activeVideo.volume = 1;
            activeVideo.currentTime = 0;
            const playPromise = activeVideo.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
          }
        }
      } else {
        // Silenciando: silencia e reseta
        stopAllPreviousAudio(null);
        if (sectionRef.current) {
          const videos = sectionRef.current.querySelectorAll<HTMLVideoElement>("video");
          videos.forEach((video) => {
            video.muted = true;
          });
        }
      }

      return nextMuted;
    });
  }, []);

  if (!slides || slides.length === 0) return null;

  return (
    <section 
      ref={sectionRef} 
      data-carousel-3d="true"
      role="region"
      aria-roledescription="carousel"
      aria-label={title ? `Galeria de ${title}` : "Galeria de procedimentos Dayane Lima Ateliê"}
      className="relative z-10 isolate py-16 md:py-20 bg-[#FAF3F0] border-b border-[#E8D0C8] overflow-hidden [contain:paint] [clip-path:inset(0)] select-none"
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

            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              {slides.length > 1 && (
                <div className="inline-flex items-center gap-2 text-xs font-sans text-[#6E501E] bg-white px-4 py-2 rounded-full border border-[#E8D0C8] shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  <span className="hidden sm:inline">Arraste com o mouse ou use as setas</span>
                  <span className="sm:hidden">Deslize com o dedo para navegar</span>
                </div>
              )}

              {/* Botão de Áudio integrado no cabeçalho sem vazamento de z-index */}
              <button
                type="button"
                onClick={handleToggleAudio}
                className={cn(
                  "inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-sans font-medium transition-all shadow-xs cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]",
                  isMuted
                    ? "bg-white hover:bg-neutral-50 text-[#1C1917] border border-[#E8D0C8]"
                    : "bg-[#1C1917] text-[#C5A880] border border-[#C5A880] shadow-[0_0_12px_rgba(197,168,128,0.3)]"
                )}
                aria-label={isMuted ? "Ativar áudio dos vídeos" : "Silenciar áudio dos vídeos"}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-[#6E501E]" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#C5A880] animate-pulse" />
                )}
                <span className={isMuted ? "text-[#1C1917]" : "text-[#C5A880] font-semibold"}>
                  {isMuted ? "Ativar Som" : "Som Ativado"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Container Confinado com Isolamento e Containment Rígido */}
      <div 
        className={cn(
          "flex flex-col items-center justify-center w-full overflow-hidden select-none relative [contain:paint] [clip-path:inset(0)] transition-opacity duration-300",
          isInView ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Fallback de Botão de Áudio caso não haja título nem subtítulo */}
        {!(title || subtitle) && (
          <div className="absolute top-2 right-4 sm:top-2 sm:right-6 z-30 pointer-events-auto">
            <button
              type="button"
              onClick={handleToggleAudio}
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans font-medium backdrop-blur-md transition-all shadow-md cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]",
                isMuted
                  ? "bg-black/85 hover:bg-black text-neutral-300 border border-[#C5A880]/50"
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
                {isMuted ? "Ativar Som" : "Som Ativado"}
              </span>
            </button>
          </div>
        )}

        <div className="relative w-full max-w-7xl h-80 sm:h-112 lg:h-128 flex items-center justify-center overflow-hidden [contain:paint] [clip-path:inset(0)]">
          {/* Botões Laterais (apenas se houver mais de 1 slide) */}
          {slides.length > 1 && (
            <>
              {/* Botão Lateral Esquerdo (Flutuante com Fundo Escuro Translúcido e Borda Champagne) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  pauseAutoPlayTemporarily();
                  handlePrev();
                }}
                className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] p-2.5 sm:p-3 rounded-full bg-[#1C1917]/85 hover:bg-[#1C1917] backdrop-blur-md border border-[#C5A880]/60 hover:border-[#C5A880] text-[#E6C99B] hover:text-white transition-all shadow-xl flex items-center justify-center cursor-pointer active:scale-90 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                aria-label="Slide anterior"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Botão Lateral Direito (Flutuante com Fundo Escuro Translúcido e Borda Champagne) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  pauseAutoPlayTemporarily();
                  handleNext();
                }}
                className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] p-2.5 sm:p-3 rounded-full bg-[#1C1917]/85 hover:bg-[#1C1917] backdrop-blur-md border border-[#C5A880]/60 hover:border-[#C5A880] text-[#E6C99B] hover:text-white transition-all shadow-xl flex items-center justify-center cursor-pointer active:scale-90 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                aria-label="Próximo slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {/* Controle Interativo: arraste se múltiplos, ou clique estático para zoom se item único */}
          {slides.length > 1 ? (
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
              onClick={() => {
                if (!isDraggingRef.current && slides[currentIndex]) {
                  stopAllPreviousAudio();
                  setSelectedModalSlide(slides[currentIndex]);
                }
              }}
              className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-3xl"
            />
          ) : (
            <div
              role="button"
              tabIndex={0}
              aria-label="Clique para ampliar a mídia em tela cheia"
              onClick={() => {
                if (slides[0]) {
                  stopAllPreviousAudio();
                  setSelectedModalSlide(slides[0]);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (slides[0]) {
                    stopAllPreviousAudio();
                    setSelectedModalSlide(slides[0]);
                  }
                }
              }}
              className="absolute inset-0 z-20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-3xl"
            />
          )}

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
              isInView={isInView}
              onVideoEnded={handleVideoEnded}
            />
          ))}
        </div>
      </div>

      {/* ===================== MODAL DE MÍDIA EM FOCO COM BOTÃO X REFINADO ===================== */}
      <AnimatePresence>
        {selectedModalSlide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 select-none"
            onClick={() => setSelectedModalSlide(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-sm sm:max-w-md w-full aspect-[4/5] bg-[#1C1917] rounded-3xl overflow-hidden border border-[#C5A880]/60 shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão de Fechar (X) Refinado no Canto Superior Direito com fundo translúcido e borda sutil */}
              <button
                type="button"
                onClick={() => setSelectedModalSlide(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 min-w-[40px] min-h-[40px] p-2 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white transition-all shadow-lg flex items-center justify-center cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                aria-label="Fechar visualização de mídia"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {(selectedModalSlide.type === "video" || (selectedModalSlide.src || selectedModalSlide.image || "").endsWith(".mp4")) ? (
                <video
                  src={selectedModalSlide.src || selectedModalSlide.image}
                  autoPlay
                  loop
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={selectedModalSlide.src || selectedModalSlide.image}
                  alt={selectedModalSlide.title || "Dayane Lima • Ateliê Boutique"}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
  isInView: boolean;
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
  isInView,
  onVideoEnded,
}: CardProps) => {
  const mediaSrc = slide.src || slide.image || "";
  const isVideo = slide.type === "video" || mediaSrc.endsWith(".mp4");
  const item = {
    ...slide,
    src: mediaSrc,
    type: isVideo ? ("video" as const) : ("image" as const),
  };
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Controla reprodução do vídeo: se for o card ativo E a seção estiver visível,
  // reproduz do início com trava de debounce e garantia de instância única; caso contrário, pausa imediatamente e zera
  React.useEffect(() => {
    if (!isVideo || !videoRef.current) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    if (isActive && isInView) {
      // Se estiver com áudio ativado, interrompe imediatamente qualquer áudio anterior
      if (!isMuted) {
        stopAllPreviousAudio(videoRef.current);
      }

      // Trava de debounce suave (75ms) para que hover/navegação rápida não sobreponha disparos
      debounceTimerRef.current = setTimeout(() => {
        if (!videoRef.current) return;

        if (!isMuted) {
          stopAllPreviousAudio(videoRef.current);
          videoRef.current.muted = false;
          videoRef.current.volume = 1;
        } else {
          videoRef.current.muted = true;
        }

        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }, 75);
    } else {
      // Card inativo ou fora de visualização: pausa imediatamente e reinicia o tempo
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        if (globalActiveMediaElement === videoRef.current) {
          globalActiveMediaElement = null;
        }
      }
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
    };
  }, [isActive, isVideo, isMuted, isInView]);

  // Sincroniza dinamicamente o status de áudio (mutado/desmutado) quando o card já é o ativo
  React.useEffect(() => {
    if (!isVideo || !videoRef.current || !isActive || !isInView) return;

    if (!isMuted) {
      stopAllPreviousAudio(videoRef.current);
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      videoRef.current.muted = true;
      if (globalActiveMediaElement === videoRef.current) {
        globalActiveMediaElement = null;
      }
    }
  }, [isMuted, isActive, isVideo, isInView]);

  // Cleanup na desmontagem do card
  React.useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        if (globalActiveMediaElement === videoRef.current) {
          globalActiveMediaElement = null;
        }
      }
    };
  }, []);

  const offset = useTransform(progress, (p) => {
    if (total <= 1) return 0;
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
  // Blindagem visual absoluta: sem opacidade inline ou background transparente nos cards em perspectiva.
  // Fundo basalto escuro #1C1917 cobre 100% da área em todos os cards visíveis.
  const displayValue = useTransform(offset, (o) =>
    Math.abs(o) > 2.5 ? "none" : "block"
  );
  const zIndex = useTransform(offset, (o) =>
    Math.round(10 - Math.abs(o) * 2)
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
        position: "absolute",
        x,
        rotate,
        y,
        scale,
        zIndex,
        backgroundColor: "#1C1917",
        opacity: 1,
        display: displayValue,
      }}
      className="bg-[#1C1917] rounded-3xl overflow-hidden border border-[#C5A880]/60 shadow-2xl relative w-56 sm:w-72 lg:w-80 aspect-[4/5] pointer-events-none select-none"
    >
      <div className="w-full h-full bg-[#1C1917] rounded-3xl overflow-hidden border border-[#C5A880]/60 shadow-2xl relative flex items-center justify-center" style={{ backgroundColor: '#1C1917' }}>
        {item.type === 'video' ? (
          <video 
            ref={videoRef}
            src={item.src} 
            data-active={isActive ? "true" : "false"}
            muted={isMuted} 
            playsInline 
            preload="auto" 
            autoPlay 
            loop={total <= 1}
            onEnded={handleEnded}
            onError={handleError}
            className="w-full h-full object-cover object-center block pointer-events-none" 
            style={{ backgroundColor: '#1C1917' }}
          />
        ) : (
          <img 
            src={item.src} 
            alt="Dayane Lima • Ateliê Boutique" 
            className="w-full h-full object-cover object-center block select-none pointer-events-none" 
            style={{ backgroundColor: '#1C1917' }}
            loading="lazy" 
          />
        )}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none z-20"></div>
      </div>
    </motion.div>
  );
};

export { CarouselStacked as Carousel3D };
export default CarouselStacked;
