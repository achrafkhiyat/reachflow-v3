"use client";

import { motion } from "framer-motion";

const bullets = [
  "Des familles qui ont déjà le budget — pas des curieux qui demandent le prix pour partir.",
  "Un calendrier rempli d'appels qualifiés chaque semaine, sans relance manuelle.",
  "Un système qui tourne en autonomie — vous gérez les inscriptions, pas la prospection.",
];

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: "#0C0A09", paddingLeft: "32px", paddingRight: "32px", paddingTop: "80px", paddingBottom: "64px" }}
    >
      {/* Grid Texture Overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
        style={{ marginBottom: "48px" }}
      >
        <img src="/logo.webp" alt="Reachflow" className="h-14 md:h-20 w-auto" width="160" height="80" />
      </motion.div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10"
        style={{ marginBottom: "24px" }}
      >
        <div
          className="inline-flex items-center gap-2 rounded-full"
          style={{
            padding: "5px 16px",
            backgroundColor: "rgba(249,115,22,0.08)",
            border: "1px solid rgba(249,115,22,0.2)",
          }}
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#F97316" }} />
          <span className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.15em", color: "#F97316" }}>
            Pour les Bureaux d&apos;Orientation au Maroc
          </span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 max-w-3xl mx-auto text-center"
        style={{ marginBottom: "32px" }}
      >
        <h1 className="text-[1.75rem] md:text-5xl font-extrabold text-white" style={{ lineHeight: 1.15 }}>
          Votre bureau reçoit des leads.{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #f97316, #fbad5e, #f97316)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer-border 3s linear infinite",
            }}
          >
            Mais pas les bons.
          </span>
        </h1>
        <p className="text-base md:text-xl font-medium" style={{ color: "#a8a29e", marginTop: "16px", lineHeight: 1.7 }}>
          Vous passez vos journées à répondre à des familles qui &quot;veulent juste se renseigner&quot;.
          Pendant ce temps, vos concurrents remplissent leur calendrier de prospects sérieux.
        </p>
      </motion.div>

      {/* 3 Bullets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="relative z-10 w-full"
        style={{ maxWidth: "580px", marginBottom: "40px" }}
      >
        <div
          className="rounded-2xl flex flex-col gap-4"
          style={{
            padding: "28px 32px",
            background: "linear-gradient(to bottom, #1F1D1B, #0C0A09)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            borderLeft: "1px solid rgba(255,255,255,0.05)",
            borderRight: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.02)",
            boxShadow: "0 20px 50px -12px rgba(0,0,0,1), 0 0 40px -10px rgba(249,115,22,0.08)",
          }}
        >
          {bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", marginTop: "2px" }}
              >
                <svg className="w-3 h-3" fill="none" stroke="#F97316" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm md:text-base" style={{ color: "#d6d3d1", lineHeight: 1.6 }}>
                {bullet}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.a
        href="#candidature"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          padding: "20px 48px",
          backgroundColor: "#F97316",
          borderRadius: "16px",
          boxShadow: "0 8px 40px -8px rgba(249,115,22,0.6)",
        }}
        className="relative z-10 inline-flex items-center justify-center gap-3 text-white text-base md:text-xl font-bold transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
      >
        Je veux des prospects qualifiés
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </motion.a>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.65 }}
        className="relative z-10 text-xs"
        style={{ color: "#57534e", marginTop: "12px" }}
      >
        Appel diagnostic gratuit · 30 minutes · Sans engagement
      </motion.p>
    </section>
  );
}
