"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const choiceSteps = [
  {
    headline: "Quel est votre volume moyen d'inscriptions mensuelles ?",
    options: [
      "Moins de 5",
      "Entre 5 et 15",
      "Entre 15 et 25",
      "Plus de 25",
    ],
  },
  {
    headline: "Combien de prospects qualifiés souhaitez-vous générer chaque mois ?",
    options: [
      "Entre 20 et 40 prospects",
      "Entre 30 et 50 prospects",
      "Entre 50 et 100 prospects",
      "Plus de 100 prospects",
    ],
  },
  {
    headline: "Quel budget mensuel pouvez-vous allouer pour garantir ces résultats (Publicités + Frais de l'agence) ?",
    options: [
      "Moins de 7 000 MAD",
      "Entre 7 000 et 15 000 MAD",
      "Entre 15 000 et 30 000 MAD",
      "Plus de 30 000 MAD",
    ],
  },
  {
    headline: "Où en est votre Bureau aujourd'hui ?",
    options: [
      "Bureau déjà bien établi (flux régulier d'étudiants)",
      "Bureau actif mais avec un flux irrégulier",
      "En phase de lancement / Pas encore de clients réguliers",
    ],
  },
  {
    headline: "Êtes-vous le seul décisionnaire pour ce type d'investissement ?",
    options: [
      "Oui, je prends la décision seul(e)",
      "Non, je dois en discuter avec un(e) associé(e)",
    ],
  },
  {
    headline: "Êtes-vous prêt à avancer et à investir dans votre croissance si notre système correspond à ce que vous cherchez ?",
    options: [
      "Oui — si c'est cohérent, je suis prêt à avancer maintenant.",
      "Non — je m'informe juste et ne souhaite pas investir pour le moment.",
    ],
  },
];

const inputSteps = [
  { key: "name" as const, headline: "Quel est votre nom complet ?", label: "Nom Complet", type: "text", placeholder: "Votre nom complet" },
  { key: "bureau" as const, headline: "Quel est le nom de votre bureau ?", label: "Nom du Bureau d'Orientation", type: "text", placeholder: "Nom de votre bureau" },
  { key: "phone" as const, headline: "Votre numéro de téléphone ?", label: "Numéro de Téléphone", type: "tel", placeholder: "06 XX XX XX XX" },
];

const totalSteps = choiceSteps.length + inputSteps.length;

export default function QualifierForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", bureau: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const progress = ((currentStep + 1) / totalSteps) * 100;
  const isChoiceStep = currentStep < choiceSteps.length;
  const inputIndex = currentStep - choiceSteps.length;
  const isLastStep = currentStep === totalSteps - 1;

  const handleNext = () => {
    if (isChoiceStep) {
      if (!selected) return;
      setSelections([...selections, selected]);
      setSelected(null);
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    if (currentStep === choiceSteps.length) {
      const prev = [...selections];
      const lastSelection = prev.pop();
      setSelections(prev);
      setSelected(lastSelection || null);
    }
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomComplet: formData.name,
          nomBureau: formData.bureau,
          telephone: formData.phone,
          inscriptions: selections[0] || "",
          objectif: selections[1] || "",
          budget: selections[2] || "",
          situation: selections[3] || "",
          decisionnaire: selections[4] || "",
          pretAInvestir: selections[5] || "",
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/booking");
        return;
      }
    } catch (err) {
      console.error("Submit error:", err);
    }

    setIsSubmitting(false);
  };

  const canProceed = () => {
    if (isChoiceStep) return !!selected;
    const step = inputSteps[inputIndex];
    return formData[step.key].trim().length > 0;
  };

  return (
    <section id="candidature" className="relative" style={{ paddingLeft: "32px", paddingRight: "32px", paddingTop: "55px", paddingBottom: "55px" }}>
      <div style={{ maxWidth: "672px", marginLeft: "auto", marginRight: "auto" }}>
        {/* Section headline - outside card */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-3xl font-extrabold text-white"
          style={{ textAlign: "center", marginBottom: "32px", whiteSpace: "nowrap" }}
        >
          Réserver mon appel diagnostic !
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(to bottom, #1F1D1B, #0C0A09)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            borderLeft: "1px solid rgba(255,255,255,0.05)",
            borderRight: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.02)",
            boxShadow: "0 20px 50px -12px rgba(0,0,0,1), 0 0 40px -10px rgba(249,115,22,0.1)",
          }}
        >
          {/* Progress bar */}
          <div className="w-full h-1" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
            <motion.div
              className="h-full"
              style={{ backgroundColor: "#F97316" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          {/* Card content */}
          <div style={{ padding: "32px 20px" }}>
            <AnimatePresence mode="wait">
              {isChoiceStep ? (
                <motion.div
                  key={`step-${currentStep}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold mb-4">
                    Étape {currentStep + 1} sur {totalSteps}
                  </p>

                  <h3 className="text-lg md:text-xl font-bold text-white" style={{ marginBottom: "28px" }}>
                    {choiceSteps[currentStep].headline}
                  </h3>

                  <div className="flex flex-col gap-3">
                    {choiceSteps[currentStep].options.map((option) => {
                      const isSelected = selected === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setSelected(option)}
                          className="w-full text-left rounded-xl transition-all duration-200 cursor-pointer"
                          style={{
                            padding: "16px 20px",
                            backgroundColor: isSelected ? "#F97316" : "rgba(255,255,255,0.05)",
                            border: isSelected
                              ? "1px solid #F97316"
                              : "1px solid rgba(255,255,255,0.1)",
                            color: isSelected ? "#ffffff" : "#d6d3d1",
                            fontWeight: isSelected ? 700 : 500,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                              style={{
                                backgroundColor: isSelected ? "rgba(255,255,255,0.2)" : "transparent",
                                border: isSelected
                                  ? "2px solid rgba(255,255,255,0.4)"
                                  : "2px solid rgba(255,255,255,0.15)",
                              }}
                            >
                              {isSelected && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                              )}
                            </div>
                            <span className="text-sm md:text-base">{option}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-3" style={{ marginTop: "24px" }}>
                    {currentStep > 0 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 rounded-xl text-stone-300 font-bold text-xs uppercase tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          padding: "14px 20px",
                          backgroundColor: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        &larr; Précédent
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!selected}
                      className="flex-1 rounded-xl text-white font-bold text-xs uppercase tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        padding: "14px 20px",
                        backgroundColor: selected ? "#F97316" : "rgba(249,115,22,0.3)",
                        boxShadow: selected ? "0 8px 30px -8px rgba(249,115,22,0.5)" : "none",
                      }}
                    >
                      Suivant &rarr;
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key={`step-${currentStep}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (isLastStep) {
                      handleSubmit(e);
                    } else {
                      handleNext();
                    }
                  }}
                >
                  <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold mb-4">
                    Étape {currentStep + 1} sur {totalSteps}
                  </p>

                  <h3 className="text-lg md:text-xl font-bold text-white" style={{ marginBottom: "28px" }}>
                    {inputSteps[inputIndex].headline}
                  </h3>

                  <div>
                    <label className="block text-xs text-stone-400 uppercase tracking-wider font-medium" style={{ marginBottom: "8px" }}>
                      {inputSteps[inputIndex].label}
                    </label>
                    <input
                      type={inputSteps[inputIndex].type}
                      required
                      autoFocus
                      value={formData[inputSteps[inputIndex].key]}
                      onChange={(e) =>
                        setFormData({ ...formData, [inputSteps[inputIndex].key]: e.target.value })
                      }
                      placeholder={inputSteps[inputIndex].placeholder}
                      className="w-full rounded-xl text-sm text-white placeholder:text-stone-600 focus:outline-none transition-all"
                      style={{
                        padding: "14px 16px",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(249,115,22,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <div className="flex gap-3" style={{ marginTop: "28px" }}>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 rounded-xl text-stone-300 font-bold text-xs uppercase tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        padding: "14px 20px",
                        backgroundColor: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      &larr; Précédent
                    </button>
                    <button
                      type="submit"
                      disabled={!canProceed() || (isLastStep && isSubmitting)}
                      className="flex-1 rounded-xl text-white font-bold text-xs uppercase tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        padding: "14px 20px",
                        backgroundColor: canProceed() ? "#F97316" : "rgba(249,115,22,0.3)",
                        boxShadow: canProceed() ? "0 8px 30px -8px rgba(249,115,22,0.5)" : "none",
                      }}
                    >
                      {isLastStep ? (
                        isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Envoi...
                          </span>
                        ) : (
                          "Réserver mon appel"
                        )
                      ) : (
                        "Suivant \u2192"
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
