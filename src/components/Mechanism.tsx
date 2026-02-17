"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
    label: "L'Actif",
    tag: "Vidéo",
    description:
      "Production \"Cinéma-Grade\" qui vous positionne comme l'Autorité n°1 dans votre ville.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    label: "Le Filtre",
    tag: "Web",
    description:
      "Une Page de Filtration qui rejette les leads non qualifiés avant WhatsApp.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    label: "Le Ciblage",
    tag: "Média",
    description:
      "Acquisition de Parents avec liquidité (pas d'étudiants fauchés).",
  },
];

export default function Mechanism() {
  return (
    <section className="relative overflow-hidden" style={{ paddingLeft: "32px", paddingRight: "32px", paddingTop: "55px", paddingBottom: "55px" }}>
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: "48px", textAlign: "center", maxWidth: "768px", marginLeft: "auto", marginRight: "auto" }}
      >
        <p
          className="text-xs uppercase font-semibold"
          style={{ letterSpacing: "0.2em", color: "#F97316", marginBottom: "16px" }}
        >
          Le Mécanisme
        </p>
        <h2
          className="text-2xl md:text-4xl font-extrabold text-white"
          style={{ lineHeight: 1.2 }}
        >
          Le Moteur de Filtration{" "}
          <br />
          en <span style={{ color: "#F97316" }}>3 Piliers</span>
        </h2>
      </motion.div>

      {/* Cards with connecting line */}
      <div className="relative" style={{ maxWidth: "1024px", marginLeft: "auto", marginRight: "auto" }}>
        {/* Connecting signal line (desktop only) */}
        <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-[2px] -translate-y-1/2">
          <div className="w-full h-full bg-gradient-to-r from-crimson/20 via-crimson/40 to-crimson/20 animate-[pulse-line_3s_ease-in-out_infinite]" />

          {/* Traveling data packet */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-crimson shadow-[0_0_12px_rgba(249,115,22,0.8)]"
            animate={{ left: ["0%", "100%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="rounded-2xl flex flex-col items-center text-center group transition-all duration-500"
              style={{
                padding: "32px 24px",
                background: "linear-gradient(to bottom, #1F1D1B, #0C0A09)",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                borderLeft: "1px solid rgba(255,255,255,0.05)",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                borderBottom: "1px solid rgba(255,255,255,0.02)",
                boxShadow: "0 20px 50px -12px rgba(0,0,0,1), 0 0 40px -10px rgba(249,115,22,0.1)",
              }}
            >
              {/* Icon with glow */}
              <div className="relative" style={{ marginBottom: "24px" }}>
                <div
                  className="absolute inset-0 rounded-xl blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: "rgba(249,115,22,0.1)" }}
                />
                <div
                  className="relative w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(249,115,22,0.08)",
                    border: "1px solid rgba(249,115,22,0.15)",
                    color: "#F97316",
                  }}
                >
                  {pillar.icon}
                </div>
              </div>

              {/* Label + Tag */}
              <div className="flex items-center gap-2" style={{ marginBottom: "12px" }}>
                <h3 className="text-lg font-bold text-white">
                  {pillar.label}
                </h3>
                <span
                  className="text-xs font-medium rounded-full"
                  style={{
                    padding: "2px 10px",
                    backgroundColor: "rgba(249,115,22,0.1)",
                    color: "#F97316",
                    border: "1px solid rgba(249,115,22,0.2)",
                  }}
                >
                  {pillar.tag}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: "#a8a29e" }}>
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
