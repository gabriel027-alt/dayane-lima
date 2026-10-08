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
  Sun,
  ShieldCheck,
  Waves,
  HeartPulse
} from "lucide-react";

export type ServiceCategory = 
  | "morenailuminada" 
  | "curvaturas" 
  | "cronograma" 
  | "cortes"
  | "mechas"
  | "megahair"
  | "cilios"
  | "unhas"
  | "sobrancelhas"
  | "bronze"
  | "laser"
  | "terapia"
  | "massoterapia"
  | "banhodelua"
  | "realinhamento"
  | "maosepes";

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
    id: "morenailuminada",
    title: "Morena Iluminada (Tríade Autoral)",
    subtitle: "Marrom Marcante / Acobreado, Dourado Solar no fio liso, e Cachos Mel / Caramelo.",
    tag: "Carro-Chefe",
    icon: Sparkles,
    diagnosticQuestions: [
      {
        questionLabel: "Qual nuance ou estilo da Tríade mais te encanta?",
        options: [
          "Marrom Marcante / Acobreado (Profundo e sofisticado)",
          "Dourado Solar (Luminosidade nobre e contrastes suaves)",
          "Cachos Mel / Caramelo (Definição tridimensional para curvaturas)",
          "Transformação Moça Mousse (Contour avelã e transição sem marcas)",
        ],
      },
      {
        questionLabel: "Qual o histórico químico do seu cabelo?",
        options: [
          "Natural sem química prévia",
          "Já faço mechas ou iluminação periódica",
          "Possuo coloração escura ou tonalizante",
          "Possuo progressiva ou alinhamento térmico",
        ],
      },
    ],
  },
  {
    id: "curvaturas",
    title: "Cortes Femininos & Curvaturas",
    subtitle: "Corte visagista a seco para onduladas, cacheadas e crespas com valorização da forma.",
    tag: "Visagismo Especializado",
    icon: Waves,
    diagnosticQuestions: [
      {
        questionLabel: "Qual a curvatura predominante do seu cabelo?",
        options: [
          "2A / 2B / 2C (Ondulado com ondas suaves a definidas)",
          "3A / 3B / 3C (Cacheado com molas médias a fechadas)",
          "4A / 4B / 4C (Crespo com textura densa e fator encolhimento)",
          "Liso / Em transição capilar",
        ],
      },
      {
        questionLabel: "Qual o objetivo com o corte?",
        options: [
          "Definição e distribuição harmoniosa de volume em camadas",
          "Manter comprimento eliminando pontas ressecadas",
          "Corte visagista com leveza e movimento frontal",
          "Transição capilar e corte de recuperação (Big Chop)",
        ],
      },
    ],
  },
  {
    id: "cronograma",
    title: "Cronograma Capilar & Recuperação",
    subtitle: "Regeneração da fibra, reposição de massa lipídica e rituais no lavatório spa.",
    tag: "Saúde da Fibra",
    icon: HeartPulse,
    diagnosticQuestions: [
      {
        questionLabel: "Como está o estado atual da fibra capilar?",
        options: [
          "Ressecamento e opacidade (precisa de hidratação e nutrição)",
          "Porosidade e quebra pós-química (precisa de reconstrução)",
          "Sensibilidade no couro cabeludo e fios desvitalizados",
          "Manutenção preventiva de brilho e elasticidade",
        ],
      },
      {
        questionLabel: "Qual a sua frequência de cuidados no salão?",
        options: [
          "Busco um tratamento intensivo de choque hoje",
          "Quero acompanhamento com plano de sessões de cronograma",
          "Quero tratamento de preparação para futura iluminação",
        ],
      },
    ],
  },
];

interface WhatsAppTriageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: ServiceCategory | null;
  whatsappPhone?: string; // Formato internacional: 5551999999999
}

export function WhatsAppTriageDrawer({
  isOpen,
  onClose,
  initialServiceId = null,
  whatsappPhone = "5551999999999",
}: WhatsAppTriageDrawerProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceCategory | null>(null);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<string, string>>({});
  const [clientName, setClientName] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const selectedService = SERVICE_CATALOG.find((s) => s.id === selectedServiceId) || SERVICE_CATALOG[0];

  // Inicializa com o serviço pré-selecionado se fornecido
  useEffect(() => {
    if (isOpen) {
      if (initialServiceId) {
        // Map old IDs to appropriate new ones if needed
        const mappedId: ServiceCategory = 
          initialServiceId === "mechas" || initialServiceId === "megahair" ? "morenailuminada" :
          initialServiceId === "terapia" || initialServiceId === "realinhamento" ? "cronograma" :
          SERVICE_CATALOG.some(s => s.id === initialServiceId) ? initialServiceId : "morenailuminada";
        
        setSelectedServiceId(mappedId);
        setCurrentStep(2);
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
    const serviceName = selectedService ? selectedService.title : "Avaliação Capilar";
    
    let diagText = "";
    Object.entries(diagnosticAnswers).forEach(([q, a]) => {
      diagText += `   • ${q}: ${a}\n`;
    });

    const clientIntro = clientName.trim()
      ? `Olá Fernanda Garroni! Meu nome é *${clientName.trim()}*. Fiz a triagem no seu site e gostaria de agendar uma avaliação:`
      : `Olá Fernanda Garroni! Gostaria de agendar uma avaliação no seu espaço na Av. Nonoai, 151:`;

    const notesText = additionalNotes.trim() ? `\nObservações: ${additionalNotes.trim()}\n` : "";
    const periodText = selectedPeriod ? `⏰ Preferência de horário: ${selectedPeriod}\n` : "";

    return (
      `${clientIntro}\n\n` +
      `• *Serviço de Interesse:* ${serviceName}\n` +
      (diagText ? `\nDiagnóstico Inicial:\n${diagText}` : "") +
      periodText +
      notesText +
      `\nPoderia me informar sobre os horários disponíveis na Av. Nonoai, nº 151, Sala 205 (Porto Alegre)?`
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
      role="dialog"
      aria-modal="true"
      aria-labelledby="triage-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300"
    >
      <div 
        className="fixed inset-0" 
        onClick={handleCloseAndReset} 
        aria-hidden="true" 
      />

      <div className="relative z-10 w-full max-w-lg bg-[#FAF3F0] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#E8D0C8]">
        
        {/* Top Header */}
        <div className="px-6 py-5 bg-white border-b border-[#E8D0C8] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-sans font-bold tracking-[0.16em] uppercase text-[#6E501E]">
              Fernanda Garroni • Porto Alegre / RS
            </span>
            <h2 id="triage-drawer-title" className="text-xl font-serif font-bold text-[#1C1917]">
              Agendamento de Avaliação
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCloseAndReset}
            className="p-2 rounded-full hover:bg-neutral-100 text-[#44403C] hover:text-[#1C1917] transition-colors cursor-pointer"
            aria-label="Fechar gaveta"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator */}
        <div className="px-6 py-3 bg-[#FAF3F0] border-b border-[#E8D0C8]/60 flex items-center justify-between text-xs font-semibold text-[#44403C]">
          <span className={currentStep === 1 ? "text-[#1C1917] font-bold" : ""}>
            1. Serviço
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className={currentStep === 2 ? "text-[#1C1917] font-bold" : ""}>
            2. Diagnóstico
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className={currentStep === 3 ? "text-[#1C1917] font-bold" : ""}>
            3. Finalização
          </span>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* STEP 1: Selecionar Especialidade */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-[#44403C]">
                Selecione o serviço para o qual deseja realizar a sua avaliação personalizada:
              </p>
              <div className="space-y-3">
                {SERVICE_CATALOG.map((srv) => {
                  const Icon = srv.icon;
                  const isSelected = selectedServiceId === srv.id;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => {
                        setSelectedServiceId(srv.id);
                        setCurrentStep(2);
                      }}
                      className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
                        isSelected 
                          ? "bg-white border-[#C5A880] ring-2 ring-[#C5A880]/30 shadow-sm"
                          : "bg-white border-[#E8D0C8] hover:border-[#C5A880]/70 hover:shadow-xs"
                      }`}
                    >
                      <div className="p-2.5 rounded-lg bg-[#FAF3F0] text-[#6E501E] shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-[#8F6E32]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif font-bold text-base text-[#1C1917]">
                            {srv.title}
                          </h3>
                          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#6E501E] bg-[#FAF3F0] px-2 py-0.5 rounded-full border border-[#E8D0C8]">
                            {srv.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[#44403C] mt-1 leading-relaxed">
                          {srv.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Diagnóstico Rápido */}
          {currentStep === 2 && selectedService && (
            <div className="space-y-5">
              <div className="p-3.5 rounded-xl bg-white border border-[#E8D0C8] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6E501E]">Serviço Escolhido</span>
                  <h3 className="font-serif font-bold text-[#1C1917]">{selectedService.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-[#8F6E32] font-semibold underline underline-offset-2 hover:text-[#1C1917]"
                >
                  Alterar
                </button>
              </div>

              {selectedService.diagnosticQuestions.map((q, idx) => (
                <div key={idx} className="space-y-2">
                  <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wide">
                    {q.questionLabel}
                  </label>
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = diagnosticAnswers[q.questionLabel] === opt;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => {
                            setDiagnosticAnswers((prev) => ({
                              ...prev,
                              [q.questionLabel]: opt,
                            }));
                          }}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-sans transition-all flex items-center justify-between cursor-pointer ${
                            isChosen
                              ? "bg-white border-[#C5A880] ring-1 ring-[#C5A880] font-semibold text-[#1C1917] shadow-xs"
                              : "bg-white/80 border-[#E8D0C8] hover:bg-white text-[#44403C]"
                          }`}
                        >
                          <span>{opt}</span>
                          {isChosen && <Check className="w-4 h-4 text-[#8F6E32] shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 3: Preferências de Contato */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wide mb-1">
                  Seu Nome (Opcional)
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Como você gostaria de ser chamada?"
                  className="w-full px-4 py-3 rounded-xl border border-[#E8D0C8] bg-white text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wide mb-1">
                  Melhor período para atendimento
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {["Manhã (09h - 12h)", "Tarde (13h - 17h)", "Final do Dia (17h - 19h)", "Sábado"].map((per) => (
                    <button
                      key={per}
                      type="button"
                      onClick={() => setSelectedPeriod(per)}
                      className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                        selectedPeriod === per
                          ? "bg-white border-[#C5A880] ring-1 ring-[#C5A880] font-bold text-[#1C1917]"
                          : "bg-white/80 border-[#E8D0C8] text-[#44403C] hover:bg-white"
                      }`}
                    >
                      {per}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wide mb-1">
                  Alguma dúvida ou observação especial?
                </label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Ex: Cabelo com histórico de coloração, desejo manter o comprimento, etc."
                  rows={3}
                  className="w-full p-3 rounded-xl border border-[#E8D0C8] bg-white text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              {/* Resumo da Mensagem formatada */}
              <div className="p-3.5 rounded-xl bg-white border border-[#E8D0C8] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E501E] block">
                  Prévia da Mensagem para o WhatsApp:
                </span>
                <p className="text-xs text-[#44403C] font-mono whitespace-pre-wrap bg-[#FAF3F0] p-2.5 rounded-lg border border-[#E8D0C8]/60">
                  {generateWhatsAppMessage()}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t border-[#E8D0C8] flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => (prev > 1 ? (prev - 1) as 1 | 2 : 1))}
              className="px-4 py-3 rounded-full border border-[#E8D0C8] text-[#44403C] hover:text-[#1C1917] hover:bg-[#FAF3F0] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              disabled={currentStep === 1 && !selectedServiceId}
              onClick={() => {
                if (currentStep === 1 && !selectedServiceId) {
                  setSelectedServiceId("morenailuminada");
                }
                setCurrentStep((prev) => (prev < 3 ? (prev + 1) as 2 | 3 : 3));
              }}
              className="px-6 py-3 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white text-xs font-semibold tracking-wide flex items-center gap-2 transition-all cursor-pointer ml-auto disabled:opacity-50"
            >
              <span>Avançar</span>
              <ChevronRight className="w-4 h-4 text-[#C5A880]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSendToWhatsApp}
              className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ml-auto"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar via WhatsApp</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default WhatsAppTriageDrawer;
