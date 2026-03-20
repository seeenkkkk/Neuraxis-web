"use client";

import {
  useRef,
  useEffect,
  useState,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const StarField = dynamic(() => import("./StarField"), { ssr: false });
const AgentOrbit = dynamic(() => import("./AgentOrbit"), { ssr: false });

const BRAND_GRADIENT = "linear-gradient(135deg, #9B30FF 0%, #00C4FF 100%)";

// Word-by-word text reveal
function RevealText({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Animated counter
function AnimCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = end / 50;
          const t = setInterval(() => {
            start += step;
            if (start >= end) {
              setVal(end);
              clearInterval(t);
            } else {
              setVal(Math.round(start));
            }
          }, 30);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function HeroNew() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax layers
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const orbScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.85]);

  // Mouse parallax for aurora blobs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const blob1X = useSpring(useTransform(mouseX, [-1, 1], ["-30px", "30px"]), {
    stiffness: 60,
    damping: 20,
  });
  const blob1Y = useSpring(useTransform(mouseY, [-1, 1], ["-20px", "20px"]), {
    stiffness: 60,
    damping: 20,
  });
  const blob2X = useSpring(useTransform(mouseX, [-1, 1], ["20px", "-20px"]), {
    stiffness: 40,
    damping: 20,
  });
  const blob2Y = useSpring(useTransform(mouseY, [-1, 1], ["15px", "-15px"]), {
    stiffness: 40,
    damping: 20,
  });

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#0D0D1A" }}
    >
      {/* ── Layer 0: Canvas star field ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <StarField />
      </motion.div>

      {/* ── Layer 1: Aurora blobs (background) ── */}
      <motion.div className="absolute inset-0 z-1 pointer-events-none" style={{ y: bgY }}>
        {/* Blob purple */}
        <motion.div
          className="absolute animate-aurora-1"
          style={{
            width: 700,
            height: 700,
            top: "-15%",
            left: "-10%",
            background:
              "radial-gradient(ellipse, rgba(155,48,255,0.14) 0%, rgba(155,48,255,0.04) 40%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(40px)",
            x: blob1X,
            y: blob1Y,
          }}
        />
        {/* Blob cyan */}
        <motion.div
          className="absolute animate-aurora-2"
          style={{
            width: 600,
            height: 600,
            bottom: "-10%",
            right: "-8%",
            background:
              "radial-gradient(ellipse, rgba(0,196,255,0.12) 0%, rgba(0,196,255,0.04) 40%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(40px)",
            x: blob2X,
            y: blob2Y,
          }}
        />
        {/* Blob green */}
        <motion.div
          className="absolute animate-aurora-3"
          style={{
            width: 450,
            height: 450,
            top: "40%",
            right: "15%",
            background:
              "radial-gradient(ellipse, rgba(0,204,106,0.07) 0%, transparent 65%)",
            borderRadius: "50%",
            filter: "blur(50px)",
          }}
        />
      </motion.div>

      {/* ── Layer 2: Grid overlay ── */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(155,48,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(155,48,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* Left: Text content */}
          <motion.div style={{ y: textY, opacity: textOpacity }}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 border"
              style={{
                background: "rgba(155,48,255,0.08)",
                borderColor: "rgba(155,48,255,0.3)",
              }}
            >
              <motion.span
                className="w-2 h-2 rounded-full"
                style={{ background: "#00CC6A", boxShadow: "0 0 8px rgba(0,204,106,0.8)" }}
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#9B30FF" }}>
                Plataforma #1 Agencias IA · Builder 2.0
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.04] mb-6 text-white"
              style={{ fontFamily: "var(--font-syne, sans-serif)" }}
            >
              <RevealText text="Construye tu" delay={0.15} />
              <br />
              <RevealText text="Agencia de" delay={0.3} />
              {" "}
              <span className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: BRAND_GRADIENT,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 20px rgba(155,48,255,0.4))",
                  }}
                >
                  IA
                </motion.span>
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg leading-relaxed mb-10 max-w-lg"
              style={{ color: "rgba(255,255,255,0.52)", fontFamily: "var(--font-dm-sans, sans-serif)" }}
            >
              Despliega agentes IA propios, automatiza workflows y escala tu negocio
              desde el primer día — sin código, sin fricciones.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(155,48,255,0.5), 0 0 80px rgba(0,196,255,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 text-sm font-bold rounded-2xl text-white relative overflow-hidden"
                  style={{ background: BRAND_GRADIENT }}
                >
                  <span className="relative z-10">Empezar gratis →</span>
                  {/* Shimmer sweep */}
                  <motion.span
                    className="absolute inset-0 -skew-x-12"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                      x: "-100%",
                    }}
                    animate={{ x: ["−100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                  />
                </motion.button>
              </Link>

              <Link href="/dashboard">
                <motion.button
                  whileHover={{
                    scale: 1.04,
                    background: "rgba(255,255,255,0.07)",
                    borderColor: "rgba(255,255,255,0.25)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 text-sm font-semibold rounded-2xl transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.75)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  Ver demo en vivo ↗
                </motion.button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              Sin tarjeta de crédito · +50 agencias activas · Cancela cuando quieras
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex flex-wrap gap-8 mt-10 pt-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {[
                { val: 50, suffix: "+", label: "Agencias activas" },
                { val: 10, suffix: "K+", label: "Conversaciones IA" },
                { val: 98, suffix: "%", label: "Satisfacción" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="text-2xl font-black mb-0.5"
                    style={{
                      background: BRAND_GRADIENT,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <AnimCounter end={s.val} suffix={s.suffix} />
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Agent Orbit visual */}
          <motion.div
            style={{ y: orbY, scale: orbScale }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Background glow halo */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                  width: 420,
                  height: 420,
                  background:
                    "radial-gradient(circle, rgba(155,48,255,0.12) 0%, rgba(0,196,255,0.08) 40%, transparent 70%)",
                  filter: "blur(30px)",
                }}
              />
              <AgentOrbit />
            </motion.div>

            {/* Floating info cards */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute top-4 -right-4 glass-dark rounded-xl px-4 py-2.5 hidden lg:flex items-center gap-2.5"
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ background: "#00CC6A", boxShadow: "0 0 8px rgba(0,204,106,0.9)" }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <span className="text-xs font-semibold text-white/70">
                5 agentes activos
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute bottom-8 -left-6 glass-dark rounded-xl px-4 py-2.5 hidden lg:block"
            >
              <p className="text-[10px] text-white/40 mb-0.5">Respondiendo ahora</p>
              <p className="text-xs font-bold" style={{ color: "#00C4FF" }}>
                ARIA · Cerrando venta →
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #0D0D1A, transparent)" }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-widest uppercase text-white/20">Scroll</span>
        <motion.div
          className="w-px h-10 rounded-full origin-top"
          style={{ background: "linear-gradient(to bottom, rgba(155,48,255,0.6), transparent)" }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
