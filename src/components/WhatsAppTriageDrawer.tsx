"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  X, 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Check, 
  User, 
  Scissors,
  Eye,
  HandMetal,
  HelpCircle,
  Feather,
  Sun,
  HeartPulse
} from "lucide-react";

export type ServiceCategory = "megahair" | "mechas" | "cilios" | "unhas" | "sobrancelhas" | "bronze" | "laser" | "terapia";

interface ServiceOption {
  id: ServiceCategory;
  title: string;
  subtitle: string;
  tag: string;
  icon: React.ElementType;
  diagnosticQuestions: {
    questionLabel: string;
    options: string[];
  }[];
}

export const SERVICE_CATALOG: ServiceOption[] = [
  {
    id: "megahair",
    title: "Mega Hair de Alta Precisão",
    subtitle: "Nanocápsulas imperceptíveis, fita adesiva invisível e ponto americano.",
    tag: "Alto Padrão",
    icon: Sparkles,
    diagnosticQuestions: [
      {
        questionLabel: "Qual o comprimento atual do seu cabelo?",
        options: ["Curto (acima do ombro)", "Médio (altura do busto)", "Longo (já longo, busco volume)"],
      },
      {
        questionLabel: "Qual é o seu objetivo principal?",
        options: ["Alongamento total de comprimento", "Volume e densidade capilar", "Preenchimento de pontas ralas"],
      },
    ],
  },
  {
    id: "mechas",
    title: "Mechas & Loiras de Luxo",
    subtitle: "Loiro personalizado, morena iluminada e preservação total da fibra capilar.",
    tag: "Especialidade",
    icon: Scissors,
    diagnosticQuestions: [
      {
        questionLabel: "Histórico químico nos últimos 6 meses:",
        options: ["Cabelo natural sem química", "Já faço mechas/descoloração", "Possuo progressiva, botox ou coloração escura"],
      },
      {
        questionLabel: "Qual resultado você busca?",
        options: ["Loiro Claríssimo / Pérola", "Morena Iluminada Natural", "Retoque de Raiz & Correção de Cor"],
      },
    ],
  },
  {
    id: "cilios",
    title: "Extensão de Cílios de Precisão",
    subtitle: "Extensão fio a fio, volume russo, efeito molhado e isolamento milimétrico.",
    tag: "Harmonização do Olhar",
    icon: Eye,
    diagnosticQuestions: [
      {
        questionLabel: "Tipo de atendimento para Cílios:",
        options: ["Primeira aplicação / Novo set", "Manutenção periódica", "Remoção e aplicação de novo estilo"],
      },
    ],
  },
  {
    id: "sobrancelhas",
    title: "Design de Sobrancelhas & Visagismo",
    subtitle: "Alinhamento estratégico facial, tintura personalizada, brow lamination e nanopigmentação.",
    tag: "Expressão Facial",
    icon: Feather,
    diagnosticQuestions: [
      {
        questionLabel: "Qual procedimento você busca para as sobrancelhas?",
        options: ["Design Estratégico com Tintura/Henna", "Brow Lamination (Alinhamento)", "Nanopigmentação / Fio a Fio"],
      },
    ],
  },
  {
    id: "unhas",
    title: "Unhas em Fibra de Vidro & Gel",
    subtitle: "Alongamento com acabamento ultrafino, naturalidade e blindagem estruturada.",
    tag: "Durabilidade & Estética",
    icon: HandMetal,
    diagnosticQuestions: [
      {
        questionLabel: "Qual procedimento você deseja?",
        options: ["Alongamento em Fibra de Vidro (Novo)", "Manutenção de Alongamento", "Blindagem Diamante / Esmaltação em Gel"],
      },
    ],
  },
  {
    id: "bronze",
    title: "Bronzeamento Tecnológico em Cabine",
    subtitle: "Lâmpadas calibradas, marquinha milimétrica de fita cirúrgica e aceleradores.",
    tag: "Sol & Bronze",
    icon: Sun,
    diagnosticQuestions: [
      {
        questionLabel: "Qual o seu objetivo com o bronzeamento?",
        options: ["Marquinha de Fita Perfeita (Biquíni)", "Tom Dourado Homogêneo e Hidratado", "Bronze Express para Evento Próximo"],
      },
      {
        questionLabel: "Como sua pele costuma reagir ao sol?",
        options: ["Muito clara (costuma queimar)", "Clara a morena (bronzeia gradualmente)", "Morena (bronzeia facilmente)"],
      },
    ],
  },
  {
    id: "laser",
    title: "Depilação a Laser & Estética Corporal",
    subtitle: "Ponteira subzero indolor, clareamento dérmico e protocolos corporais.",
    tag: "Alta Tecnologia",
    icon: Sparkles,
    diagnosticQuestions: [
      {
        questionLabel: "Qual área corporal você deseja tratar?",
        options: ["Pernas Completas", "Axilas & Virilha Íntima", "Rosto / Buço", "Protocolos Corporais & Clareamento"],
      },
      {
        questionLabel: "Qual o seu histórico com laser ou tratamentos?",
        options: ["Primeira vez fazendo laser", "Já fiz sessões anteriormente", "Sofro com foliculite e pelos encravados"],
      },
    ],
  },
  {
    id: "terapia",
    title: "Terapias Capilares & Cronograma",
    subtitle: "Cauterizações, hidratações profundas, ozonioterapia e cronograma reconstrutor.",
    tag: "Saúde & Brilho",
    icon: HeartPulse,
    diagnosticQuestions: [
      {
        questionLabel: "Qual a necessidade principal do seu cabelo?",
        options: ["Cabelo ressecado / Necessita hidratação e brilho", "Cabelo danificado ou elástico (pós-química)", "Cronograma capilar intensivo completo"],
      },
    ],
  },
];

const PERIOD_OPTIONS = [
  { id: "manha", label: "Manhã", time: "08:00 às 12:00" },
  { id: "tarde", label: "Tarde", time: "13:00 às 18:00" },
  { id: "sabado", label: "Sábado VIP", time: "Horário sob consulta prévia" },
];

interface WhatsAppTriageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: ServiceCategory | null;
  whatsappPhone?: string; // Formato internacional: 5538999999999
}

export function WhatsAppTriageDrawer({
  isOpen,
  onClose,
  initialServiceId = null,
  whatsappPhone = "5538999999999",
}: WhatsAppTriageDrawerProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceCategory | null>(null);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<string, string>>({});
  const [clientName, setClientName] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const selectedService = SERVICE_CATALOG.find((s) => s.id === selectedServiceId);

  // Inicializa com o serviço pré-selecionado se fornecido
  useEffect(() => {
    if (isOpen) {
      if (initialServiceId) {
        setSelectedServiceId(initialServiceId);
        setCurrentStep(2); // Avança direto para o diagnóstico do serviço selecionado
      } else {
        setCurrentStep(1);
      }
    }
  }, [isOpen, initialServiceId]);

  // Acessibilidade WCAG: Fechamento com tecla ESC
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  const handleCloseAndReset = () => {
    onClose();
    setTimeout(() => {
      setCurrentStep(1);
      setSelectedServiceId(null);
      setDiagnosticAnswers({});
      setClientName("");
      setSelectedPeriod("");
      setAdditionalNotes("");
    }, 300);
  };

  const generateWhatsAppMessage = () => {
    const serviceName = selectedService ? selectedService.title : "Consulta de Procedimento";
    
    let diagText = "";
    Object.entries(diagnosticAnswers).forEach(([q, a]) => {
      diagText += `• *${q}:* ${a}\n`;
    });

    const notesText = additionalNotes.trim() ? `\n*Observações Adicionais:* ${additionalNotes.trim()}\n` : "";

    return (
      `*SOLICITAÇÃO DE AGENDAMENTO & TRIAGEM VIP*\n` +
      `*Espaço Dayane Lima – SB Estética & Beleza*\n` +
      `-----------------------------------------\n` +
      `👤 *Cliente:* ${clientName.trim() || "Não informado"}\n` +
      `✨ *Procedimento de Interesse:* ${serviceName}\n` +
      (diagText ? `\n📋 *Diagnóstico Prévio:*\n${diagText}` : "") +
      `⏰ *Período Preferencial:* ${selectedPeriod || "A combinar"}\n` +
      notesText +
      `-----------------------------------------\n` +
      `_Olá! Realizei a triagem prévia pelo site oficial e gostaria de verificar as datas disponíveis na agenda da Dayane._`
    );
  };

  const handleSendToWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encoded}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    handleCloseAndReset();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="triage-title"
    >
      <div 
        className="fixed inset-0 bg-brand-graphite-950/80 backdrop-blur-sm transition-opacity"
        onClick={handleCloseAndReset}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-brand-offwhite rounded-t-3xl md:rounded-3xl border border-brand-nude-300 shadow-drawer-up overflow-hidden z-10 [overscroll-behavior:contain]">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-nude-200 bg-brand-cream/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-champagne/20 flex items-center justify-center border border-brand-champagne/40">
              <Sparkles className="w-4 h-4 text-brand-champagne-600" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[11px] font-sans font-bold uppercase tracking-widest text-brand-champagne-dark">
                Dayane Lima • SB Estética
              </p>
              <h2 id="triage-title" className="text-base sm:text-lg font-serif font-bold text-brand-graphite-950 leading-tight">
                Triagem Prévia de Agendamento
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCloseAndReset}
            className="p-2 -mr-2 text-brand-graphite-500 hover:text-brand-graphite-950 rounded-full hover:bg-brand-nude-200/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-champagne-600"
            aria-label="Fechar janela de triagem"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Indicador de Passos */}
        <div className="px-6 py-2.5 bg-brand-nude-100/60 border-b border-brand-nude-200 flex items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-2">
            <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold ${
              currentStep >= 1 ? "bg-brand-champagne text-brand-graphite-950" : "bg-brand-nude-300 text-brand-graphite-500"
            }`}>1</span>
            <span className={currentStep === 1 ? "font-bold text-brand-graphite-900" : "text-brand-graphite-500"}>
              Procedimento
            </span>
          </div>
          <div className="w-6 h-[1px] bg-brand-nude-300" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold ${
              currentStep >= 2 ? "bg-brand-champagne text-brand-graphite-950" : "bg-brand-nude-300 text-brand-graphite-500"
            }`}>2</span>
            <span className={currentStep === 2 ? "font-bold text-brand-graphite-900" : "text-brand-graphite-500"}>
              Diagnóstico
            </span>
          </div>
          <div className="w-6 h-[1px] bg-brand-nude-300" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold ${
              currentStep >= 3 ? "bg-brand-champagne text-brand-graphite-950" : "bg-brand-nude-300 text-brand-graphite-500"
            }`}>3</span>
            <span className={currentStep === 3 ? "font-bold text-brand-graphite-900" : "text-brand-graphite-500"}>
              Finalização
            </span>
          </div>
        </div>

        {/* Corpo com Rolagem */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* ETAPA 1: Procedimento */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-graphite-950">
                  Para qual procedimento você deseja atendimento exclusivo?
                </h3>
                <p className="text-xs sm:text-sm text-brand-graphite-600 mt-1 font-sans">
                  Selecione a especialidade principal para reservar o tempo adequado de consultoria.
                </p>
              </div>

              <div className="space-y-2.5 pt-1" role="radiogroup" aria-label="Catálogo de procedimentos">
                {SERVICE_CATALOG.map((service) => {
                  const Icon = service.icon;
                  const isSelected = selectedServiceId === service.id;

                  return (
                    <button
                      key={service.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => {
                        setSelectedServiceId(service.id);
                        setDiagnosticAnswers({});
                      }}
                      className={`w-full min-h-[64px] p-4 rounded-2xl border text-left flex items-center justify-between gap-3.5 transition-all duration-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-champagne-600 ${
                        isSelected 
                          ? "bg-brand-cream border-brand-champagne shadow-sm ring-1 ring-brand-champagne" 
                          : "bg-white border-brand-nude-200 hover:border-brand-champagne/60 hover:bg-brand-nude-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-xl shrink-0 ${
                          isSelected ? "bg-brand-champagne text-brand-graphite-950" : "bg-brand-nude-100 text-brand-graphite-700"
                        }`}>
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-sans font-bold text-sm text-brand-graphite-950">
                              {service.title}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-champagne/15 text-brand-champagne-dark">
                              {service.tag}
                            </span>
                          </div>
                          <p className="text-xs text-brand-graphite-500 font-sans mt-0.5 line-clamp-1">
                            {service.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? "border-brand-champagne bg-brand-champagne text-brand-graphite-950" : "border-brand-nude-300 bg-white"
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ETAPA 2: Diagnóstico */}
          {currentStep === 2 && selectedService && (
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-champagne-dark">
                  {selectedService.title}
                </span>
                <h3 className="font-serif text-lg font-bold text-brand-graphite-950 mt-0.5">
                  Diagnóstico Técnico Pré-Atendimento
                </h3>
                <p className="text-xs sm:text-sm text-brand-graphite-600 mt-1 font-sans">
                  Permite planejar produtos, teste de mechas ou a quantidade ideal de gramas de cabelo.
                </p>
              </div>

              {selectedService.diagnosticQuestions.map((diag, idx) => (
                <div key={idx} className="space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-brand-graphite-800 font-sans">
                    {diag.questionLabel}
                  </label>
                  <div className="space-y-2">
                    {diag.options.map((opt) => {
                      const isChosen = diagnosticAnswers[diag.questionLabel] === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setDiagnosticAnswers((prev) => ({ ...prev, [diag.questionLabel]: opt }));
                          }}
                          className={`w-full min-h-touch px-4 py-2.5 rounded-xl border text-left text-xs sm:text-sm font-sans flex items-center justify-between transition-all ${
                            isChosen
                              ? "bg-brand-cream border-brand-champagne text-brand-graphite-950 font-semibold ring-1 ring-brand-champagne"
                              : "bg-white border-brand-nude-200 text-brand-graphite-700 hover:border-brand-nude-300"
                          }`}
                        >
                          <span>{opt}</span>
                          {isChosen && <Check className="w-4 h-4 text-brand-champagne-dark shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="space-y-1.5 pt-1">
                <label htmlFor="additional-notes" className="block text-xs font-semibold text-brand-graphite-700 font-sans">
                  Observações ou histórico recente adicional (Opcional):
                </label>
                <textarea
                  id="additional-notes"
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Ex: Fiz selagem há 4 meses, cabelo com pontas finas..."
                  className="w-full rounded-xl border border-brand-nude-300 bg-white p-3 text-xs sm:text-sm text-brand-graphite-900 placeholder-brand-graphite-400 focus:border-brand-champagne focus:ring-1 focus:ring-brand-champagne focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* ETAPA 3: Finalização */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-graphite-950">
                  Preferência de Horário & Contato
                </h3>
                <p className="text-xs sm:text-sm text-brand-graphite-600 mt-1 font-sans">
                  A equipe de recepção confirmará os horários exatos no WhatsApp.
                </p>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="client-name" className="block text-xs font-semibold text-brand-graphite-800 font-sans">
                  Como Dayane Lima e a equipe podem te chamar? *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-graphite-400" />
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full min-h-touch pl-10 pr-4 rounded-xl border border-brand-nude-300 bg-white text-sm text-brand-graphite-950 placeholder-brand-graphite-400 focus:border-brand-champagne focus:ring-1 focus:ring-brand-champagne focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-brand-graphite-800 font-sans">
                  Melhor período para seu atendimento: *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {PERIOD_OPTIONS.map((period) => {
                    const isSelected = selectedPeriod === period.label;
                    return (
                      <button
                        key={period.id}
                        type="button"
                        onClick={() => setSelectedPeriod(period.label)}
                        className={`min-h-touch p-3 rounded-xl border text-left sm:text-center transition-all ${
                          isSelected
                            ? "bg-brand-cream border-brand-champagne ring-1 ring-brand-champagne text-brand-graphite-950 font-semibold"
                            : "bg-white border-brand-nude-200 text-brand-graphite-700 hover:border-brand-nude-300"
                        }`}
                      >
                        <p className="text-xs sm:text-sm font-bold">{period.label}</p>
                        <p className="text-[10px] text-brand-graphite-500 mt-0.5">{period.time}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preview Transparente */}
              <div className="p-3.5 rounded-xl bg-brand-nude-100/70 border border-brand-nude-200/80">
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand-graphite-600 mb-1 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Mensagem que será enviada para a recepção:
                </p>
                <div className="bg-white p-3 rounded-lg border border-brand-nude-200 text-xs font-mono text-brand-graphite-700 whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
                  {generateWhatsAppMessage()}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Rodapé Fixo */}
        <div className="px-6 py-4 border-t border-brand-nude-200 bg-brand-cream/40 flex items-center gap-3">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => (prev - 1) as 1 | 2)}
              className="inline-flex items-center justify-center min-h-touch px-4 rounded-xl border border-brand-nude-300 bg-white text-brand-graphite-800 text-xs sm:text-sm font-semibold hover:bg-brand-nude-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-graphite-700"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar
            </button>
          )}

          {currentStep === 1 && (
            <button
              type="button"
              disabled={!selectedServiceId}
              onClick={() => setCurrentStep(2)}
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-touch px-6 rounded-xl bg-brand-champagne hover:bg-brand-champagne-400 text-brand-graphite-950 text-sm font-bold tracking-editorial shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-champagne-600"
            >
              <span>Avançar para Diagnóstico</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {currentStep === 2 && (
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-touch px-6 rounded-xl bg-brand-champagne hover:bg-brand-champagne-400 text-brand-graphite-950 text-sm font-bold tracking-editorial shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-champagne-600"
            >
              <span>Definir Horário & Finalizar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {currentStep === 3 && (
            <button
              type="button"
              disabled={!clientName.trim() || !selectedPeriod}
              onClick={handleSendToWhatsApp}
              className="flex-1 inline-flex items-center justify-center gap-2.5 min-h-touch px-6 rounded-xl bg-brand-emerald hover:bg-brand-emerald-hover text-white text-sm font-bold tracking-wide shadow-md shadow-emerald-950/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald-dark"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Enviar Triagem via WhatsApp</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default WhatsAppTriageDrawer;
