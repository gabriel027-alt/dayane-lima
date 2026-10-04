"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, MessageCircle, RefreshCw, Scissors, Eye, HandMetal, Sun, Zap, User } from "lucide-react";

interface SmartTriageSectionProps {
  whatsappPhone?: string;
  onOpenDrawer?: () => void;
}

interface ProcedureConfig {
  id: string;
  name: string;
  tag: string;
  icon: React.ElementType;
  diagnosticLabel: string;
  diagnosticOptions: string[];
  subQuestionLabel?: string;
  subQuestionOptions?: string[];
}

const PROCEDURES: ProcedureConfig[] = [
  {
    id: "megahair",
    name: "Mega Hair em Nanocápsulas & Fita",
    tag: "Alongamento & Volume",
    icon: Sparkles,
    diagnosticLabel: "Qual o comprimento e estado atual do seu cabelo?",
    diagnosticOptions: [
      "Curto (acima do ombro) — desejo alongamento total",
      "Médio (altura do busto) — desejo volume e pontas cheias",
      "Cabelo fino ou fragilizado pós-corte químico",
      "Já uso Mega Hair e busco manutenção de alto padrão",
    ],
    subQuestionLabel: "Qual a sua maior prioridade no resultado?",
    subQuestionOptions: [
      "Fixação 100% invisível para coques e rabos de cavalo",
      "Preservação biológica absoluta da raiz folicular",
      "Fios humanos brasileiros nobres com caimento sedoso",
    ],
  },
  {
    id: "mechas",
    name: "Mechas, Loiros Nobres & Morena Iluminada",
    tag: "Colorimetria & Plex",
    icon: Scissors,
    diagnosticLabel: "Qual o histórico químico do seu cabelo?",
    diagnosticOptions: [
      "Cabelo 100% natural, sem química prévia",
      "Já faço mechas ou descoloração periódica",
      "Possuo progressiva, botox ou coloração escura",
      "Pontas com quebra ou necessidade de teste de mecha",
    ],
    subQuestionLabel: "Qual nuance você deseja alcançar?",
    subQuestionOptions: [
      "Loiro Pérola / Manteiga com contraste suave",
      "Morena Iluminada em tons Avelã, Mel ou Caramelo",
      "Ruivo Nobre Acobreado com brilho espelhado",
    ],
  },
  {
    id: "olhar",
    name: "Harmonização do Olhar (Cílios & Sobrancelhas)",
    tag: "Rayssa Lash & Hillery",
    icon: Eye,
    diagnosticLabel: "Qual o procedimento do olhar você procura?",
    diagnosticOptions: [
      "Extensão de Cílios Fio a Fio clássica e leve",
      "Design Estratégico de Sobrancelhas & Visagismo Facial",
      "Brow Lamination (Alinhamento de fios naturais)",
      "Combo Completo: Cílios de Seda + Sobrancelhas",
    ],
    subQuestionLabel: "Qual efeito visual você prefere?",
    subQuestionOptions: [
      "Natural com efeito rímel de alta definição",
      "Volume marcante sem sobrecarregar os fios naturais",
      "Simetria facial com correção de falhas",
    ],
  },
  {
    id: "unhas",
    name: "Alongamento em Fibra de Vidro & Gel",
    tag: "Emily Lima Nails",
    icon: HandMetal,
    diagnosticLabel: "Qual a condição atual das suas unhas?",
    diagnosticOptions: [
      "Unhas curtas ou roídas — desejo nova aplicação em fibra",
      "Já uso alongamento e preciso de manutenção de estrutura",
      "Unhas naturais que quebram facilmente (quero blindagem)",
      "Unhas para evento especial (formato amêndoa/quadrada)",
    ],
    subQuestionLabel: "Qual estilo de acabamento você mais ama?",
    subQuestionOptions: [
      "Francesa reversa ou joia de alta durabilidade",
      "Babyboomer degradê suave e elegante",
      "Esmaltação em gel clean com brilho espelhado",
    ],
  },
  {
    id: "bronze",
    name: "Bronzeamento Tecnológico em Cabine",
    tag: "Sol & Marquinha",
    icon: Sun,
    diagnosticLabel: "Qual o seu objetivo com o bronzeamento?",
    diagnosticOptions: [
      "Marquinha de fita cirúrgica desenhada sob medida",
      "Tom dourado homogêneo para viagem ou evento próximo",
      "Manter o bronzeado radiante o ano todo sem sol forte",
      "Primeira experiência com cabine privativa climatizada",
    ],
    subQuestionLabel: "Como sua pele costuma reagir ao bronze?",
    subQuestionOptions: [
      "Pele muito clara (necessito de aceleradores suaves)",
      "Pele clara a morena (bronzeio com facilidade)",
      "Pele já bronzeada (busco intensificar e nutrir)",
    ],
  },
  {
    id: "laser",
    name: "Depilação a Laser Subzero & Estética Corporal",
    tag: "Pele Lisa & Clareamento",
    icon: Zap,
    diagnosticLabel: "Qual área corporal você deseja tratar?",
    diagnosticOptions: [
      "Pernas Completas & Coxas",
      "Axilas & Virilha Íntima (com clareamento de atrito)",
      "Buço, Queixo & Face Visagista",
      "Protocolos Corporais & Drenagem Linfática",
    ],
    subQuestionLabel: "Qual o seu maior incômodo atualmente?",
    subQuestionOptions: [
      "Foliculite e pelos encravados após lâmina ou cera",
      "Manchas escuras causadas por atrito constante",
      "Desejo de praticidade e pele lisa definitiva sem dor",
    ],
  },
];

export function SmartTriageSection({ whatsappPhone = "5538999999999", onOpenDrawer }: SmartTriageSectionProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedProcedure, setSelectedProcedure] = useState<ProcedureConfig>(PROCEDURES[0]);
  const [diagnosticAnswer, setDiagnosticAnswer] = useState<string>("");
  const [subAnswer, setSubAnswer] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");

  const handleSelectProcedure = (proc: ProcedureConfig) => {
    setSelectedProcedure(proc);
    setDiagnosticAnswer("");
    setSubAnswer("");
    setStep(2);
  };

  const handleGoToStep3 = () => {
    if (!diagnosticAnswer) return;
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setDiagnosticAnswer("");
    setSubAnswer("");
    setClientName("");
  };

  const handleGenerateWhatsApp = () => {
    const namePart = clientName.trim() ? `Meu nome é *${clientName.trim()}* e preenchi` : "Preenchi";
    
    const message = [
      `Olá, equipe Dayane Lima — Ateliê Boutique! ${namePart} a *Triagem Inteligente* no site oficial:`,
      ``,
      `✨ *Procedimento Selecionado:* ${selectedProcedure.name}`,
      `📋 *Diagnóstico Atual:* ${diagnosticAnswer || "Não informado"}`,
      subAnswer ? `🎯 *Prioridade do Resultado:* ${subAnswer}` : null,
      ``,
      `📍 Gostaria de saber sobre os horários VIP disponíveis para atendimento no Ateliê do Monte Carmelo!`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section 
      id="triagem-inteligente"
      aria-labelledby="triage-quiz-heading"
      className="relative z-10 py-20 md:py-28 bg-[#FAF3F0] border-b border-[#E8D0C8] scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Divisor Decorativo Superior */}
        <div className="w-full flex items-center justify-center pb-8 sm:pb-12" aria-hidden="true">
          <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
          <div className="mx-3 w-1.5 h-1.5 rotate-45 border border-[#C5A880]/60 bg-[#FAF3F0]" />
          <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />
        </div>

        {/* Cabeçalho da Triagem */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8D0C8] text-[#6E501E] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" aria-hidden="true" />
            <span>Qualificação Online • Atendimento VIP Dayane Lima</span>
          </div>

          <h2 
            id="triage-quiz-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight [text-wrap:balance]"
          >
            Triagem Inteligente de{" "}
            <span className="italic font-normal font-serif text-[#944234]">
              Diagnóstico Personalizado
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#44403C] font-sans leading-relaxed [text-wrap:pretty]">
            Em 3 passos rápidos, identifique o protocolo ideal e inicie seu atendimento exclusivo no WhatsApp.
          </p>
        </div>

        {/* Card Principal da Triagem */}
        <div className="bg-white rounded-2xl border border-[#E8D0C8] p-5 sm:p-6 shadow-md">
          
          {/* Barra de Progresso dos 3 Passos */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-sans font-bold text-[#6E501E] mb-2.5">
              <span>Passo 0{step} de 03</span>
              <span>
                {step === 1 && "Escolha do Procedimento"}
                {step === 2 && "Diagnóstico da Fibra ou Pele"}
                {step === 3 && "Expectativa & Direcionamento VIP"}
              </span>
            </div>
            <div className="w-full h-2 bg-[#FAF3F0] rounded-full overflow-hidden border border-[#E8D0C8]">
              <div 
                className="h-full bg-gradient-to-r from-[#C5A880] to-[#C58B7E] transition-all duration-500 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* ================= PASSO 1: SELEÇÃO DE PROCEDIMENTO ================= */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917]">
                  1. Qual procedimento você deseja realizar no Monte Carmelo?
                </h3>
                <p className="text-sm text-[#44403C] font-sans mt-1">
                  Selecione a especialidade que melhor atende o seu desejo de transformação:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PROCEDURES.map((proc) => {
                  const Icon = proc.icon;
                  const isSelected = selectedProcedure.id === proc.id;
                  return (
                    <button
                      key={proc.id}
                      type="button"
                      onClick={() => handleSelectProcedure(proc)}
                      className={`text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 min-h-[58px] touch-manipulation cursor-pointer ${
                        isSelected
                          ? "bg-[#1C1917] text-white border-[#C5A880] shadow-sm"
                          : "bg-[#FAF3F0] text-[#1C1917] border-[#E8D0C8] hover:border-[#C5A880] hover:bg-white"
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl shrink-0 ${
                        isSelected ? "bg-white/10 text-[#C5A880]" : "bg-white text-[#6E501E] border border-[#E8D0C8]"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className={`text-xs font-sans font-bold uppercase tracking-wider block ${
                          isSelected ? "text-[#C5A880]" : "text-[#6E501E]"
                        }`}>
                          {proc.tag}
                        </span>
                        <h4 className="font-serif font-bold text-sm sm:text-base leading-snug mt-0.5">
                          {proc.name}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 min-h-[48px] px-8 rounded-full bg-[#1C1917] hover:bg-neutral-800 text-white font-sans font-semibold text-sm transition-all"
                >
                  <span>Continuar para Diagnóstico</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                </button>
              </div>
            </div>
          )}

          {/* ================= PASSO 2: DIAGNÓSTICO ESPECÍFICO ================= */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#6E501E] block">
                    Procedimento: {selectedProcedure.name}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917] mt-1">
                    2. {selectedProcedure.diagnosticLabel}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-[#6E501E] hover:text-[#1C1917] shrink-0 min-h-[48px] px-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Trocar</span>
                </button>
              </div>

              {/* Opções de Diagnóstico */}
              <div className="space-y-2.5">
                {selectedProcedure.diagnosticOptions.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setDiagnosticAnswer(opt)}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-sans transition-all flex items-center justify-between gap-3 min-h-[48px] touch-manipulation cursor-pointer ${
                      diagnosticAnswer === opt
                        ? "bg-[#1C1917] text-white border-[#C5A880] shadow-sm"
                        : "bg-[#FAF3F0] text-[#1C1917] border-[#E8D0C8] hover:border-[#C5A880] hover:bg-white"
                    }`}
                  >
                    <span>{opt}</span>
                    {diagnosticAnswer === opt && (
                      <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              {/* Pergunta Secundária Opcional */}
              {selectedProcedure.subQuestionLabel && selectedProcedure.subQuestionOptions && (
                <div className="pt-4 border-t border-[#F0EAE1] space-y-3">
                  <h4 className="font-serif font-bold text-base text-[#1C1917]">
                    {selectedProcedure.subQuestionLabel}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {selectedProcedure.subQuestionOptions.map((sub, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSubAnswer(sub)}
                        className={`text-left p-3.5 rounded-xl border text-sm font-sans transition-all min-h-[48px] flex items-center justify-between ${
                          subAnswer === sub
                            ? "bg-[#C58B7E] text-white border-[#C58B7E] font-semibold"
                            : "bg-white text-[#44403C] border-[#E8D0C8] hover:border-[#C5A880]"
                        }`}
                      >
                        <span>{sub}</span>
                        {subAnswer === sub && <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 ml-1.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 min-h-[48px] px-5 rounded-full border border-[#E8D0C8] hover:border-[#C5A880] text-[#1C1917] font-sans font-semibold text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>

                <button
                  type="button"
                  onClick={handleGoToStep3}
                  disabled={!diagnosticAnswer}
                  className={`inline-flex items-center gap-2 min-h-[48px] px-8 rounded-full font-sans font-semibold text-sm transition-all ${
                    diagnosticAnswer
                      ? "bg-[#1C1917] hover:bg-neutral-800 text-white shadow-sm cursor-pointer"
                      : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  }`}
                >
                  <span>Continuar para Resumo</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                </button>
              </div>
            </div>
          )}

          {/* ================= PASSO 3: EXPECTATIVA, NOME & ENCAMINHAMENTO ================= */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#6E501E] block">
                  Etapa Final • Qualificação Concluída
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917] mt-1">
                  3. Seu Resumo de Triagem está Pronto
                </h3>
                <p className="text-sm text-[#44403C] font-sans mt-1">
                  Ao clicar no botão abaixo, sua triagem será enviada diretamente à recepção da Dayane Lima para priorização de agenda.
                </p>
              </div>

              {/* Card de Ficha de Diagnóstico Gerada */}
              <div className="p-5 rounded-2xl bg-[#FAF3F0] border border-[#E8D0C8] space-y-3 font-sans text-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8D0C8]">
                  <span className="font-bold text-[#1C1917] uppercase tracking-wider text-xs">
                    Ficha Diagnóstica Prévia
                  </span>
                  <span className="text-xs font-semibold text-[#6E501E] bg-white px-2.5 py-0.5 rounded-full border border-[#E8D0C8]">
                    Triagem VIP
                  </span>
                </div>

                <div>
                  <span className="text-xs text-[#6E501E] uppercase font-bold block">Procedimento:</span>
                  <p className="font-serif font-bold text-base text-[#1C1917]">{selectedProcedure.name}</p>
                </div>

                <div>
                  <span className="text-xs text-[#6E501E] uppercase font-bold block">Diagnóstico Atual:</span>
                  <p className="text-[#44403C] font-medium">{diagnosticAnswer}</p>
                </div>

                {subAnswer && (
                  <div>
                    <span className="text-xs text-[#6E501E] uppercase font-bold block">Prioridade:</span>
                    <p className="text-[#44403C] font-medium">{subAnswer}</p>
                  </div>
                )}
              </div>

              {/* Campo de Nome (Opcional) */}
              <div className="space-y-1.5">
                <label htmlFor="client-triage-name" className="text-sm font-sans font-bold text-[#1C1917] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#6E501E]" />
                  <span>Como podemos te chamar? (Opcional)</span>
                </label>
                <input
                  id="client-triage-name"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Seu nome ou primeiro nome..."
                  className="w-full min-h-[48px] px-4 rounded-xl border border-[#E8D0C8] bg-white text-[#1C1917] text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                />
              </div>

              {/* Botões Finais de Ação */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-[#6E501E] hover:text-[#1C1917] min-h-[48px] px-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refazer Triagem</span>
                </button>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleGenerateWhatsApp}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[50px] px-8 rounded-full bg-gradient-to-r from-[#C5A880] to-[#B8934A] hover:brightness-110 text-[#1C1917] font-sans font-bold text-sm tracking-wide shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#1C1917]" />
                    <span>Iniciar no WhatsApp com Ficha Pronta</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}

export default SmartTriageSection;
