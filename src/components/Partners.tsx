"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const logos = [
  { src: "/logos/Hikma education.png", alt: "Hikma Education" },
  { src: "/logos/International Pathway Academy.png", alt: "International Pathway Academy" },
  { src: "/logos/TAWJIH BA3D LBAC.png", alt: "Tawjih Ba3d Lbac" },
  { src: "/logos/anajah academy.png", alt: "Anajah Academy" },
  { src: "/logos/go international education.png", alt: "Go International Education" },
  { src: "/logos/iSTANBUL FOUNDATION.png", alt: "Istanbul Foundation" },
  { src: "/logos/studyadvisor residency.png", alt: "Studyadvisor Residency" },
  { src: "/logos/studyadvisor.png", alt: "Studyadvisor" },
  { src: "/logos/wonderlearn.png", alt: "Wonderlearn" },
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
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center rounded-2xl"
              style={{
                width: "160px",
                height: "80px",
                padding: "16px 20px",
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
                  filter: "brightness(0) invert(1)",
                  opacity: 0.6,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
