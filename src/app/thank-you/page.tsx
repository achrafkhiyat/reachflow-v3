"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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
            src="/logo.png"
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
          <span className="shimmer-text">Confirmé</span>
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

        {/* CTA back to home */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          <Link
            href="https://reachflow.ma"
            style={{
              padding: "3px",
              borderRadius: "16px",
              background:
                "linear-gradient(90deg, #f97316, #fbad5e, #f9c97c, #fbad5e, #f97316, #fbad5e, #f9c97c, #fbad5e, #f97316)",
              backgroundSize: "300% 100%",
              animation: "shimmer-border 6s linear infinite",
              boxShadow: "0 8px 40px -8px rgba(249,115,22,0.6)",
            }}
            className="inline-flex items-center justify-center transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span
              className="inline-flex items-center justify-center gap-3 text-white text-sm md:text-lg font-bold"
              style={{
                padding: "16px 32px",
                borderRadius: "13px",
                backgroundColor: "#F97316",
              }}
            >
              Découvrir Reachflow
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </motion.div>
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
