"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

const destinations = [
  "France",
  "Canada",
  "Espagne",
  "Allemagne",
  "Turquie",
  "Royaume-Uni",
  "États-Unis",
  "Autre",
];

const situations = [
  { value: "volume", label: "J'ai besoin de Volume (plus de leads)" },
  { value: "quality", label: "J'ai besoin de Qualité (leads sérieux)" },
  { value: "starting", label: "Je démarre mon bureau" },
];

export default function DiagnosticForm() {
  const [formData, setFormData] = useState({
    name: "",
    agency: "",
    city: "",
    destination: "",
    situation: "",
    whatsapp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="candidature" className="relative py-16 md:py-24 px-5 md:px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-2xl p-5 md:p-8 lg:p-12 relative overflow-hidden"
        >
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-crimson/5 blur-3xl rounded-full pointer-events-none" />

          {/* Header */}
          <div className="relative text-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 border border-crimson/20 mb-4">
              <div className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
              <span className="text-xs text-crimson font-semibold uppercase tracking-wider">
                Places Limitées
              </span>
            </div>
            <h2 className="text-xl md:text-3xl font-extrabold gradient-text">
              Candidature pour Diagnostic
            </h2>
            <h3 className="text-lg md:text-2xl font-bold text-text-secondary mt-1">
              Stratégique
            </h3>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-full bg-emerald/10 border border-emerald/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Candidature Reçue
              </h3>
              <p className="text-text-secondary text-sm">
                Notre équipe vous contactera sur WhatsApp dans les 24h.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs text-text-muted uppercase tracking-wider mb-2 font-medium">
                  Nom Complet
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-base md:text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-crimson/40 focus:ring-1 focus:ring-crimson/20 transition-all"
                  placeholder="Votre nom complet"
                />
              </div>

              {/* Agency + City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-text-muted uppercase tracking-wider mb-2 font-medium">
                    Nom du Bureau
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.agency}
                    onChange={(e) =>
                      setFormData({ ...formData, agency: e.target.value })
                    }
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-base md:text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-crimson/40 focus:ring-1 focus:ring-crimson/20 transition-all"
                    placeholder="Nom de votre bureau"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-muted uppercase tracking-wider mb-2 font-medium">
                    Ville
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-base md:text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-crimson/40 focus:ring-1 focus:ring-crimson/20 transition-all"
                    placeholder="Ex: Casablanca"
                  />
                </div>
              </div>

              {/* Destination Dropdown */}
              <div>
                <label className="block text-xs text-text-muted uppercase tracking-wider mb-2 font-medium">
                  Destination Principale
                </label>
                <select
                  required
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-base md:text-sm text-text-primary focus:outline-none focus:border-crimson/40 focus:ring-1 focus:ring-crimson/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-void text-text-muted">
                    Sélectionnez une destination
                  </option>
                  {destinations.map((d) => (
                    <option key={d} value={d} className="bg-void text-text-primary">
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Situation Radio */}
              <div>
                <label className="block text-xs text-text-muted uppercase tracking-wider mb-3 font-medium">
                  Situation Actuelle
                </label>
                <div className="space-y-2">
                  {situations.map((s) => (
                    <label
                      key={s.value}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                        formData.situation === s.value
                          ? "bg-crimson/5 border-crimson/30"
                          : "bg-white/[0.02] border-white/[0.06] hover:border-white/10"
                      }`}
                    >
                      <input
                        type="radio"
                        name="situation"
                        value={s.value}
                        checked={formData.situation === s.value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            situation: e.target.value,
                          })
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          formData.situation === s.value
                            ? "border-crimson"
                            : "border-white/20"
                        }`}
                      >
                        {formData.situation === s.value && (
                          <div className="w-2 h-2 rounded-full bg-crimson" />
                        )}
                      </div>
                      <span className="text-sm text-text-primary">
                        {s.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-xs text-text-muted uppercase tracking-wider mb-2 font-medium">
                  Numéro WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-base md:text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-crimson/40 focus:ring-1 focus:ring-crimson/20 transition-all"
                  placeholder="+212 6XX XXX XXX"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-crimson py-4 rounded-xl text-white font-bold text-sm uppercase tracking-widest mt-4 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Envoi en cours...
                  </span>
                ) : (
                  "SOUMETTRE MA CANDIDATURE"
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
