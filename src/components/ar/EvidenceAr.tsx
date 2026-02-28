"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

/* ── Static waveform heights ── */
function useStaticBars(count: number) {
  return useMemo(() => {
    const heights: number[] = [];
    for (let i = 0; i < count; i++) {
      heights.push(10 + Math.random() * 38);
    }
    return heights;
  }, [count]);
}

/* ── Waveform Bar ── */
function WaveformBar({
  isPlaying,
  baseHeight,
  delay,
}: {
  isPlaying: boolean;
  baseHeight: number;
  delay: number;
}) {
  const [height, setHeight] = useState(baseHeight * 0.35);

  useEffect(() => {
    if (!isPlaying) {
      setHeight(baseHeight * 0.35);
      return;
    }
    const interval = setInterval(() => {
      setHeight(8 + Math.random() * 40);
    }, 90);
    return () => clearInterval(interval);
  }, [isPlaying, baseHeight]);

  return (
    <motion.div
      className="rounded-full origin-bottom"
      style={{ width: "4px" }}
      animate={{
        height,
        background: isPlaying
          ? "linear-gradient(to top, #ea580c, #fb923c)"
          : "rgba(255,255,255,0.1)",
      }}
      transition={{
        height: { duration: isPlaying ? 0.08 : 0.6, ease: "easeOut" },
        background: { duration: 0.3 },
        delay: delay * 0.012,
      }}
    />
  );
}

/* ── Premium Audio Card ── */
interface AudioCardProps {
  title: string;
  badge: string;
  subtitle: string;
  index: number;
  audioSrc?: string;
}

function AudioCard({ title, badge, subtitle, index, audioSrc }: AudioCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const barCount = 32;
  const barHeights = useStaticBars(barCount);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const handleLoaded = () => setDuration(audio.duration);
    const handleEnded = () => { setIsPlaying(false); setProgress(0); };
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="rounded-2xl flex flex-col"
      style={{
        padding: "28px",
        background: "linear-gradient(to bottom, #1F1D1B, #0C0A09)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        borderLeft: "1px solid rgba(255,255,255,0.05)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.02)",
        boxShadow:
          "0 20px 50px -12px rgba(0,0,0,1), 0 0 40px -10px rgba(249,115,22,0.1)",
      }}
    >
      {audioSrc && <audio ref={audioRef} src={audioSrc} preload="metadata" />}

      {/* ── Header: Name + Badge ── */}
      <div className="flex items-start justify-between" style={{ marginBottom: "24px" }}>
        <div>
          <h4 className="text-lg font-bold text-white" style={{ lineHeight: 1.3 }}>{title}</h4>
          <p className="text-xs" style={{ color: "#78716c", marginTop: "4px" }}>{subtitle}</p>
        </div>
        <span
          className="text-xs font-bold rounded-full"
          style={{
            padding: "5px 14px",
            backgroundColor: "rgba(249,115,22,0.1)",
            color: "#fb923c",
            border: "1px solid rgba(249,115,22,0.2)",
            whiteSpace: "nowrap",
          }}
        >
          {badge}
        </span>
      </div>

      {/* ── Waveform Visualizer ── */}
      <div
        className="flex items-end justify-center w-full"
        style={{
          height: "56px",
          gap: "4px",
          marginBottom: "16px",
        }}
      >
        {barHeights.map((h, i) => (
          <WaveformBar
            key={i}
            isPlaying={isPlaying}
            baseHeight={h}
            delay={i}
          />
        ))}
      </div>

      {/* ── Progress Bar ── */}
      <div
        className="w-full rounded-full overflow-hidden"
        style={{
          height: "3px",
          backgroundColor: "rgba(255,255,255,0.06)",
          marginBottom: "24px",
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(to right, #ea580c, #fb923c)" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* ── Play Button + Info ── */}
      <div className="flex items-center" style={{ gap: "16px" }}>
        {/* The HERO play button */}
        <div style={{ position: "relative" }}>
          {/* Ping ring */}
          {!isPlaying && (
            <div
              className="animate-ping"
              style={{
                position: "absolute",
                inset: "-4px",
                borderRadius: "16px",
                backgroundColor: "rgba(249,115,22,0.15)",
                pointerEvents: "none",
              }}
            />
          )}
          {/* Glow ring */}
          <div
            style={{
              position: "absolute",
              inset: "-2px",
              borderRadius: "16px",
              background: isPlaying
                ? "rgba(16,185,129,0.2)"
                : "rgba(249,115,22,0.2)",
              filter: "blur(8px)",
              pointerEvents: "none",
            }}
          />
          <button
            onClick={togglePlay}
            className="flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300"
            style={{
              position: "relative",
              width: "64px",
              height: "64px",
              backgroundColor: isPlaying ? "#10b981" : "#F97316",
              boxShadow: isPlaying
                ? "0 8px 30px -4px rgba(16,185,129,0.5)"
                : "0 8px 30px -4px rgba(249,115,22,0.5)",
            }}
          >
            {isPlaying ? (
              <svg style={{ width: "22px", height: "22px", color: "#ffffff" }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg style={{ width: "24px", height: "24px", color: "#ffffff", marginRight: "2px" }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        <div className="flex flex-col" style={{ minWidth: 0 }}>
          <span className="text-sm font-bold text-white">
            {isPlaying ? "جاري التشغيل..." : "استمع للتسجيل"}
          </span>
          <span className="text-xs font-mono" style={{ color: "#78716c", marginTop: "2px" }}>
            {duration > 0 ? formatTime(duration) : "2:34"}
          </span>
        </div>

        {/* Live indicator */}
        {isPlaying && (
          <div className="flex items-center" style={{ marginInlineStart: "auto", gap: "6px" }}>
            <div
              className="rounded-full animate-pulse"
              style={{ width: "8px", height: "8px", backgroundColor: "#10b981" }}
            />
            <span className="text-xs font-bold" style={{ color: "#10b981", letterSpacing: "0.05em" }}>LIVE</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Data ── */
const testimonials = [
  { title: "مكتب الدار البيضاء", badge: "ROI ×5", subtitle: "النتيجة بعد 30 يومًا" },
  { title: "مكتب الرباط", badge: "+300%", subtitle: "نمو ×3 في العملاء المؤهلين" },
  { title: "مكتب مراكش", badge: "ROI ×5", subtitle: "عائد الاستثمار تضاعف 5 مرات" },
  { title: "مكتب طنجة", badge: "14 يومًا", subtitle: "امتلأ خط الإنتاج في أسبوعين" },
];

/* ── Glassmorphic Arrow ── */
function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer active:scale-95 transition-transform duration-150"
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        ...(direction === "left" ? { left: "6px" } : { right: "6px" }),
        zIndex: 20,
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        color: "#ffffff",
      }}
    >
      <svg
        style={{ width: "20px", height: "20px" }}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        {direction === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 18l6-6-6-6" />
        )}
      </svg>
    </button>
  );
}

/* ── Main Section ── */
export default function EvidenceAr() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 300;
    const scrollAmount = direction === "left" ? -cardWidth - 16 : cardWidth + 16;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }, []);

  return (
    <section className="relative" style={{ paddingTop: "55px", paddingBottom: "55px" }}>
      <div style={{ maxWidth: "896px", marginLeft: "auto", marginRight: "auto", paddingLeft: "32px", paddingRight: "32px" }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <p
            className="text-xs uppercase font-semibold"
            style={{ letterSpacing: "0.2em", color: "#F97316", marginBottom: "16px" }}
          >
            البراهين
          </p>
          <h2
            className="text-2xl md:text-4xl font-extrabold text-white"
            style={{ lineHeight: 1.2 }}
          >
            لا تأخذ كلامنا على محمل الجد.
          </h2>
          <h3
            className="text-xl md:text-3xl font-bold"
            style={{ color: "#a8a29e", marginTop: "8px" }}
          >
            استمع للنتائج بنفسك.
          </h3>
        </motion.div>
      </div>

      {/* Carousel wrapper */}
      <div className="relative" style={{ maxWidth: "896px", marginLeft: "auto", marginRight: "auto" }}>
        {/* Arrows — mobile only */}
        <div className="evidence-carousel-arrows">
          <CarouselArrow direction="right" onClick={() => scroll("right")} />
          <CarouselArrow direction="left" onClick={() => scroll("left")} />
        </div>

        {/* Grid (desktop) / Carousel (mobile) */}
        <div ref={scrollRef} className="evidence-grid" style={{ paddingLeft: "32px", paddingRight: "32px" }}>
          {testimonials.map((t, i) => (
            <AudioCard
              key={t.title}
              title={t.title}
              badge={t.badge}
              subtitle={t.subtitle}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
