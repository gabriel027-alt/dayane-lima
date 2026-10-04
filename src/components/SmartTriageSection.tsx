"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, ArrowLeft, Check, CheckCircle2, MessageCircle, RefreshCw, Scissors, Eye, HandMetal, Sun, Zap, User, Layers, HeartPulse, Moon, Waves } from "lucide-react";

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
      "Protocolos Corporais & Clareamento Íntimo",
    ],
    subQuestionLabel: "Qual o seu maior incômodo atualmente?",
    subQuestionOptions: [
      "Foliculite e pelos encravados após lâmina ou cera",
      "Manchas escuras causadas por atrito constante",
      "Desejo de praticidade e pele lisa definitiva sem dor",
    ],
  },
  {
    id: "massoterapia",
    name: "Massoterapia & Drenagem Corporal",
    tag: "Relaxamento & Detox",
    icon: HeartPulse,
    diagnosticLabel: "Qual o seu foco para o atendimento de massoterapia?",
    diagnosticOptions: [
      "Alívio de tensões, estresse acumulado e dores musculares",
      "Drenagem Linfática corporal pós-operatória ou retenção",
      "Massagem relaxante com óleos nobres e aromaterapia",
      "Combo Integrado: Relaxamento profundo + Drenagem",
    ],
    subQuestionLabel: "Preferência de atendimento na cabine privativa:",
    subQuestionOptions: [
      "Pressão suave a moderada relaxante",
      "Pressão firme com foco em pontos de tensão",
      "Foco em pernas, abdômen e redução de edema",
    ],
  },
  {
    id: "banhodelua",
    name: "Banho de Lua & Estética Corporal",
    tag: "Pele Dourada & Maciez",
    icon: Moon,
    diagnosticLabel: "Qual o seu foco para o Banho de Lua e Spa Corporal?",
    diagnosticOptions: [
      "Clareamento suave e dourado dos pelos (fórmula sem pinicar)",
      "Gomagem esfoliante corporal e renovação celular profunda",
      "Nutrição e hidratação profunda pós-sol ou pré-evento",
      "Combo VIP: Banho de Lua + Bronzeamento em Cabine",
    ],
    subQuestionLabel: "Sensibilidade da sua pele:",
    subQuestionOptions: [
      "Pele sensível (requer proteção extra prévia)",
      "Pele normal sem histórico de irritação",
      "Preparação rápida para viagem ou evento próximo",
    ],
  },
  {
    id: "realinhamento",
    name: "Realinhamento Capilar Avançado",
    tag: "Disciplina & Preservação da Fibra",
    icon: Waves,
    diagnosticLabel: "Qual o estado e textura atual do seu cabelo?",
    diagnosticOptions: [
      "Ondulado ou cacheado — desejo redução duradoura de volume e frizz",
      "Fios rebeldes, porosos e com volume descontrolado",
      "Já faço alinhamento e necessito de retoque seguro de raiz",
      "Desejo disciplina máxima com preservação absoluta da fibra",
    ],
    subQuestionLabel: "Resultado desejado para o caimento:",
    subQuestionOptions: [
      "Efeito liso natural e sedoso com balanço e movimento",
      "Apenas controle de frizz e disciplina térmica diária",
      "Brilho espelhado com teste de mecha rigoroso",
    ],
  },
  {
    id: "maosepes",
    name: "Manicure & Pedicure de Luxo (Mãos e Pés)",
    tag: "Beleza nas Mãos e Pés",
    icon: HandMetal,
    diagnosticLabel: "Qual o cuidado ungueal desejado para as mãos e pés?",
    diagnosticOptions: [
      "Manicure e Pedicure tradicional completa de alto padrão",
      "Cutilagem russa/combinada de precisão milimétrica",
      "Spa dos pés com esfoliação, massagem e nutrição",
      "Esmaltação em gel de longa duração para mãos e pés",
    ],
    subQuestionLabel: "Preferência de finalização:",
    subQuestionOptions: [
      "Nude clássico ou tons atemporais sofisticados",
      "Vermelho nobre ou tons intensos de alta cobertura",
      "Francesinha delicada com brilho espelhado",
    ],
  },
];

export function SmartTriageSection({ whatsappPhone = "5538999999999", onOpenDrawer }: SmartTriageSectionProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedProcedureIds, setSelectedProcedureIds] = useState<string[]>(["megahair"]);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<string, string>>({});
  const [subAnswers, setSubAnswers] = useState<Record<string, string>>({});
  const [clientName, setClientName] = useState<string>("");

  const toggleProcedure = (procId: string) => {
    setSelectedProcedureIds((prev) =>
      prev.includes(procId)
        ? prev.filter((id) => id !== procId)
        : [...prev, procId]
    );
  };

  const selectedProcedures = PROCEDURES.filter((p) => selectedProcedureIds.includes(p.id));

  const handleGoToStep2 = () => {
    if (selectedProcedureIds.length === 0) return;
    setStep(2);
  };

  const handleGoToStep3 = () => {
    const answeredCount = selectedProcedures.filter((p) => Boolean(diagnosticAnswers[p.id])).length;
    if (answeredCount === 0) return;
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedProcedureIds(["megahair"]);
    setDiagnosticAnswers({});
    setSubAnswers({});
    setClientName("");
  };

  const handleGenerateWhatsApp = () => {
    const namePart = clientName.trim() ? `Meu nome é *${clientName.trim()}* e preenchi` : "Preenchi";
    
    const proceduresListText = selectedProcedures
      .map((proc, index) => {
        const diag = diagnosticAnswers[proc.id];
        const sub = subAnswers[proc.id];
        const lines = [
          `✨ *${index + 1}. ${proc.name}*`,
          diag ? `   • Diagnóstico: ${diag}` : `   • Diagnóstico: Avaliação personalizada`,
          sub ? `   • Prioridade: ${sub}` : null,
        ].filter(Boolean);
        return lines.join("\n");
      })
      .join("\n\n");

    const message = [
      `Olá, equipe Dayane Lima — Ateliê Boutique! ${namePart} a *Triagem Inteligente* no site oficial:`,
      ``,
      `📋 *ESPECIALIDADES SELECIONADAS (${selectedProcedures.length}):*`,
      proceduresListText,
      ``,
      `📍 Gostaria de saber sobre a disponibilidade de horários VIP para um atendimento integrado no Ateliê do Monte Carmelo!`,
    ].join("\n");

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
            Em 3 passos rápidos, selecione um ou mais procedimentos e inicie seu atendimento exclusivo no WhatsApp.
          </p>
        </div>

        {/* Card Principal da Triagem */}
        <div className="bg-white rounded-2xl border border-[#E8D0C8] p-5 sm:p-6 shadow-md">
          
          {/* Barra de Progresso dos 3 Passos */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-sans font-bold text-[#6E501E] mb-2.5">
              <span>Passo 0{step} de 03</span>
              <span>
                {step === 1 && "Escolha das Especialidades (Múltipla Seleção)"}
                {step === 2 && "Diagnóstico Específico por Procedimento"}
                {step === 3 && "Resumo & Orçamento Integrado VIP"}
              </span>
            </div>
            <div className="w-full h-2 bg-[#FAF3F0] rounded-full overflow-hidden border border-[#E8D0C8]">
              <div 
                className="h-full bg-gradient-to-r from-[#C5A880] to-[#C58B7E] transition-all duration-500 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* ================= PASSO 1: SELEÇÃO MÚLTIPLA DE PROCEDIMENTOS ================= */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917]">
                    1. Quais procedimentos você deseja realizar no Monte Carmelo?
                  </h3>
                  <p className="text-sm text-[#44403C] font-sans mt-1">
                    Selecione uma ou mais especialidades desejadas para atendimento integrado:
                  </p>
                </div>
                <span className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FAF3F0] text-[#6E501E] border border-[#E8D0C8]">
                  <Layers className="w-3.5 h-3.5 text-[#8F6E32]" />
                  Múltipla Escolha
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PROCEDURES.map((proc) => {
                  const Icon = proc.icon;
                  const isSelected = selectedProcedureIds.includes(proc.id);
                  return (
                    <button
                      key={proc.id}
                      type="button"
                      onClick={() => toggleProcedure(proc.id)}
                      className={`text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-3.5 min-h-[64px] touch-manipulation cursor-pointer ${
                        isSelected
                          ? "bg-[#1C1917] text-white border-[#C5A880] shadow-md ring-1 ring-[#C5A880]"
                          : "bg-[#FAF3F0] text-[#1C1917] border-[#E8D0C8] hover:border-[#C5A880] hover:bg-white"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-start gap-3.5">
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
                      </div>

                      {/* Checkbox Visual com Estado Ativo */}
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-1 transition-colors ${
                        isSelected 
                          ? "bg-[#8F6E32] text-white shadow-xs" 
                          : "border-2 border-[#C5A880]/60 bg-white"
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#F0EAE1]">
                <div className="text-sm font-sans text-[#6E501E]">
                  {selectedProcedureIds.length === 0 ? (
                    <span className="text-[#944234] font-medium">Selecione ao menos 1 procedimento para prosseguir</span>
                  ) : (
                    <span className="font-semibold">
                      <strong>{selectedProcedureIds.length}</strong> {selectedProcedureIds.length === 1 ? "especialidade selecionada" : "especialidades selecionadas"}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleGoToStep2}
                  disabled={selectedProcedureIds.length === 0}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-8 rounded-full font-sans font-semibold text-sm transition-all touch-manipulation cursor-pointer ${
                    selectedProcedureIds.length > 0
                      ? "bg-[#1C1917] hover:bg-[#8F6E32] text-white shadow-md active:scale-95"
                      : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  }`}
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
                    Etapa 02 • Diagnóstico Personalizado
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917] mt-1">
                    2. Responda o diagnóstico dos procedimentos escolhidos
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-[#6E501E] hover:text-[#1C1917] shrink-0 min-h-[48px] px-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Ajustar Escolha</span>
                </button>
              </div>

              {/* Cards de Diagnóstico para cada procedimento selecionado */}
              <div className="space-y-5">
                {selectedProcedures.map((proc, index) => {
                  const Icon = proc.icon;
                  const currentDiag = diagnosticAnswers[proc.id] || "";
                  const currentSub = subAnswers[proc.id] || "";

                  return (
                    <div 
                      key={proc.id} 
                      className="p-5 sm:p-6 rounded-2xl bg-[#FAF3F0] border border-[#E8D0C8] space-y-4"
                    >
                      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#E8D0C8]">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-white border border-[#E8D0C8] flex items-center justify-center text-[#6E501E]">
                            <Icon className="w-4 h-4 text-[#8F6E32]" />
                          </div>
                          <div>
                            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#6E501E] block">
                              Especialidade {index + 1} de {selectedProcedures.length}
                            </span>
                            <h4 className="font-serif font-bold text-base text-[#1C1917]">
                              {proc.name}
                            </h4>
                          </div>
                        </div>
                        {currentDiag ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#6E501E] bg-white px-2.5 py-1 rounded-full border border-[#E8D0C8]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#8F6E32]" />
                            Respondido
                          </span>
                        ) : (
                          <span className="text-xs text-[#8F6E32] font-semibold bg-white/60 px-2.5 py-1 rounded-full">
                            Pendente
                          </span>
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-sans font-bold text-[#1C1917] mb-2.5">
                          {proc.diagnosticLabel}
                        </p>
                        <div className="space-y-2">
                          {proc.diagnosticOptions.map((opt, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => {
                                setDiagnosticAnswers((prev) => ({ ...prev, [proc.id]: opt }));
                              }}
                              className={`w-full text-left p-3.5 rounded-xl border text-sm font-sans transition-all flex items-center justify-between gap-3 min-h-[48px] touch-manipulation cursor-pointer ${
                                currentDiag === opt
                                  ? "bg-[#1C1917] text-white border-[#C5A880] shadow-xs"
                                  : "bg-white text-[#1C1917] border-[#E8D0C8] hover:border-[#C5A880]"
                              }`}
                            >
                              <span>{opt}</span>
                              {currentDiag === opt && (
                                <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Subpergunta Opcional */}
                      {proc.subQuestionLabel && proc.subQuestionOptions && (
                        <div className="pt-3 border-t border-[#E8D0C8] space-y-2.5">
                          <p className="text-xs font-sans font-bold text-[#44403C] uppercase tracking-wider">
                            {proc.subQuestionLabel}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {proc.subQuestionOptions.map((sub, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  setSubAnswers((prev) => ({ ...prev, [proc.id]: sub }));
                                }}
                                className={`text-left p-3 rounded-xl border text-xs font-sans transition-all min-h-[44px] flex items-center justify-between cursor-pointer ${
                                  currentSub === sub
                                    ? "bg-[#C58B7E] text-white border-[#C58B7E] font-semibold"
                                    : "bg-white text-[#44403C] border-[#E8D0C8] hover:border-[#C5A880]"
                                }`}
                              >
                                <span>{sub}</span>
                                {currentSub === sub && <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 ml-1" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 min-h-[48px] px-5 rounded-full border border-[#E8D0C8] hover:border-[#C5A880] text-[#1C1917] font-sans font-semibold text-sm transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>

                <button
                  type="button"
                  onClick={handleGoToStep3}
                  disabled={selectedProcedures.filter((p) => Boolean(diagnosticAnswers[p.id])).length === 0}
                  className={`inline-flex items-center gap-2 min-h-[48px] px-8 rounded-full font-sans font-semibold text-sm transition-all ${
                    selectedProcedures.filter((p) => Boolean(diagnosticAnswers[p.id])).length > 0
                      ? "bg-[#1C1917] hover:bg-[#8F6E32] text-white shadow-sm cursor-pointer"
                      : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  }`}
                >
                  <span>Continuar para Resumo</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                </button>
              </div>
            </div>
          )}

          {/* ================= PASSO 3: RESUMO INTEGRADO & ENCAMINHAMENTO ================= */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#6E501E] block">
                  Etapa Final • Qualificação Concluída
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917] mt-1">
                  3. Seu Resumo de Triagem Integrada está Pronto
                </h3>
                <p className="text-sm text-[#44403C] font-sans mt-1">
                  Ao clicar no botão abaixo, sua ficha com todas as especialidades escolhidas será enviada diretamente à recepção da Dayane Lima para priorização de agenda.
                </p>
              </div>

              {/* Card de Ficha de Diagnóstico Gerada */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF3F0] border border-[#E8D0C8] space-y-4 font-sans text-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8D0C8]">
                  <span className="font-bold text-[#1C1917] uppercase tracking-wider text-xs">
                    Ficha Diagnóstica Prévia ({selectedProcedures.length} {selectedProcedures.length === 1 ? "Especialidade" : "Especialidades"})
                  </span>
                  <span className="text-xs font-semibold text-[#6E501E] bg-white px-2.5 py-0.5 rounded-full border border-[#E8D0C8]">
                    Triagem VIP
                  </span>
                </div>

                <div className="space-y-3">
                  {selectedProcedures.map((proc, idx) => (
                    <div key={proc.id} className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#E8D0C8] space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#8F6E32]">0{idx + 1}.</span>
                        <h4 className="font-serif font-bold text-sm sm:text-base text-[#1C1917]">{proc.name}</h4>
                      </div>
                      {diagnosticAnswers[proc.id] && (
                        <p className="text-xs text-[#44403C] pl-6">
                          <strong className="text-[#1C1917]">Diagnóstico:</strong> {diagnosticAnswers[proc.id]}
                        </p>
                      )}
                      {subAnswers[proc.id] && (
                        <p className="text-xs text-[#44403C] pl-6">
                          <strong className="text-[#1C1917]">Prioridade:</strong> {subAnswers[proc.id]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
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
                  className="inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-[#6E501E] hover:text-[#1C1917] min-h-[48px] px-2 cursor-pointer"
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
