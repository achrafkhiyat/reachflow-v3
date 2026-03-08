"use client";

import { motion } from "framer-motion";

const logos = [
  { src: "/logos/Hikma%20education.png", alt: "Hikma Education", scale: 1 },
  { src: "/logos/International%20Pathway%20Academy.png", alt: "International Pathway Academy", scale: 1.6 },
  { src: "/logos/TAWJIH%20BA3D%20LBAC.png", alt: "Tawjih Ba3d Lbac", scale: 1 },
  { src: "/logos/anajah%20academy.png", alt: "Anajah Academy", scale: 1 },
  { src: "/logos/go%20international%20education.png", alt: "Go International Education", scale: 1.5 },
  { src: "/logos/iSTANBUL%20FOUNDATION.png", alt: "Istanbul Foundation", scale: 1.6 },
  { src: "/logos/studyadvisor%20residency.png", alt: "Studyadvisor Residency", scale: 1 },
  { src: "/logos/studyadvisor.png", alt: "Studyadvisor", scale: 1 },
  { src: "/logos/wonderlearn.png", alt: "Wonderlearn", scale: 1.8 },
];

const doubled = [...logos, ...logos];

export default function Partners() {
  return (
    <section style={{ paddingTop: "55px", paddingBottom: "55px", overflow: "hidden" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "40px", paddingLeft: "32px", paddingRight: "32px" }}
      >
        <p
          className="text-xs uppercase font-semibold"
          style={{ letterSpacing: "0.2em", color: "#F97316", marginBottom: "12px" }}
        >
          Ils nous font confiance
        </p>
        <h2 className="text-2xl md:text-4xl font-extrabold text-white" style={{ lineHeight: 1.2 }}>
          Des bureaux qui génèrent déjà des résultats.
        </h2>
      </motion.div>

      {/* Infinite scroll strip */}
      <div style={{ position: "relative" }}>
        {/* Left fade */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to right, #0C0A09, transparent)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
        {/* Right fade */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to left, #0C0A09, transparent)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "32px",
            animation: "scroll-left 28s linear infinite",
            width: "max-content",
          }}
        >
          {doubled.map((logo: { src: string; alt: string; scale: number }, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center rounded-2xl"
              style={{
                width: "220px",
                height: "110px",
                padding: "20px 24px",
                background: "linear-gradient(to bottom, #1F1D1B, #0C0A09)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 20px -8px rgba(0,0,0,0.8)",
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  filter: "none",
                  opacity: 0.85,
                  transform: `scale(${logo.scale})`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
