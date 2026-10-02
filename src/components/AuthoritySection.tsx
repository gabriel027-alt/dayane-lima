"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Award, ShieldCheck, HeartHandshake, Sparkles, CheckCircle2, Calendar, Play, Pause, Volume2, VolumeX } from "lucide-react";

interface AuthoritySectionProps {
  onOpenTriage: () => void;
}

export function AuthoritySection({ onOpenTriage }: AuthoritySectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStartVideo = () => {
    setShowVideo(true);
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 50);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section 
      id="autoridade"
      aria-labelledby="authority-heading"
      className="py-20 md:py-28 bg-[#F7EAE5] text-[#1C1917] relative overflow-hidden border-b border-[#E8D0C8] scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Divisor Decorativo Superior */}
        <div className="w-full flex items-center justify-center pb-8 sm:pb-12" aria-hidden="true">
          <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
          <div className="mx-3 w-1.5 h-1.5 rotate-45 border border-[#C5A880]/60 bg-[#F7EAE5]" />
          <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Coluna Visual: Retrato Oficial Studio / Player do Vídeo Mestre com Microfone de Lapela */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Moldura Principal com Retrato Oficial ou Player Institucional */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-[#C5A880]/30 shadow-lg bg-neutral-900 group">
                
                {showVideo ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={videoRef}
                      loop
                      playsInline
                      muted={isMuted}
                      poster="/midias/dayane-perfil.png"
                      className="w-full h-full object-cover"
                    >
                      <source src="/midias/video-dayane-apresentação-serviços1.mp4" type="video/mp4" />
                    </video>

                    {/* Controles de Vídeo e Áudio */}
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="inline-flex items-center justify-center min-w-[48px] min-h-[48px] w-12 h-12 rounded-full bg-black/60 hover:bg-white hover:text-neutral-900 text-white backdrop-blur-md border border-white/20 transition-all shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                        aria-label={isMuted ? "Ativar som do vídeo" : "Mutar áudio"}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={togglePlay}
                        className="inline-flex items-center justify-center min-w-[48px] min-h-[48px] w-12 h-12 rounded-full bg-black/60 hover:bg-white hover:text-neutral-900 text-white backdrop-blur-md border border-white/20 transition-all shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                        aria-label={isPlaying ? "Pausar vídeo institucional" : "Reproduzir vídeo"}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src="/midias/dayane-perfil.png"
                      alt="Dayane Lima"
                      width={1121}
                      height={1403}
                      className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                    />

                    {/* Botão Play Institucional Centralizado */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <button
                        type="button"
                        onClick={handleStartVideo}
                        className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-black/60 hover:bg-[#C5A880] text-white hover:text-[#1C1917] backdrop-blur-md border border-white/30 transition-all duration-300 shadow-xl active:scale-95 group/btn cursor-pointer"
                        aria-label="Assistir apresentação institucional de Dayane Lima"
                      >
                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:bg-[#1C1917]/20">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                        <span className="font-sans font-semibold text-xs tracking-wide">
                          Ver Apresentação Oficial
                        </span>
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Gradiente sutil na base */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" 
                  aria-hidden="true" 
                />
                
                <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                  <p className="text-[#C5A880] text-xs font-semibold uppercase tracking-wider font-sans">
                    Especialista Titular
                  </p>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                    Dayane Lima
                  </h3>
                  <p className="text-xs text-white/85 mt-1 font-sans">
                    Fundadora da SB Estética e Beleza • Montes Claros - MG
                  </p>
                </div>
              </div>

              {/* Card Flutuante de 20 Anos de Autoridade */}
              <div className="absolute -top-5 -left-3 sm:-left-5 bg-white border border-[#C5A880]/30 rounded-2xl p-4 shadow-md flex items-center gap-3.5 max-w-[240px] z-20">
                <div className="w-11 h-11 rounded-xl bg-[#C5A880]/15 flex items-center justify-center shrink-0 border border-[#C5A880]/30 text-[#6E501E]">
                  <Award className="w-5 h-5 text-[#6E501E]" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-xl font-serif font-bold text-[#1C1917] leading-none">
                    20+ Anos
                  </span>
                  <span className="block text-[11px] text-neutral-500 font-sans mt-0.5 leading-tight">
                    de Dedicação e Aperfeiçoamento Contínuo
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Coluna Textual: Argumentação Sólida e os 3 Pilares Oficiais */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C5A880]/30 text-[#6E501E] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" aria-hidden="true" />
              <span>Legado & Padrão de Atendimento</span>
            </div>

            <h2 
              id="authority-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1917] tracking-tight leading-[1.15] [text-wrap:balance]"
            >
              Duas Décadas Transformando a Autoestima Feminina em Montes Claros.
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#44403C] leading-relaxed font-sans [text-wrap:pretty]">
              Em um mercado de procedimentos rápidos e sem diagnóstico, a trajetória de mais de vinte anos de <strong className="text-[#1C1917] font-semibold">Dayane Lima</strong> foi consolidada com rigor técnico, honestidade com a saúde capilar e um compromisso inegociável: valorizar a beleza singular de cada cliente preservando a raiz biológica.
            </p>

            {/* O Manifesto de Autoridade: 3 Princípios Inegociáveis */}
            <div className="mt-8 divide-y divide-[#E8D0C8] border-y border-[#E8D0C8] w-full">
              <div className="py-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FAF3F0] border border-[#C5A880]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1C1917]">
                    Atendimento Consultivo VIP Sem Esteira
                  </h4>
                  <p className="text-xs sm:text-sm text-[#574F4A] font-sans leading-relaxed mt-1">
                    Agenda planejada com calma e dedicação exclusiva para diagnóstico e execução sem pressa.
                  </p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FAF3F0] border border-[#C5A880]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1C1917]">
                    Fios 100% Humanos de Cutícula Intacta
                  </h4>
                  <p className="text-xs sm:text-sm text-[#574F4A] font-sans leading-relaxed mt-1">
                    Trabalho exclusivo com cabelos brasileiros virgens de alta pureza, alinhados na mesma direção.
                  </p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FAF3F0] border border-[#C5A880]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1C1917]">
                    Biossegurança Hospitalar Mecha a Mecha
                  </h4>
                  <p className="text-xs sm:text-sm text-[#574F4A] font-sans leading-relaxed mt-1">
                    Autoclave médica, materiais esterilizados e cosmecêuticos que preservam a integridade da pele e raiz.
                  </p>
                </div>
              </div>
            </div>

            {/* Chamada para Ação */}
            <div className="mt-8 pt-6 border-t border-[#E8D0C8] w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-[#574F4A] font-sans">
                Sinta a tranquilidade de ser acolhida por quem tem duas décadas de reputação consolidada.
              </p>
              <button
                type="button"
                onClick={onOpenTriage}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-[#1C1917] hover:bg-neutral-800 text-white font-sans font-semibold text-xs tracking-wide shadow-sm hover:shadow transition-all duration-200 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] cursor-pointer shrink-0"
              >
                <Calendar className="w-4 h-4 text-[#C5A880]" aria-hidden="true" />
                <span>Agendar Consulta com Dayane</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default AuthoritySection;
