"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Shimmer keyword component ── */
function ShimmerWord({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="relative inline-block">
      <motion.span
        className="shimmer-text"
        initial={{ backgroundPosition: "200% center" }}
        animate={{ backgroundPosition: "-200% center" }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute right-0 bottom-0 h-[2px] rounded-full"
        style={{
          background:
            "linear-gradient(90deg, #f97316, #fbad5e, #f9c97c, #fbad5e, #f97316)",
          backgroundSize: "200% 100%",
        }}
        initial={{ width: "0%" }}
        animate={{ width: "100%", backgroundPosition: ["-100%", "100%"] }}
        transition={{
          width: { duration: 0.8, delay: delay + 0.5, ease: "easeOut" },
          backgroundPosition: {
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay,
          },
        }}
      />
    </span>
  );
}

export default function HeroAr() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  return (
    <section
      className="relative flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: "#0C0A09", paddingLeft: "32px", paddingRight: "32px", paddingTop: "80px", paddingBottom: "24px" }}
    >
      {/* ── Grid Texture Overlay ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Logo ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
        style={{ marginBottom: "40px" }}
      >
        <img
          src="/logo.png"
          alt="Reachflow"
          className="h-14 md:h-20 w-auto"
        />
      </motion.div>

      {/* ── Headline ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative z-10 max-w-5xl mx-auto text-center"
        style={{ marginBottom: "24px" }}
      >
        <h1 className="text-[1.6rem] md:text-4xl lg:text-5xl font-bold text-white leading-[1.15]">
          توقف عن إضاعة الوقت مع{" "}
          <ShimmerWord delay={0}>غير الجادين</ShimmerWord>.
          <br />
          اضمن{" "}
          <ShimmerWord delay={0.3}>100,000 درهم</ShimmerWord> شهرياً
          بجذب الآباء{" "}
          <ShimmerWord delay={0.6}>المستعدين مادياً</ShimmerWord> لتدريس
          أبنائهم في الخارج.
        </h1>
      </motion.div>

      {/* ── Sub-headline ── */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 text-xs md:text-lg text-gray-400 text-center font-bold leading-relaxed max-w-xl mx-auto"
        style={{ marginBottom: "32px" }}
      >
        نُركّب محرّك فلترة لمكاتب التوجيه في المغرب يُقصي الفضوليين تلقائيًا.
        خصّص 3 دقائق لمشاهدة هذا الفيديو: إنّه أذكى استثمار ستقوم به هذه السنة.
      </motion.p>

      {/* ── Video Container ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 w-full max-w-4xl mx-auto"
      >
        {/* "شاهد العرض" handwritten arrow */}
        <div className="absolute -top-12 -left-4 md:-left-10 hidden md:flex flex-col items-start gap-0.5 rotate-6">
          <span
            className="text-stone-500 text-sm italic"
            style={{ fontFamily: "Georgia, serif" }}
          >
            شاهد العرض
          </span>
          <svg
            className="w-7 h-9 text-stone-600"
            viewBox="0 0 32 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ transform: "scaleX(-1)" }}
          >
            <path d="M20 4c-2 6-6 14-8 22" />
            <path d="M10 22l2 5-5-1" />
          </svg>
        </div>

        {/* Video frame with animated gradient border */}
        <div
          className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black"
          style={{
            padding: "3px",
            background:
              "linear-gradient(90deg, #f97316, #fbad5e, #f9c97c, #fbad5e, #f97316, #fbad5e, #f9c97c, #fbad5e, #f97316)",
            backgroundSize: "300% 100%",
            animation: "shimmer-border 6s linear infinite",
            boxShadow:
              "0 0 80px -20px rgba(249,115,22,0.5), 0 0 30px -10px rgba(249,115,22,0.3)",
          }}
        >
        <div className="relative w-full h-full rounded-[13px] overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full"
              >
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1&controls=1"
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  title="VSL"
                />
              </motion.div>
            ) : (
              <motion.button
                key="thumbnail"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handlePlay}
                className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer bg-black group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-black/20" />
                <div className="relative z-10">
                  <div className="absolute inset-0 -m-3 rounded-full bg-orange-500/15 animate-ping" />
                  <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-md flex items-center justify-center group-hover:bg-white/[0.12] group-hover:border-white/30 group-hover:scale-110 transition-all duration-300 ease-out">
                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-white/90 ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        </div>
      </motion.div>

      {/* ── CTA Button ── */}
      <motion.a
        href="#candidature"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.85 }}
        style={{
          marginTop: "36px",
          marginBottom: "0px",
          padding: "20px 40px",
          backgroundColor: "#F97316",
          borderRadius: "16px",
          boxShadow: "0 8px 40px -8px rgba(249,115,22,0.6)",
        }}
        className="relative z-10 inline-flex items-center justify-center gap-3 text-white text-base md:text-2xl font-bold transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
      >
        احجز مكالمتك الآن
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          style={{ transform: "scaleX(-1)" }}
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </motion.a>
    </section>
  );
}
