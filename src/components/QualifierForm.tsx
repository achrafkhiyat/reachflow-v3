"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    headline: "Combien d'étudiants accompagnez-vous par an ?",
    options: [
      "Moins de 50 étudiants",
      "Entre 50 et 150 étudiants",
      "Plus de 150 étudiants",
    ],
  },
  {
    headline: "Quel est votre plus gros obstacle actuel ?",
    options: [
      "Le volume (Pas assez de leads)",
      "La qualité (Étudiants sans budget)",
      "Le closing (Difficulté à convertir)",
    ],
  },
];

export default function QualifierForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 3;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (!selected) return;
    setSelections([...selections, selected]);
    setSelected(null);
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    const prev = [...selections];
    const lastSelection = prev.pop();
    setSelections(prev);
    setSelected(lastSelection || null);
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="candidature" className="relative" style={{ paddingLeft: "32px", paddingRight: "32px", paddingTop: "55px", paddingBottom: "55px" }}>
        <div style={{ maxWidth: "672px", marginLeft: "auto", marginRight: "auto" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl p-8 md:p-12 text-center"
            style={{
              background: "linear-gradient(to bottom, #1F1D1B, #0C0A09)",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              borderLeft: "1px solid rgba(255,255,255,0.05)",
              borderRight: "1px solid rgba(255,255,255,0.05)",
              borderBottom: "1px solid rgba(255,255,255,0.02)",
              boxShadow: "0 20px 50px -12px rgba(0,0,0,1), 0 0 40px -10px rgba(249,115,22,0.1)",
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <svg className="w-8 h-8" style={{ color: "#10b981" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Candidature Envoyée</h3>
            <p className="text-stone-400 text-sm">
              Notre équipe analyse votre profil. Vous serez contacté dans les 24h.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

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
              {currentStep < 2 ? (
                <motion.div
                  key={`step-${currentStep}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step indicator */}
                  <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold mb-4">
                    Étape {currentStep + 1} sur {totalSteps}
                  </p>

                  {/* Question */}
                  <h3 className="text-lg md:text-xl font-bold text-white" style={{ marginBottom: "28px" }}>
                    {steps[currentStep].headline}
                  </h3>

                  {/* Options - solid filled blocks */}
                  <div className="flex flex-col gap-3">
                    {steps[currentStep].options.map((option) => {
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

                  {/* Buttons */}
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
                  key="step-final"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                >
                  {/* Step indicator */}
                  <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold mb-4">
                    Étape {totalSteps} sur {totalSteps}
                  </p>

                  {/* Question */}
                  <h3 className="text-lg md:text-xl font-bold text-white mb-6">
                    Dernière étape...
                  </h3>

                  <div className="flex flex-col" style={{ gap: "16px" }}>
                    <div>
                      <label className="block text-xs text-stone-400 uppercase tracking-wider font-medium" style={{ marginBottom: "8px" }}>
                        Nom Complet
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Votre nom complet"
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

                    <div>
                      <label className="block text-xs text-stone-400 uppercase tracking-wider font-medium" style={{ marginBottom: "8px" }}>
                        Numéro WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+212 6XX XXX XXX"
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

                    <div>
                      <label className="block text-xs text-stone-400 uppercase tracking-wider font-medium" style={{ marginBottom: "8px" }}>
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="votre@email.com"
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
                  </div>

                  <div className="flex flex-col" style={{ marginTop: "28px", gap: "10px" }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl text-white font-bold text-sm uppercase tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        padding: "16px 24px",
                        backgroundColor: "#F97316",
                        boxShadow: "0 8px 30px -8px rgba(249,115,22,0.5)",
                      }}
                    >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      "Valider ma Candidature"
                    )}
                    </button>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-full rounded-xl text-stone-400 font-semibold text-xs uppercase tracking-wide transition-all duration-200 cursor-pointer hover:text-stone-300"
                      style={{
                        padding: "12px 20px",
                        backgroundColor: "transparent",
                      }}
                    >
                      &larr; Précédent
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
