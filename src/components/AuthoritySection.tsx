"use client";

import React from "react";
import { ShieldCheck, Sparkles, CheckCircle2, Calendar } from "lucide-react";

interface AuthoritySectionProps {
  onOpenTriage: () => void;
}

export function AuthoritySection({ onOpenTriage }: AuthoritySectionProps) {
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
          
          {/* Coluna Visual: Foto Estática de Perfil Perfeitamente Enquadrada */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Moldura Principal com Retrato Oficial da Especialista (Exclusivo, sem cortes e sem tarjas pretas) */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#C5A880]/50 shadow-2xl bg-[#1C1917] group">
                <div className="relative w-full h-full overflow-hidden">
                  <img 
                    src="/midias/segunda-foto-perfil-dayane.jpg" 
                    alt="Dayane Lima • Especialista Titular em Alta Costura Capilar" 
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none" 
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" aria-hidden="true" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                  <p className="text-[#C5A880] text-xs font-semibold uppercase tracking-wider font-sans">Diretora Criativa & Master Educator</p>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">Dayane Lima</h3>
                  <p className="text-xs text-white/90 mt-1 font-sans">Dayane Lima — Ateliê Boutique • Montes Claros - MG</p>
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
              Em mais de vinte anos de trajetória, <strong className="text-[#1C1917] font-semibold">Dayane Lima</strong> consolidou uma autoridade que vai muito além de um único procedimento. Com rigor técnico e atendimento privativo no Monte Carmelo, sua expertise integra a alta costura em Mega Hair e mechas à harmonização do olhar, unhas em gel, bronzeamento tecnológico e estética avançada — <strong className="text-[#6E501E] font-semibold tracking-wider uppercase">E MAIS!</strong> Cada cliente encontra um santuário completo de transformação com padrão de excelência inegociável.
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
                    Biossegurança Hospitalar & Anti-Tração Folicular
                  </h4>
                  <p className="text-xs sm:text-sm text-[#574F4A] font-sans leading-relaxed mt-1">
                    Autoclave médica para esterilização de ferramentas, distribuição geométrica com peso calibrado anti-tração e preservação biológica integral do couro cabeludo.
                  </p>
                </div>
              </div>
            </div>

            {/* Chamada para Ação com Assinatura */}
            <div className="mt-8 pt-6 border-t border-[#E8D0C8] w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#1C1917] font-sans">Dayane Lima</p>
                <p className="text-[11px] text-[#574F4A] font-sans">Atendimento exclusivo com hora marcada</p>
              </div>
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
