"use client";

import { motion } from "framer-motion";

const bullets = [
  "Des familles qui ont déjà le budget — pas des curieux qui demandent le prix pour partir.",
  "Un calendrier rempli d'appels qualifiés chaque semaine, sans relance manuelle.",
  "Un système qui tourne en autonomie — vous gérez les inscriptions, pas la prospection.",
];

const logos = [
  { src: "/logos/Hikma%20education.webp", alt: "Hikma Education", scale: 1 },
  { src: "/logos/International%20Pathway%20Academy.webp", alt: "International Pathway Academy", scale: 1.6 },
  { src: "/logos/TAWJIH%20BA3D%20LBAC.webp", alt: "Tawjih Ba3d Lbac", scale: 1 },
  { src: "/logos/anajah%20academy.webp", alt: "Anajah Academy", scale: 1 },
  { src: "/logos/go%20international%20education.webp", alt: "Go International Education", scale: 1.5 },
  { src: "/logos/iSTANBUL%20FOUNDATION.webp", alt: "Istanbul Foundation", scale: 1.6 },
  { src: "/logos/wonderlearn.webp", alt: "Wonderlearn", scale: 1.8 },
];

const doubled = [...logos, ...logos];

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: "#0C0A09", paddingLeft: "20px", paddingRight: "20px", paddingTop: "56px", paddingBottom: "48px" }}
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
        transition={{ duration: 0.4 }}
        className="relative z-10"
        style={{ marginBottom: "32px" }}
      >
        <img
          src="/logo.webp"
          alt="Reachflow"
          width="140"
          height="70"
          className="h-12 md:h-16 w-auto"
          fetchPriority="high"
        />
      </motion.div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative z-10"
        style={{ marginBottom: "20px" }}
      >
        <div
          className="inline-flex items-center gap-2 rounded-full"
          style={{
            padding: "5px 14px",
            backgroundColor: "rgba(249,115,22,0.08)",
            border: "1px solid rgba(249,115,22,0.2)",
            cursor: "default",
            userSelect: "none",
          }}
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#F97316" }} />
          <span className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.1em", color: "#F97316" }}>
            Bureaux d&apos;Orientation au Maroc
          </span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative z-10 w-full max-w-2xl mx-auto text-center"
        style={{ marginBottom: "16px" }}
      >
        <h1
          className="font-extrabold text-white"
          style={{ fontSize: "clamp(1.5rem, 5.5vw, 3rem)", lineHeight: 1.15 }}
        >
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
      </motion.div>

      {/* Sub-headline */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22 }}
        className="relative z-10 text-center w-full max-w-xl mx-auto"
        style={{ color: "#a8a29e", fontSize: "clamp(0.875rem, 3.5vw, 1.1rem)", lineHeight: 1.65, marginBottom: "28px" }}
      >
        Vous passez vos journées à répondre à des familles qui &quot;veulent juste se renseigner&quot;.
        Pendant ce temps, vos concurrents remplissent leur calendrier de prospects sérieux.
      </motion.p>

      {/* 3 Bullets */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 w-full"
        style={{ maxWidth: "560px", marginBottom: "32px" }}
      >
        <div
          className="rounded-2xl flex flex-col"
          style={{
            padding: "20px 24px",
            gap: "14px",
            background: "linear-gradient(to bottom, #1F1D1B, #0C0A09)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            borderLeft: "1px solid rgba(255,255,255,0.05)",
            borderRight: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.02)",
            boxShadow: "0 20px 50px -12px rgba(0,0,0,0.8), 0 0 40px -10px rgba(249,115,22,0.06)",
            cursor: "default",
            userSelect: "none",
          }}
        >
          {bullets.map((bullet, i) => (
            <div key={i} className="flex items-start" style={{ gap: "12px" }}>
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full"
                style={{
                  width: "20px",
                  height: "20px",
                  minWidth: "20px",
                  backgroundColor: "rgba(249,115,22,0.15)",
                  border: "1px solid rgba(249,115,22,0.3)",
                  marginTop: "2px",
                }}
              >
                <svg width="10" height="10" fill="none" stroke="#F97316" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p style={{ color: "#d6d3d1", fontSize: "clamp(0.8rem, 3.2vw, 0.95rem)", lineHeight: 1.6, margin: 0 }}>
                {bullet}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.a
        href="#candidature"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="relative z-10 inline-flex items-center justify-center gap-3 text-white font-bold transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer w-full"
        style={{
          maxWidth: "480px",
          padding: "18px 32px",
          backgroundColor: "#F97316",
          borderRadius: "14px",
          boxShadow: "0 8px 40px -8px rgba(249,115,22,0.6)",
          fontSize: "clamp(0.95rem, 4vw, 1.15rem)",
        }}
      >
        Je veux des prospects qualifiés
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
        </svg>
      </motion.a>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="relative z-10 text-center"
        style={{ color: "#57534e", fontSize: "11px", marginTop: "10px" }}
      >
        Appel diagnostic gratuit · 30 minutes · Sans engagement
      </motion.p>

      {/* Social Proof Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="relative z-10 w-full"
        style={{ marginTop: "40px" }}
      >
        <p
          className="text-center uppercase font-semibold"
          style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#57534e", marginBottom: "16px" }}
        >
          Ils nous font confiance
        </p>

        {/* Scrolling logos */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          {/* Left fade */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to right, #0C0A09, transparent)", zIndex: 10, pointerEvents: "none" }} />
          {/* Right fade */}
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to left, #0C0A09, transparent)", zIndex: 10, pointerEvents: "none" }} />

          <div
            style={{
              display: "flex",
              gap: "16px",
              animation: "scroll-left 22s linear infinite",
              width: "max-content",
            }}
          >
            {doubled.map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center rounded-xl"
                style={{
                  width: "130px",
                  height: "64px",
                  padding: "12px 16px",
                  background: "linear-gradient(to bottom, #1F1D1B, #0C0A09)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    opacity: 0.8,
                    transform: `scale(${logo.scale})`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
