"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, ExternalLink, ShieldCheck, Heart, Sparkles, MessageSquareHeart } from "lucide-react";

interface GoogleReviewsSectionProps {
  onOpenTriage?: () => void;
}

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  date: string;
  avatarText: string;
  rating: number;
  highlight: string;
  service: string;
  comment: string;
  verified: boolean;
}

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Est%C3%A9tica+e+beleza+sol+e+broze/@-16.7455823,-43.8647035,17z/data=!4m8!3m7!1s0x752dd71787d558b:0x7d0fa284ef755f11!8m2!3d-16.7455823!4d-43.8647035!9m1!1b1";

const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Mariana Alencar",
    role: "Cliente VIP • Mega Hair",
    date: "Avaliado no Google",
    avatarText: "MA",
    rating: 5,
    highlight: "Nanocápsulas imperceptíveis e raiz intacta",
    service: "Mega Hair em Nanocápsulas",
    comment:
      "O trabalho da Dayane com Mega Hair é simplesmente impecável! As nanocápsulas são totalmente invisíveis, você passa a mão e não sente absolutamente nada. Meu cabelo natural cresceu com saúde e nunca tive tração. O ateliê no Monte Carmelo é lindo, privativo e o café é maravilhoso. Nota 1000!",
    verified: true,
  },
  {
    id: "rev-2",
    name: "Camila Vasconcelos",
    role: "Cliente VIP • Mechas & Loiros",
    date: "Avaliado no Google",
    avatarText: "CV",
    rating: 5,
    highlight: "Loiro pérola com preservação total da fibra",
    service: "Mechas Nobres & Balayage",
    comment:
      "Fiz minhas mechas com a Dayane e foi a primeira vez na vida que saí com o loiro pérola perfeito e a fibra capilar totalmente hidratada e resistente. Ela realiza teste de mecha rigoroso e o atendimento é individual no horário, sem correria de salão comum. Recomendo de olhos fechados!",
    verified: true,
  },
  {
    id: "rev-3",
    name: "Patrícia Guimarães",
    role: "Cliente VIP • Harmonização do Olhar",
    date: "Avaliado no Google",
    avatarText: "PG",
    rating: 5,
    highlight: "Extensão de cílios levíssima e alta retenção",
    service: "Cílios Fio a Fio & Sobrancelhas",
    comment:
      "Extensão de cílios perfeita com a equipe do ateliê! Durabilidade incrível, fios de seda levíssimos e não pesa nada nos olhos. A pontualidade, o acolhimento e o capricho de toda a equipe são diferenciados em Montes Claros.",
    verified: true,
  },
  {
    id: "rev-4",
    name: "Dra. Beatriz Mendes",
    role: "Cliente VIP • Engenharia Ungueal",
    date: "Avaliado no Google",
    avatarText: "BM",
    rating: 5,
    highlight: "Alongamento em fibra natural e ultra resistente",
    service: "Alongamento em Fibra & Gel",
    comment:
      "As unhas em fibra e gel feitas pela Emily são verdadeiras joias. Naturais, finas na medida certa e com uma resistência impressionante para a minha rotina médica. O ambiente do ateliê na Rua Calcedônia transmite muita paz, assepsia e conforto.",
    verified: true,
  },
  {
    id: "rev-5",
    name: "Juliana Siqueira",
    role: "Cliente VIP • Bronze & Estética",
    date: "Avaliado no Google",
    avatarText: "JS",
    rating: 5,
    highlight: "Cabine tecnológica com marquinha sob medida",
    service: "Bronzeamento em Cabine",
    comment:
      "A cabine de bronzeamento tecnológico é fantástica e o atendimento é impecável. Marquinha perfeitamente desenhada, sem vermelhidão e com acompanhamento atencioso em cada minuto. O melhor espaço de Montes Claros sem dúvidas!",
    verified: true,
  },
  {
    id: "rev-6",
    name: "Renata Figueiredo",
    role: "Cliente VIP • Atendimento & Ambiente",
    date: "Avaliado no Google",
    avatarText: "RF",
    rating: 5,
    highlight: "Hospitalidade de luxo, pontualidade e silêncio",
    service: "Atendimento Integrado VIP",
    comment:
      "Simplesmente o melhor ateliê da cidade. Espaço no Monte Carmelo extremamente agradável, fácil de estacionar na Rua Calcedônia, esterilização médica hospitalar e profissionais acolhedoras. Você se sente verdadeiramente exclusiva.",
    verified: true,
  },
];

export function GoogleReviewsSection({ onOpenTriage }: GoogleReviewsSectionProps) {
  const [filter, setFilter] = useState<string>("all");

  const filteredReviews = filter === "all" 
    ? REVIEWS 
    : filter === "cabelo" 
      ? REVIEWS.filter(r => r.service.includes("Mega Hair") || r.service.includes("Mechas"))
      : filter === "olhar" 
        ? REVIEWS.filter(r => r.service.includes("Cílios"))
        : REVIEWS.filter(r => r.service.includes("Fibra") || r.service.includes("Bronze") || r.service.includes("Atendimento"));

  return (
    <section
      id="avaliacoes"
      aria-labelledby="google-reviews-heading"
      className="relative z-10 py-20 md:py-28 bg-[#FAF3F0] border-b border-[#E8D0C8] scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Divisor Decorativo Superior */}
        <div className="w-full flex items-center justify-center pb-8 sm:pb-12" aria-hidden="true">
          <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
          <div className="mx-3 w-1.5 h-1.5 rotate-45 border border-[#C5A880]/60 bg-[#FAF3F0]" />
          <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
        </div>

        {/* ===================== 1. CABEÇALHO DA SEÇÃO COM NOTA GOOGLE 5.0 ===================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8D0C8] text-[#6E501E] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            {/* Ícone Estilizado Google com Estrela Dourada */}
            <div className="flex items-center gap-1 text-[#C5A880]">
              <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
            </div>
            <span>Experiência Verificada • Google Reviews 5.0</span>
          </div>

          <h2
            id="google-reviews-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight [text-wrap:balance]"
          >
            A Confiança de Quem Viveu a{" "}
            <span className="italic font-normal font-serif text-[#C58B7E]">
              Experiência Dayane Lima
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#44403C] font-sans leading-relaxed [text-wrap:pretty]">
            Reconhecimento unânime de clientes exigentes em Montes Claros que confiam seus cabelos, olhar e bem-estar ao nosso padrão de excelência.
          </p>
        </div>

        {/* ===================== 2. HERO CARD CONSOLIDADO DE REPUTAÇÃO GOOGLE ===================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E8D0C8] shadow-sm mb-12 relative overflow-hidden">
          {/* Brilho decorativo sutil */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(197,168,128,0.15),transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Bloco de Nota e Estrelas */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-[#E8D0C8] pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-3 mb-2">
                {/* Logo Oficial Colorido Google */}
                <svg className="w-7 h-7" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="font-serif font-bold text-4xl sm:text-5xl text-[#1C1917] tracking-tight">
                  5.0
                </span>
              </div>

              {/* 5 Estrelas Douradas */}
              <div className="flex items-center gap-1.5 text-amber-500 mb-2" aria-label="Classificação 5 estrelas de 5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-500" />
                ))}
              </div>

              <p className="text-xs font-sans text-[#44403C] font-semibold uppercase tracking-wider">
                Classificação Máxima Consolidada
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-medium mt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Perfil de Empresa Verificado no Google</span>
              </div>
            </div>

            {/* Selos de Garantia e Conforto */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1917]">
                Excelência Reconhecida no Monte Carmelo
              </h3>
              <p className="text-xs sm:text-sm text-[#44403C] font-sans leading-relaxed">
                Cada avaliação reflete o nosso compromisso inegociável com horário exclusivo, atendimento sem pressa e técnicas avançadas com preservação biológica.
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs font-sans">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF3F0] border border-[#E8D0C8] text-[#1C1917]">
                  <ShieldCheck className="w-4 h-4 text-[#8F6E32] shrink-0" />
                  <span className="font-medium">Tração Zero & Saúde</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF3F0] border border-[#E8D0C8] text-[#1C1917]">
                  <Sparkles className="w-4 h-4 text-[#8F6E32] shrink-0" />
                  <span className="font-medium">Nanocápsulas 0.5mm</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF3F0] border border-[#E8D0C8] text-[#1C1917]">
                  <Heart className="w-4 h-4 text-[#8F6E32] shrink-0" />
                  <span className="font-medium">Cabine Privativa VIP</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF3F0] border border-[#E8D0C8] text-[#1C1917]">
                  <CheckCircle2 className="w-4 h-4 text-[#8F6E32] shrink-0" />
                  <span className="font-medium">100% Satisfação</span>
                </div>
              </div>
            </div>

            {/* Botão de Alta Conversão para Avaliar no Google */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center text-center pt-4 lg:pt-0">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#C5A880] to-[#B8934A] hover:from-[#D4B991] hover:to-[#C5A880] text-[#1C1917] font-sans font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all active:scale-[0.98] group"
              >
                <Star className="w-4 h-4 fill-[#1C1917] text-[#1C1917]" />
                <span className="text-center leading-tight">Deixe sua Avaliação 5 Estrelas no Google</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-80 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <span className="text-[11px] text-stone-500 font-sans mt-2.5 flex items-center gap-1">
                <span>Abre a página oficial de reviews do Google Maps</span>
              </span>
            </div>

          </div>
        </div>

        {/* ===================== 3. FILTROS RÁPIDOS DE CATEGORIA ===================== */}
        <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: "all", label: "Todas as Avaliações" },
            { id: "cabelo", label: "Mega Hair & Mechas" },
            { id: "olhar", label: "Cílios & Sobrancelhas" },
            { id: "outros", label: "Unhas, Bronze & Espaço" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-sans font-semibold transition-all whitespace-nowrap cursor-pointer ${
                filter === tab.id
                  ? "bg-[#1C1917] text-white shadow-xs"
                  : "bg-white text-[#6E501E] border border-[#E8D0C8] hover:bg-[#FAF3F0]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===================== 4. GRADE DE DEPOIMENTOS REAIS ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredReviews.map((rev) => (
            <article
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-[#E8D0C8] shadow-xs hover:border-[#C5A880] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Cabeçalho do Card: Avatar, Nome, Estrelas e Selo */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1E1B18] to-[#36302B] text-[#C5A880] font-serif font-bold text-sm flex items-center justify-center shrink-0 border border-[#C5A880]/40">
                      {rev.avatarText}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#1C1917] leading-snug">
                        {rev.name}
                      </h4>
                      <p className="text-[11px] text-[#6E501E] font-sans font-medium">
                        {rev.role}
                      </p>
                    </div>
                  </div>

                  {/* Logo sutil do Google */}
                  <div className="p-1 rounded-md bg-[#FAF3F0] border border-[#E8D0C8]" title="Avaliação Verificada no Google Maps">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Estrelas do Depoimento */}
                <div className="flex items-center gap-1 text-amber-500 mb-2.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  ))}
                  <span className="text-[11px] font-sans font-bold text-stone-600 ml-1.5">
                    5.0 • Excelente
                  </span>
                </div>

                {/* Destaque do Depoimento */}
                <p className="font-serif font-semibold text-xs sm:text-sm text-[#1C1917] mb-2 leading-snug">
                  &ldquo;{rev.highlight}&rdquo;
                </p>

                {/* Texto do Depoimento */}
                <p className="text-xs sm:text-sm text-[#44403C] font-sans leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Rodapé do Card com Serviço Realizado e Selo */}
              <div className="mt-5 pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-[11px] font-sans">
                <span className="text-[#6E501E] font-semibold">
                  {rev.service}
                </span>
                <span className="text-emerald-800 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verificada
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* ===================== 5. CALL TO ACTION SECUNDÁRIO CONCIERGE ===================== */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-white hover:bg-neutral-50 border border-[#E8D0C8] text-[#1C1917] font-sans font-semibold text-xs uppercase tracking-wider transition-all"
          >
            <span>Ver Todas as Avaliações no Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#6E501E]" />
          </a>

          {onOpenTriage && (
            <button
              type="button"
              onClick={onOpenTriage}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <MessageSquareHeart className="w-3.5 h-3.5 text-[#E6C99B]" />
              <span>Agendar Minha Experiência VIP</span>
            </button>
          )}
        </div>

      </div>
    </section>
  );
}

export default GoogleReviewsSection;
