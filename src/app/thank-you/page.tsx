"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function ThankYou() {
  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "Lead");
    }

    try {
      sessionStorage.removeItem("rf_lead_phone");
    } catch {}
  }, []);

  return (
    <main className="relative min-h-screen bg-void overflow-x-hidden flex flex-col">
      {/* Grid Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 py-20 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "48px" }}
        >
          <img
            src="/logo.webp"
            alt="Reachflow"
            className="h-14 md:h-20 w-auto"
          />
        </motion.div>

        {/* Checkmark Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
          style={{ marginBottom: "32px" }}
        >
          <div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ backgroundColor: "rgba(16,185,129,0.2)", transform: "scale(1.5)" }}
          />
          <div
            className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "rgba(16,185,129,0.1)",
              border: "2px solid rgba(16,185,129,0.3)",
            }}
          >
            <svg
              className="w-10 h-10 md:w-12 md:h-12"
              fill="none"
              stroke="#10b981"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white"
          style={{ marginBottom: "16px", lineHeight: 1.2 }}
        >
          Appel{" "}
          <span className="shimmer-text">Confirmé !</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm md:text-lg font-medium leading-relaxed max-w-md mx-auto"
          style={{ color: "#a8a29e", marginBottom: "40px" }}
        >
          Votre appel stratégique est réservé.
          <br />
          Vérifiez votre email pour les <span style={{ color: "#10b981", fontWeight: 700 }}>détails de confirmation</span>.
        </motion.p>

      </div>

      {/* Footer */}
      <footer
        className="relative z-10"
        style={{
          padding: "32px 0",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <p style={{ fontSize: "12px", color: "#78716c" }}>
          &copy; {new Date().getFullYear()} Reachflow. Tous droits réservés.
        </p>
      </footer>
    </main>
  );
}
