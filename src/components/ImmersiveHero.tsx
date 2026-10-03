"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Calendar, ArrowRight, Star, ShieldCheck, ChevronDown, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImmersiveHeroProps {
  onOpenTriage: () => void;
  onExploreServices?: () => void;
}

export function ImmersiveHero({ onOpenTriage, onExploreServices }: ImmersiveHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Armazena as imagens pré-carregadas e o estado de interpolação suave
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const targetFrameRef = useRef<number>(0);
  const smoothFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isInitialReady, setIsInitialReady] = useState<boolean>(false);

  // Configurações de frames conforme dispositivo
  const totalFrames = isMobile ? 60 : 120;
  const frameFolder = isMobile ? "/midias/frames-mobile" : "/midias/frames-desktop";

  // Formata o nome do frame: frame_001.webp até frame_120.webp
  const getFramePath = useCallback(
    (index: number) => {
      const paddedNumber = String(index + 1).padStart(3, "0");
      return `${frameFolder}/frame_${paddedNumber}.webp`;
    },
    [frameFolder]
  );

  // Detecta se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Função para desenhar no canvas preservando proporção (object-fit: cover)
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Busca o frame requisitado ou o mais próximo já carregado
    let img: HTMLImageElement | null = imagesRef.current[frameIndex] || null;
    if (!img) {
      for (let i = frameIndex - 1; i >= 0; i--) {
        if (imagesRef.current[i]) {
          img = imagesRef.current[i];
          break;
        }
      }
    }
    if (!img) {
      for (let i = frameIndex + 1; i < imagesRef.current.length; i++) {
        if (imagesRef.current[i]) {
          img = imagesRef.current[i];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const hRatio = canvasWidth / imgWidth;
    const vRatio = canvasHeight / imgHeight;
    const ratio = Math.max(hRatio, vRatio);

    const drawW = imgWidth * ratio;
    const drawH = imgHeight * ratio;
    const shiftX = (canvasWidth - drawW) / 2;
    const shiftY = (canvasHeight - drawH) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight, shiftX, shiftY, drawW, drawH);

    currentFrameRef.current = frameIndex;
  }, []);

  // Ajusta dimensões do canvas para retina display
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawFrame(currentFrameRef.current);
    }
  }, [drawFrame]);

  // Carregamento em Lote (Batch Loading) de Frames WebP
  useEffect(() => {
    let isCancelled = false;
    imagesRef.current = new Array(totalFrames).fill(null);
    setLoadProgress(0);
    setIsInitialReady(false);

    // Carrega uma única imagem
    const loadImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new window.Image();
        img.src = getFramePath(index);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[index] = img;
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(img);
        };
      });
    };

    // Sequência de carregamento: primeiro o frame 0 (imediato), depois lotes progressivos
    const loadAllBatches = async () => {
      // 1. Frame Inicial Imediato
      const firstImg = await loadImage(0);
      if (isCancelled) return;

      setIsInitialReady(true);
      updateCanvasSize();
      drawFrame(0);

      // 2. Lotes subsequentes (tamanho do lote: 12 frames)
      const batchSize = 12;
      let loadedCount = 1;

      for (let start = 1; start < totalFrames; start += batchSize) {
        if (isCancelled) break;
        const end = Math.min(start + batchSize, totalFrames);
        const batchPromises: Promise<HTMLImageElement>[] = [];

        for (let i = start; i < end; i++) {
          batchPromises.push(loadImage(i));
        }

        await Promise.all(batchPromises);
        loadedCount += end - start;
        if (!isCancelled) {
          setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        }
      }
    };

    loadAllBatches();

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, getFramePath, updateCanvasSize, drawFrame]);

  // Redimensionamento de tela
  useEffect(() => {
    const handleResize = () => {
      updateCanvasSize();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateCanvasSize]);

  // Interpolação suave e contínua dos frames com amortecimento / inércia (lerp)
  useEffect(() => {
    // Fator de lerp: no mobile 0.12 para responder com agilidade e fluidez ao touch nativo;
    // No desktop 0.07 para conferir amortecimento cinematográfico de alta costura sem saltos.
    const lerpFactor = isMobile ? 0.12 : 0.07;

    const updateSmoothFrame = () => {
      const diff = targetFrameRef.current - smoothFrameRef.current;

      if (Math.abs(diff) > 0.005) {
        smoothFrameRef.current += diff * lerpFactor;
        const frameToDraw = Math.min(
          totalFrames - 1,
          Math.max(0, Math.round(smoothFrameRef.current))
        );
        if (frameToDraw !== currentFrameRef.current) {
          drawFrame(frameToDraw);
        }
      } else if (smoothFrameRef.current !== targetFrameRef.current) {
        smoothFrameRef.current = targetFrameRef.current;
        const frameToDraw = Math.min(
          totalFrames - 1,
          Math.max(0, Math.round(smoothFrameRef.current))
        );
        if (frameToDraw !== currentFrameRef.current) {
          drawFrame(frameToDraw);
        }
      }
    };

    gsap.ticker.add(updateSmoothFrame);

    return () => {
      gsap.ticker.remove(updateSmoothFrame);
    };
  }, [isMobile, totalFrames, drawFrame]);

  // Animação GSAP ScrollTrigger vinculada ao Canvas e Textos
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline com scrub suave controlando progresso e fases editoriais
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "+=700%" : "+=1000%",
          scrub: 0.5,
          pin: !isMobile,
          pinSpacing: false,
          onUpdate: (self) => {
            targetFrameRef.current = self.progress * (totalFrames - 1);
          },
        },
      });

      // Inicializa os blocos 2 e 3 como transparentes e sem clique
      gsap.set(".hero-phase-2", { opacity: 0, y: 40, pointerEvents: "none" });
      gsap.set(".hero-phase-3", { opacity: 0, y: 40, pointerEvents: "none" });

      // Fase 1: Hero Principal (visível em 0%, fade out entre 10% e 25%)
      tl.to(
        ".hero-phase-1",
        {
          opacity: 0,
          y: -35,
          ease: "power1.out",
          duration: 15,
        },
        10
      );
      tl.set(".hero-phase-1", { pointerEvents: "none" }, 25);

      // Fase 2: Arte & Tecnologia de Nanocápsulas (fade in 28%-42%, fade out 55%-68%)
      tl.to(
        ".hero-phase-2",
        {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          duration: 14,
          pointerEvents: "auto",
        },
        28
      );
      tl.to(
        ".hero-phase-2",
        {
          opacity: 0,
          y: -35,
          ease: "power1.in",
          duration: 13,
          pointerEvents: "none",
        },
        55
      );

      // Fase 3: Convite VIP e Triagem WhatsApp (fade in 70%-85%, permanece ativo até 100%)
      tl.to(
        ".hero-phase-3",
        {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          duration: 15,
          pointerEvents: "auto",
        },
        70
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isMobile, totalFrames]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${isMobile ? "h-[750vh]" : "h-[1050vh]"} bg-[#1C1917] text-white select-none`}
    >
      {/* CONTAINER FIXO (PINNED VIEWPORT / STICKY VIEWPORT) */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* CANVAS DE ALTA PERFORMANCE */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* OVERLAYS DE LUXO & CONTRASTE CINEMATOGRÁFICO */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141211]/90 via-[#141211]/70 to-[#141211]/40 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[ellipse_at_center,transparent_40%,rgba(20,18,17,0.85)_100%] z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/80 to-transparent z-10 pointer-events-none" />

        {/* BARRA DE PROGRESSO DE BATCH LOADING DISCRETA */}
        {loadProgress < 100 && (
          <div className="absolute top-20 right-6 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C5A880]/30 text-[11px] font-sans text-neutral-300 pointer-events-none transition-opacity duration-500">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
            <span>Sincronizando alta definição ({loadProgress}%)</span>
          </div>
        )}

        {/* =========================================================================
            FASE 1 (0% a 25% do Scroll): HERO PRINCIPAL COM CTA IMEDIATO
            ========================================================================= */}
        <div className="hero-phase-1 absolute inset-0 z-20 flex items-center pointer-events-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Coluna Esquerda: Copy Editorial e Ações Imediatas */}
              <div className="lg:col-span-8 flex flex-col items-start text-left">
                
                {/* Badge Oficial */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C5A880]/50 text-[#C5A880] shadow-sm mb-3 sm:mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" aria-hidden="true" />
                  <span className="text-[11px] sm:text-xs font-sans font-semibold tracking-wider uppercase text-white">
                    DAYANE LIMA • ALTA COSTURA CAPILAR • 20+ ANOS
                  </span>
                </div>

                {/* Título Principal H1 */}
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.14] [text-wrap:balance]">
                  Sua melhor versão com{" "}
                  <span className="font-normal italic text-[#C5A880]">
                    Mega Hair invisível
                  </span>{" "}
                  e mechas nobres em Montes Claros.
                </h1>

                {/* Subtítulo Descritivo */}
                <p className="mt-3.5 sm:mt-4 text-sm sm:text-base text-neutral-200 font-sans leading-relaxed max-w-xl [text-wrap:pretty]">
                  Atendimento consultivo e personalizado no Monte Carmelo. Preservação biológica da sua raiz folicular, mechas iluminadas sob luz natural e acervo exclusivo de cabelos 100% humanos selecionados.
                </p>

                {/* Botões de Conversão */}
                <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onOpenTriage}
                    className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-8 rounded-full bg-[#C5A880] hover:bg-[#b8976b] text-[#1C1917] font-sans font-bold text-sm tracking-wide shadow-xl transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 touch-manipulation"
                    aria-label="Agendar Avaliação no WhatsApp"
                  >
                    <Calendar className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />
                    <span>Agendar Avaliação VIP</span>
                    <ArrowRight className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />
                  </button>

                  {onExploreServices && (
                    <button
                      type="button"
                      onClick={onExploreServices}
                      className="inline-flex items-center justify-center gap-2 min-h-[50px] px-6 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 font-sans font-medium text-xs tracking-wider uppercase transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] touch-manipulation"
                    >
                      <span>Explorar Procedimentos</span>
                    </button>
                  )}
                </div>

                {/* Selos de Confiança */}
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

              </div>

              {/* Coluna Direita: Retrato Tratado da Dayane Lima */}
              <div className="hidden lg:flex lg:col-span-4 justify-end">
                <div className="w-full max-w-[320px] rounded-3xl overflow-hidden border border-[#f5e6e0]/20 shadow-[0_20px_45px_-15px_rgba(220,180,160,0.18)] bg-neutral-900/90 backdrop-blur-sm flex items-center justify-center p-2.5">
                  <Image
                    src="/midias/dayane-perfil.png"
                    alt="Dayane Lima • Especialista em Mega Hair e Visagismo"
                    width={1121}
                    height={1403}
                    priority
                    className="w-full h-auto object-cover rounded-2xl filter brightness-[0.95] contrast-110 pointer-events-none"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Indicador de Scroll na Base */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[11px] font-sans uppercase tracking-[0.2em] text-[#C5A880]/80 animate-bounce pointer-events-none">
            <span>Role para interagir</span>
            <ChevronDown className="w-4 h-4 text-[#C5A880]" />
          </div>
        </div>

        {/* =========================================================================
            FASE 2 (30% a 65% do Scroll): A ARTE EM MOVIMENTO (DETALHES TÉCNICOS)
            ========================================================================= */}
        <div className="hero-phase-2 absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-4">
          <div className="max-w-2xl text-center bg-black/60 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-[#C5A880]/40 shadow-2xl">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#C5A880] block mb-3">
              ENGENHARIA CAPILAR HAUTE COUTURE
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-snug">
              Balanço imperceptível e{" "}
              <span className="italic font-normal text-[#C5A880]">
                fixação biocompatível
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
              Nanocápsulas moldadas milimetricamente mecha a mecha. Distribuição anatômica que não tensiona a raiz e permite coques altos, rotina ativa e escovação sem tração.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-sans text-neutral-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" /> Fios 100% Brasileiros
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" /> Zero Danos à Raiz
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" /> Durabilidade Estendida
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FASE 3 (70% a 100% do Scroll): TRANSFORMAÇÃO & CONVITE EXCLUSIVO
            ========================================================================= */}
        <div className="hero-phase-3 absolute inset-0 z-20 flex items-center justify-center pointer-events-auto px-4">
          <div className="max-w-xl text-center bg-black/75 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-[#C5A880]/50 shadow-2xl">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#C5A880] block mb-3">
              ATELIÊ PRIVATIVO · MONTE CARMELO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Pronta para viver essa transformação?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
              Agende sua triagem exclusiva com hora marcada. Avaliação minuciosa da estrutura do seu fio e seleção personalizada das mechas ideais.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenTriage}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[52px] px-9 rounded-full bg-[#C5A880] hover:bg-[#b8976b] text-[#1C1917] font-sans font-bold text-sm tracking-wide shadow-xl transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 touch-manipulation"
              >
                <Calendar className="w-4 h-4 text-[#1C1917]" />
                <span>Agendar Avaliação no WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-[#1C1917]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ImmersiveHero;
