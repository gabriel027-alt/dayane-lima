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
  const googleMapsUrl = "https://maps.google.com/?q=Rua+Calcedônia,+155+-+Monte+Carmelo,+Montes+Claros+-+MG";
  const wazeUrl = "https://waze.com/ul?q=Rua%20Calcedônia,%20155%20Monte%20Carmelo%20Montes%20Claros";

  return (
    <>
      {/* ===================== SEÇÃO DE LOCALIZAÇÃO FÍSICA & ESPAÇO ===================== */}
      <section 
        id="localizacao"
        aria-labelledby="location-heading"
        className="py-20 md:py-28 bg-[#F7EAE5] border-b border-[#E8D0C8] scroll-mt-20 sm:scroll-mt-24"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Divisor Decorativo Superior */}
          <div className="w-full flex items-center justify-center pb-8 sm:pb-12" aria-hidden="true">
            <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
            <div className="mx-3 w-1.5 h-1.5 rotate-45 border border-[#C5A880]/60 bg-[#F7EAE5]" />
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
                  Projetado para oferecer discrição, calma e conforto integral. Desfrute de um ambiente climatizado e preparado para atendimentos de alta duração como mechas e mega hair.
                </p>
              </div>

              {/* Card de Endereço Físico */}
              <div className="p-5 rounded-2xl bg-white border border-[#E8D0C8] shadow-xs space-y-3 font-sans">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#C5A880]/15 text-[#6E501E] shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1C1917]">Endereço Oficial SB Estética e Beleza</h3>
                    <p className="text-sm text-[#44403C] mt-0.5">
                      Rua Calcedônia, 155 – Bairro Monte Carmelo
                    </p>
                    <p className="text-xs text-[#574F4A]">
                      Montes Claros – MG • CEP 39401-000
                    </p>
                  </div>
                </div>

                {/* Horários de Atendimento */}
                <div className="flex items-start gap-3 pt-3 border-t border-[#F0EAE1]">
                  <div className="p-2.5 rounded-xl bg-[#F4EFEA] text-[#44403C] shrink-0">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wide text-[#1C1917]">Horário de Atendimento</h4>
                    <p className="text-xs text-[#574F4A] mt-0.5">
                      Terça a Sexta-feira: 08:30 às 18:30
                    </p>
                    <p className="text-xs text-[#574F4A]">
                      Sábado: 08:00 às 17:00 (Exclusivo com agendamento prévio)
                    </p>
                  </div>
                </div>
              </div>

              {/* Comodidades VIP */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-sans text-xs">
                <div className="p-3 rounded-xl bg-white border border-[#E8D0C8] shadow-xs flex items-center gap-2 text-[#44403C]">
                  <Car className="w-4 h-4 text-[#6E501E] shrink-0" aria-hidden="true" />
                  <span>Estacionamento</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E8D0C8] shadow-xs flex items-center gap-2 text-[#44403C]">
                  <Coffee className="w-4 h-4 text-[#6E501E] shrink-0" aria-hidden="true" />
                  <span>Café & Chás</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E8D0C8] shadow-xs flex items-center gap-2 text-[#44403C] col-span-2 sm:col-span-1">
                  <Wifi className="w-4 h-4 text-[#6E501E] shrink-0" aria-hidden="true" />
                  <span>Wi-Fi Alta Velocidade</span>
                </div>
              </div>

              {/* Botões de Rotas GPS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] px-5 py-2.5 rounded-full bg-[#1C1917] hover:bg-neutral-800 text-white font-sans font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                  aria-label="Abrir rota no Google Maps para Rua Calcedônia, 155"
                >
                  <Navigation className="w-4 h-4 text-[#C5A880]" aria-hidden="true" />
                  <span>Traçar Rota no Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/60" aria-hidden="true" />
                </a>

                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] px-5 py-2.5 rounded-full bg-white hover:bg-neutral-50 border border-[#E5DDD0] text-[#1C1917] font-sans font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                  aria-label="Abrir endereço no aplicativo Waze"
                >
                  <Car className="w-4 h-4 text-[#574F4A]" aria-hidden="true" />
                  <span>Navegar via Waze</span>
                </a>
              </div>

            </div>

            {/* Mapa Estilizado */}
            <div className="lg:col-span-6">
              <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-[#E5DDD0] shadow-md bg-neutral-100">
                <iframe
                  title="Localização do Espaço SB Estética e Beleza no Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3824.2372227188734!2d-43.8647035!3d-16.7455823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x752dd71787d558b%3A0x7d0fa284ef755f11!2sR.%20Calced%C3%B4nia%2C%20155%20-%20Monte%20Carmelo%2C%20Montes%20Claros%20-%20MG!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[25%] contrast-[1.05]"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===================== FOOTER INSTITUCIONAL DE ALTO PADRÃO ===================== */}
      <footer className="bg-[#1C1917] text-neutral-300 pt-16 pb-24 md:pb-16 border-t border-neutral-800 font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
            
            {/* Coluna 1: Logotipo Oficial SB Estética e Beleza & Propósito */}
            <div className="lg:col-span-5 space-y-4">
              <SbLogo variant="light" className="h-10 sm:h-12" />

              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm pt-1">
                Duas décadas dedicadas à arte do Mega Hair invisível, mechas de alto contraste sob medida e estética avançada no Monte Carmelo, Montes Claros.
              </p>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://instagram.com/dayanelimaestetica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[48px] min-h-[48px] w-12 h-12 rounded-full bg-neutral-800 hover:bg-[#C5A880] hover:text-[#1C1917] text-neutral-300 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                  aria-label="Perfil oficial de Dayane Lima no Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <button
                  type="button"
                  onClick={onOpenTriage}
                  className="min-w-[48px] min-h-[48px] w-12 h-12 rounded-full bg-neutral-800 hover:bg-emerald-600 hover:text-white text-neutral-300 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Iniciar triagem via WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Coluna 2: Navegação com os 7 Procedimentos Oficiais */}
            <div className="lg:col-span-3 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">
                Especialidades Oficiais
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-400">
                <li>Mega Hair em Nanocápsulas</li>
                <li>Mechas & Balayage de Luxo</li>
                <li>Extensão de Cílios Fio a Fio</li>
                <li>Design de Sobrancelhas & Visagismo</li>
                <li>Alongamento de Unhas em Gel & Fibra</li>
                <li>Bronzeamento em Cabine Tecnológica</li>
                <li>Depilação a Laser & Estética Corporal</li>
                <li>Terapias Capilares & Cronograma</li>
              </ul>
            </div>

            {/* Coluna 3: Conformidade e Contato Formal */}
            <div className="lg:col-span-4 space-y-2 text-xs text-neutral-400">
              <p className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">
                Atendimento & Segurança
              </p>
              <p className="text-neutral-200 font-medium">
                Rua Calcedônia, 155 – Bairro Monte Carmelo, Montes Claros - MG
              </p>
              <p>Recepção VIP: (38) 99999-9999 (WhatsApp)</p>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" aria-hidden="true" />
                <span>Protocolos de biossegurança e esterilização hospitalar.</span>
              </div>
            </div>

          </div>

          {/* Rodapé Legal & Declaração de Acessibilidade WCAG 2.2 */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
            <p>
              © {new Date().getFullYear()} Dayane Lima – SB Estética e Beleza. Todos os direitos reservados.
            </p>

            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-[#C5A880]">
                <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                Conformidade WCAG 2.2 Nível AA Validada
              </span>
              <span>•</span>
              <span>Engenharia & Design Proprietários</span>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}

export default LocationAndFooter;
