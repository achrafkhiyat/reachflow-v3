"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  establishmentType: string;
  currentVolume: string;
  mainChallenge: string;
  investmentReadiness: string;
  decisionMaker: string;
  agencyName: string;
  fullName: string;
  phone: string;
}

const steps = [
  {
    type: "choice" as const,
    key: "establishmentType" as keyof FormData,
    headline: "Quel est le type de votre établissement ?",
    options: [
      "Bureau d'orientation (Études à l'étranger)",
      "Centre de langues",
      "École de formation professionnelle / Soutien scolaire",
      "Autre",
    ],
  },
  {
    type: "choice" as const,
    key: "currentVolume" as keyof FormData,
    headline: "Où en êtes-vous aujourd'hui en termes de volume d'inscriptions ?",
    options: [
      "Nous tournons très bien (flux régulier d'inscriptions chaque mois)",
      "Nous avons des inscriptions, mais c'est irrégulier ou insuffisant",
      "Nous n'avons pas encore démarré l'activité (0 étudiant pour le moment)",
    ],
  },
  {
    type: "textarea" as const,
    key: "mainChallenge" as keyof FormData,
    headline: "Quel est le plus grand défi (ou frustration) que vous souhaitez résoudre en réservant cet appel ?",
    label: "Votre Défi Principal",
    placeholder: "Décrivez votre plus grand défi...",
  },
  {
    type: "choice" as const,
    key: "investmentReadiness" as keyof FormData,
    headline: "Mettre en place une infrastructure d'acquisition sur mesure demande un investissement. Si nous vous montrons un plan d'action clair et rentable, êtes-vous prêt à investir dans la croissance de votre établissement ?",
    options: [
      "Oui — si le retour sur investissement est logique, je suis prêt à avancer.",
      "Non — je cherche juste des astuces gratuites ou je n'ai pas de budget actuellement.",
    ],
  },
  {
    type: "choice" as const,
    key: "decisionMaker" as keyof FormData,
    headline: "Êtes-vous la personne qui prend la décision finale pour les investissements marketing ?",
    options: [
      "Je suis le décisionnaire principal (Directeur / Fondateur).",
      "Je dois prendre la décision avec mon associé / partenaire.",
    ],
  },
  {
    type: "input" as const,
    key: "agencyName" as keyof FormData,
    headline: "Quel est le nom de votre établissement ou agence ?",
    label: "Nom de l'Établissement / Agence",
    inputType: "text",
    placeholder: "Nom de votre établissement",
  },
  {
    type: "input" as const,
    key: "fullName" as keyof FormData,
    headline: "Quel est votre nom complet ?",
    label: "Nom Complet",
    inputType: "text",
    placeholder: "Votre nom complet",
  },
  {
    type: "input" as const,
    key: "phone" as keyof FormData,
    headline: "Quel est votre numéro de téléphone (WhatsApp actif) ?",
    label: "Numéro de Téléphone (WhatsApp)",
    inputType: "tel",
    placeholder: "06 XX XX XX XX",
  },
];

const DISQUALIFY_STEP = 3;
const DISQUALIFY_OPTION =
  "Non — je cherche juste des astuces gratuites ou je n'ai pas de budget actuellement.";
const totalSteps = steps.length;

export default function QualifierForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    establishmentType: "",
    currentVolume: "",
    mainChallenge: "",
    investmentReadiness: "",
    decisionMaker: "",
    agencyName: "",
    fullName: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notQualified, setNotQualified] = useState(false);
  const [notQualifiedData, setNotQualifiedData] = useState({ name: "", phone: "" });
  const [notQualifiedDone, setNotQualifiedDone] = useState(false);
  const router = useRouter();

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const isLastStep = currentStep === totalSteps - 1;

  const canProceed = () => formData[step.key].trim().length > 0;

  const handleNext = () => {
    if (!canProceed()) return;
    if (currentStep === 0 && formData.establishmentType !== "Bureau d'orientation (Études à l'étranger)") {
      setNotQualified(true);
      return;
    }
    if (currentStep === 1 && formData.currentVolume === "Nous n'avons pas encore démarré l'activité (0 étudiant pour le moment)") {
      setNotQualified(true);
      return;
    }
    if (currentStep === DISQUALIFY_STEP && formData.investmentReadiness === DISQUALIFY_OPTION) {
      setNotQualified(true);
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const payload = {
      nomEtablissement: formData.agencyName,
      nomComplet: formData.fullName,
      telephone: formData.phone,
      typeEtablissement: formData.establishmentType,
      volumeActuel: formData.currentVolume,
      defiPrincipal: formData.mainChallenge,
      pretInvestissement: formData.investmentReadiness,
      decisionnaire: formData.decisionMaker,
    };

    // Send to Google Sheets
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwPXQnSTS_fZDdfZls7wqLXYQg3KUFfwrkuvTc3Z_E7piPeDtagRnjzvIUZ_EJavtGQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
    } catch (err) {
      console.error("Sheet error:", err);
    }

    // Send to ReachFlow CRM
    try {
      const crmUrl = process.env.NEXT_PUBLIC_CRM_WEBHOOK_URL;
      const crmSecret = process.env.NEXT_PUBLIC_CRM_WEBHOOK_SECRET;
      if (crmUrl) {
        await fetch(crmUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(crmSecret ? { Authorization: `Bearer ${crmSecret}` } : {}),
          },
          body: JSON.stringify({
            name: formData.fullName,
            phone: formData.phone,
            company: formData.agencyName,
            source: "meta",
            has_booked_call: false,
            notes: [
              `Type: ${formData.establishmentType}`,
              `Volume: ${formData.currentVolume}`,
              `Défi: ${formData.mainChallenge}`,
              `Investissement: ${formData.investmentReadiness}`,
              `Décisionnaire: ${formData.decisionMaker}`,
            ].join(" | "),
          }),
        });
      }
    } catch (err) {
      console.error("CRM webhook error:", err);
    }

    try {
      sessionStorage.setItem("rf_lead_phone", formData.phone);
    } catch {}

    router.push("/thank-you");
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
          className="text-2xl md:text-4xl font-extrabold text-center"
          style={{
            marginBottom: "32px",
            background: "linear-gradient(90deg, #f97316, #fbad5e, #f97316)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer-border 3s linear infinite",
            textShadow: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Réservez votre appel diagnostic !
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
            {/* Not qualified — mini form then thank you */}
            {notQualified ? (
              notQualifiedDone ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                  style={{ padding: "24px 0" }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", marginBottom: "24px" }}
                  >
                    <svg className="w-8 h-8" style={{ color: "#10b981" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white" style={{ marginBottom: "12px" }}>
                    Merci !
                  </h3>
                  <p className="text-sm" style={{ color: "#a8a29e", lineHeight: 1.7 }}>
                    Nous avons bien reçu vos coordonnées. Notre équipe vous contactera prochainement. Bonne continuation !
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setNotQualifiedDone(true);
                  }}
                >
                  <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold mb-4">
                    Encore une étape
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-white" style={{ marginBottom: "28px" }}>
                    Laissez-nous vos coordonnées, nous reviendrons vers vous.
                  </h3>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs text-stone-400 uppercase tracking-wider font-medium" style={{ marginBottom: "8px" }}>
                        Nom Complet
                      </label>
                      <input
                        type="text"
                        required
                        autoFocus
                        value={notQualifiedData.name}
                        onChange={(e) => setNotQualifiedData({ ...notQualifiedData, name: e.target.value })}
                        placeholder="Votre nom complet"
                        className="w-full rounded-xl text-sm text-white placeholder:text-stone-600 focus:outline-none transition-all"
                        style={{ padding: "14px 16px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(249,115,22,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 uppercase tracking-wider font-medium" style={{ marginBottom: "8px" }}>
                        Numéro de Téléphone (WhatsApp)
                      </label>
                      <input
                        type="tel"
                        required
                        value={notQualifiedData.phone}
                        onChange={(e) => setNotQualifiedData({ ...notQualifiedData, phone: e.target.value })}
                        placeholder="06 XX XX XX XX"
                        className="w-full rounded-xl text-sm text-white placeholder:text-stone-600 focus:outline-none transition-all"
                        style={{ padding: "14px 16px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(249,115,22,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3" style={{ marginTop: "28px" }}>
                    <button
                      type="button"
                      onClick={() => setNotQualified(false)}
                      className="flex-1 rounded-xl text-stone-300 font-bold text-xs uppercase tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                      style={{ padding: "14px 20px", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      &larr; Précédent
                    </button>
                    <button
                      type="submit"
                      disabled={!notQualifiedData.name.trim() || !notQualifiedData.phone.trim()}
                      className="flex-1 rounded-xl text-white font-bold text-xs uppercase tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        padding: "14px 20px",
                        backgroundColor: notQualifiedData.name.trim() && notQualifiedData.phone.trim() ? "#F97316" : "rgba(249,115,22,0.3)",
                        boxShadow: notQualifiedData.name.trim() && notQualifiedData.phone.trim() ? "0 8px 30px -8px rgba(249,115,22,0.5)" : "none",
                      }}
                    >
                      Envoyer
                    </button>
                  </div>
                </motion.form>
              )
            ) : null}

            {!notQualified && (
              <AnimatePresence mode="wait">

                {/* — Choice step — */}
                {step.type === "choice" && (
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
                      {step.headline}
                    </h3>

                    <div className="flex flex-col gap-3">
                      {step.options.map((option) => {
                        const isSelected = formData[step.key] === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setFormData({ ...formData, [step.key]: option })}
                            className="w-full text-left rounded-xl transition-all duration-200 cursor-pointer"
                            style={{
                              padding: "16px 20px",
                              backgroundColor: isSelected ? "#F97316" : "rgba(255,255,255,0.05)",
                              border: isSelected ? "1px solid #F97316" : "1px solid rgba(255,255,255,0.1)",
                              color: isSelected ? "#ffffff" : "#d6d3d1",
                              fontWeight: isSelected ? 700 : 500,
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                                style={{
                                  backgroundColor: isSelected ? "rgba(255,255,255,0.2)" : "transparent",
                                  border: isSelected ? "2px solid rgba(255,255,255,0.4)" : "2px solid rgba(255,255,255,0.15)",
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
                        disabled={!canProceed()}
                        className="flex-1 rounded-xl text-white font-bold text-xs uppercase tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          padding: "14px 20px",
                          backgroundColor: canProceed() ? "#F97316" : "rgba(249,115,22,0.3)",
                          boxShadow: canProceed() ? "0 8px 30px -8px rgba(249,115,22,0.5)" : "none",
                        }}
                      >
                        Suivant &rarr;
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* — Textarea step — */}
                {step.type === "textarea" && (
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
                      {step.headline}
                    </h3>

                    <div>
                      <label className="block text-xs text-stone-400 uppercase tracking-wider font-medium" style={{ marginBottom: "8px" }}>
                        {step.label}
                      </label>
                      <textarea
                        required
                        autoFocus
                        rows={5}
                        value={formData[step.key]}
                        onChange={(e) => setFormData({ ...formData, [step.key]: e.target.value })}
                        placeholder={step.placeholder}
                        className="w-full rounded-xl text-sm text-white placeholder:text-stone-600 focus:outline-none transition-all resize-none"
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
                        type="button"
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className="flex-1 rounded-xl text-white font-bold text-xs uppercase tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          padding: "14px 20px",
                          backgroundColor: canProceed() ? "#F97316" : "rgba(249,115,22,0.3)",
                          boxShadow: canProceed() ? "0 8px 30px -8px rgba(249,115,22,0.5)" : "none",
                        }}
                      >
                        Suivant &rarr;
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* — Input step — */}
                {step.type === "input" && (
                  <motion.form
                    key={`step-${currentStep}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (isLastStep) {
                        handleSubmit();
                      } else {
                        handleNext();
                      }
                    }}
                  >
                    <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold mb-4">
                      Étape {currentStep + 1} sur {totalSteps}
                    </p>

                    <h3 className="text-lg md:text-xl font-bold text-white" style={{ marginBottom: "28px" }}>
                      {step.headline}
                    </h3>

                    <div>
                      <label className="block text-xs text-stone-400 uppercase tracking-wider font-medium" style={{ marginBottom: "8px" }}>
                        {step.label}
                      </label>
                      <input
                        type={step.inputType}
                        required
                        autoFocus
                        value={formData[step.key]}
                        onChange={(e) => setFormData({ ...formData, [step.key]: e.target.value })}
                        placeholder={step.placeholder}
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
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
