"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Script from "next/script";

export default function BookingAr() {
  const router = useRouter();

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.event === "calendly.event_scheduled") {
        router.push("/ar/thank-you");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

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
      <div className="relative z-10 flex-1 flex flex-col items-center px-4 md:px-8 py-12 md:py-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "32px" }}
        >
          <img
            src="/logo.png"
            alt="Reachflow"
            className="h-14 md:h-20 w-auto"
          />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center"
          style={{ marginBottom: "12px" }}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full"
            style={{
              padding: "4px 14px",
              backgroundColor: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.2)",
              marginBottom: "16px",
            }}
          >
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "#10b981" }}
            />
            <span
              className="text-xs font-semibold uppercase"
              style={{ letterSpacing: "0.15em", color: "#10b981" }}
            >
              الخطوة الأخيرة
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white" style={{ lineHeight: 1.2 }}>
            الخطوة الأخيرة:{" "}
            <span className="shimmer-text">حدّد موعد مكالمتك</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm md:text-base text-center max-w-md mx-auto"
          style={{ color: "#a8a29e", marginBottom: "32px" }}
        >
          اختر موعدًا أدناه لمكالمتك الاستراتيجية المجانية
          لمدة 30 دقيقة — مجانية 100% وبدون أي التزام.
        </motion.p>

        {/* Calendly Embed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="w-full"
          style={{ maxWidth: "700px" }}
        >
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/reachflow-ma/30min?hide_gdpr_banner=1&background_color=0c0a09&text_color=fafaf9&primary_color=f97316"
            style={{ minWidth: "320px", width: "100%", height: "900px" }}
          />
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
          &copy; {new Date().getFullYear()} Reachflow. جميع الحقوق محفوظة.
        </p>
      </footer>

      {/* Calendly widget script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </main>
  );
}
