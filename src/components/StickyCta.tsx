"use client";

import { useEffect, useState } from "react";

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById("candidature");
    if (!section) return;

    // Show button only while the quiz section is NOT in view
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99,
        padding: "12px 16px",
        background: "linear-gradient(to top, #0C0A09 60%, transparent)",
        pointerEvents: "none",
      }}
    >
      <a
        href="#candidature"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "100%",
          maxWidth: "480px",
          margin: "0 auto",
          padding: "16px 24px",
          backgroundColor: "#F97316",
          borderRadius: "14px",
          boxShadow: "0 8px 40px -8px rgba(249,115,22,0.7)",
          color: "#ffffff",
          fontWeight: 700,
          fontSize: "1rem",
          textDecoration: "none",
          pointerEvents: "auto",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
        onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Je veux des prospects qualifiés
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}
