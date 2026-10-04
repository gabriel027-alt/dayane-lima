"use client";

import React from "react";
import { 
  MapPin, 
  Clock, 
  Car, 
  Navigation, 
  ShieldCheck, 
  Instagram, 
  MessageCircle, 
  Coffee, 
  Wifi,
  ExternalLink
} from "lucide-react";
import { SbLogo } from "./SbLogo";

interface LocationAndFooterProps {
  onOpenTriage: () => void;
}

export function LocationAndFooter({ onOpenTriage }: LocationAndFooterProps) {
  const googleMapsUrl = "https://www.google.com/maps/place/Est%C3%A9tica+e+beleza+sol+e+broze/@-16.7227869,-43.8399458,17z/data=!3m1!4b1!4m6!3m5!1s0x754ab63ed56c501:0xbb6be6e8eee14360!8m2!3d-16.7227922!4d-43.8399455";
  const wazeUrl = "https://waze.com/ul?q=Rua%20Calcedônia,%20155%20Monte%20Carmelo%20Montes%20Claros";

  return (
    <>
      {/* ===================== SEÇÃO DE LOCALIZAÇÃO FÍSICA & ESPAÇO ===================== */}
      <section 
        id="localizacao"
        aria-labelledby="location-heading"
        className="relative z-10 py-20 md:py-28 bg-[#FAF3F0] border-b border-[#E8D0C8] scroll-mt-20 sm:scroll-mt-24"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Divisor Decorativo Superior */}
          <div className="w-full flex items-center justify-center pb-8 sm:pb-12" aria-hidden="true">
            <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
            <div className="mx-3 w-1.5 h-1.5 rotate-45 border border-[#C5A880]/60 bg-[#FAF3F0]" />
            <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Informações de Localização e Conforto */}
            <div className="lg:col-span-6 space-y-6">
              
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6E501E] font-sans">
                  Espaço Exclusivo • Monte Carmelo
                </span>
                <h2 
                  id="location-heading"
                  className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mt-1 [text-wrap:balance]"
                >
                  Localização Privilegiada no Monte Carmelo
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#44403C] font-sans leading-relaxed">
                  Ambiente discreto, climatizado e preparado para atendimentos exclusivos no Monte Carmelo.
                </p>
              </div>

              {/* Card de Endereço Físico */}
              <div className="p-5 rounded-2xl bg-white border border-[#E8D0C8] shadow-xs space-y-3 font-sans">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#C5A880]/15 text-[#6E501E] shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1C1917]">Dayane Lima — Ateliê Boutique</h3>
                    <p className="text-sm text-[#44403C] mt-0.5">
                      Rua Calcedônia, 155 – Bairro Monte Carmelo
                    </p>
                    <p className="text-sm text-[#44403C]">
                      Montes Claros – MG • CEP 39401-000
                    </p>
                  </div>
                </div>

                {/* Horários de Atendimento */}
                <div className="flex items-start gap-3 pt-3 border-t border-[#F0EAE1]">
                  <div className="p-2.5 rounded-xl bg-[#F4EFEA] text-[#44403C] shrink-0">
                    <Clock className="w-5 h-5 text-[#6E501E]" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1C1917]">Horário de Atendimento</h4>
                    <p className="text-sm text-[#44403C] mt-0.5">
                      Terça a Sexta-feira: 08:30 às 18:30
                    </p>
                    <p className="text-sm text-[#44403C]">
                      Sábado: 08:00 às 17:00 (Exclusivo com agendamento prévio)
                    </p>
                  </div>
                </div>
              </div>

              {/* Comodidades VIP */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-sans text-sm">
                <div className="p-3.5 rounded-xl bg-white border border-[#E8D0C8] shadow-xs flex items-center gap-2 text-[#292524] font-medium">
                  <Car className="w-4 h-4 text-[#8F6E32] shrink-0" aria-hidden="true" />
                  <span>Estacionamento</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#E8D0C8] shadow-xs flex items-center gap-2 text-[#292524] font-medium">
                  <Coffee className="w-4 h-4 text-[#8F6E32] shrink-0" aria-hidden="true" />
                  <span>Café & Chás</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#E8D0C8] shadow-xs flex items-center gap-2 text-[#292524] font-medium col-span-2 sm:col-span-1">
                  <Wifi className="w-4 h-4 text-[#8F6E32] shrink-0" aria-hidden="true" />
                  <span>Wi-Fi Alta Velocidade</span>
                </div>
              </div>

              {/* Botões de Rotas GPS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] px-6 py-3 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32]"
                  aria-label="Abrir rota no Google Maps para Rua Calcedônia, 155"
                >
                  <Navigation className="w-4 h-4 text-[#E6C99B]" aria-hidden="true" />
                  <span>Traçar Rota no Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/70" aria-hidden="true" />
                </a>

                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] px-6 py-3 rounded-full bg-white hover:bg-neutral-50 border border-[#E5DDD0] text-[#1C1917] font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32]"
                  aria-label="Abrir endereço no aplicativo Waze"
                >
                  <Car className="w-4 h-4 text-[#7A4237]" aria-hidden="true" />
                  <span>Navegar via Waze</span>
                </a>
              </div>

            </div>

            {/* Mapa Estilizado */}
            <div className="lg:col-span-6">
              <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-[#E5DDD0] shadow-md bg-neutral-100">
                <iframe
                  title="Localização da Estética e beleza sol e bronze - Dayane Lima no Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15916195.429868456!2d-59.9635272!3d-13.1124923!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x754ab63ed56c501%3A0xbb6be6e8eee14360!2sEst%C3%A9tica%20e%20beleza%20sol%20e%20broze!5e0!3m2!1spt-BR!2sbr!4v1791157915522!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-full grayscale-[15%] contrast-[1.05]"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===================== FOOTER INSTITUCIONAL DE ALTO PADRÃO ===================== */}
      <footer className="bg-[#1C1917] text-neutral-300 pt-16 pb-28 sm:pb-16 border-t border-neutral-800 font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
            
            {/* Coluna 1: Logotipo Oficial Dayane Lima & Propósito */}
            <div className="lg:col-span-5 space-y-4">
              <SbLogo variant="light" className="h-10 sm:h-12" />

              <p className="text-sm text-neutral-300 leading-relaxed max-w-sm pt-1">
                Duas décadas dedicadas à arte do Mega Hair invisível, mechas nobres sob medida e preservação biológica da raiz no Monte Carmelo, Montes Claros.
              </p>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://instagram.com/dayanelimaestetica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[48px] min-h-[48px] w-12 h-12 rounded-full bg-neutral-800 hover:bg-[#8F6E32] hover:text-white text-neutral-200 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32]"
                  aria-label="Perfil oficial de Dayane Lima no Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <button
                  type="button"
                  onClick={onOpenTriage}
                  className="min-w-[48px] min-h-[48px] w-12 h-12 rounded-full bg-neutral-800 hover:bg-emerald-600 hover:text-white text-neutral-200 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                  aria-label="Iniciar triagem via WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Coluna 2: Sumário Executivo de Navegação Rápida (Âncoras Diretas) */}
            <div className="lg:col-span-3 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#E6C99B]">
                Sumário do Ateliê
              </p>
              <nav aria-label="Navegação secundária do rodapé">
                <ul className="space-y-1 text-sm text-neutral-300">
                  <li>
                    <a href="#procedimentos" className="inline-flex items-center min-h-[44px] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8F6E32] rounded py-1 px-1.5 -mx-1.5">
                      Rituais de Alta Costura
                    </a>
                  </li>
                  <li>
                    <a href="#megahair" className="inline-flex items-center min-h-[44px] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8F6E32] rounded py-1 px-1.5 -mx-1.5">
                      Mega Hair & Nanocápsulas
                    </a>
                  </li>
                  <li>
                    <a href="#mechas" className="inline-flex items-center min-h-[44px] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8F6E32] rounded py-1 px-1.5 -mx-1.5">
                      Mechas & Balayage de Luxo
                    </a>
                  </li>
                  <li>
                    <a href="#autoridade" className="inline-flex items-center min-h-[44px] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8F6E32] rounded py-1 px-1.5 -mx-1.5">
                      Autoridade & 20+ Anos
                    </a>
                  </li>
                  <li>
                    <a href="#casos-clinicos" className="inline-flex items-center min-h-[44px] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8F6E32] rounded py-1 px-1.5 -mx-1.5">
                      Diagnóstico & Casos Clínicos
                    </a>
                  </li>
                  <li>
                    <a href="#avaliacoes" className="inline-flex items-center min-h-[44px] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8F6E32] rounded py-1 px-1.5 -mx-1.5">
                      Avaliações Google 5.0
                    </a>
                  </li>
                  <li>
                    <a href="#autocuidado" className="inline-flex items-center min-h-[44px] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8F6E32] rounded py-1 px-1.5 -mx-1.5">
                      Autocuidado & Spa Privativo
                    </a>
                  </li>
                  <li>
                    <a href="#triagem-inteligente" className="inline-flex items-center min-h-[44px] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8F6E32] rounded py-1 px-1.5 -mx-1.5">
                      Triagem Inteligente VIP
                    </a>
                  </li>
                  <li>
                    <a href="#localizacao" className="inline-flex items-center min-h-[44px] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8F6E32] rounded py-1 px-1.5 -mx-1.5">
                      Localização no Monte Carmelo
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Coluna 3: Conformidade e Contato Formal */}
            <div className="lg:col-span-4 space-y-2.5 text-sm text-neutral-300">
              <p className="text-xs font-bold uppercase tracking-wider text-[#E6C99B]">
                Atendimento & Biossegurança
              </p>
              <p className="text-neutral-100 font-medium">
                Rua Calcedônia, 155 – Bairro Monte Carmelo, Montes Claros - MG
              </p>
              <p className="text-neutral-300">Recepção VIP: Atendimento com hora marcada</p>
              <div className="pt-2 flex items-center gap-2 text-sm text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-[#E6C99B] shrink-0" aria-hidden="true" />
                <span>Esterilização hospitalar em autoclave médica e teste de mecha prévio.</span>
              </div>
            </div>

          </div>

          {/* Rodapé Legal & Declaração de Acessibilidade WCAG 2.2 */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-300">
            <p>
              © {new Date().getFullYear()} Dayane Lima — Ateliê Boutique • Alta Costura Capilar. Todos os direitos reservados.
            </p>

            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-[#E6C99B]">
                <span className="w-2 h-2 rounded-full bg-[#E6C99B]" />
                Conformidade WCAG 2.2 Nível AA Validada
              </span>
              <span className="text-neutral-500">•</span>
              <span>Engenharia & Design Proprietários</span>
            </div>
          </div>

          {/* Assinatura Profissional Discreta & Elegante */}
          <div className="pt-6 mt-6 border-t border-neutral-800/70 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-400">
            <span>
              Design & Web Engineering por{' '}
              <a
                href="https://www.instagram.com/gabrielp.batista_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-[#E6C99B] transition-colors font-medium underline underline-offset-4 decoration-neutral-600 hover:decoration-[#E6C99B]"
                aria-label="Perfil de Gabriel Batista — Estratégista Digital"
              >
                Gabriel Batista — Estratégista Digital (@gabrielp.batista_)
              </a>
            </span>
            <div className="flex items-center gap-3">
              <span className="text-neutral-500 text-[11px]">
                Desenvolvimento & SEO Estratégico
              </span>
              <span className="text-neutral-700">•</span>
              <a
                href="/admin"
                className="text-neutral-500 hover:text-[#E6C99B] transition-colors text-[11px] flex items-center gap-1"
                title="Gestão de Mídias e Galerias"
              >
                <span>🔒</span>
                <span>Painel</span>
              </a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}

export default LocationAndFooter;
