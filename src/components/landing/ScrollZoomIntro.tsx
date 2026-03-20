"use client";

import { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

const COLORS = ["#7B2FBE", "#00A8D6", "#00CC6A"];

function initParticle(p: Particle, width: number, height: number) {
  p.x = Math.random() * width;
  p.y = Math.random() * height;
  p.size = 1 + Math.random() * 1.5;
  p.speed = 0.25 + Math.random() * 0.45;
  p.opacity = 0.15 + Math.random() * 0.35;
  p.color = COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default function ScrollZoomIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  // ── Canvas particle field ──────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: 0, y: 0, size: 0, speed: 0, opacity: 0, color: "",
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.forEach((p) => initParticle(p, canvas.width, canvas.height));
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        p.y -= p.speed;
        p.opacity -= 0.0008;

        if (p.y < -4 || p.opacity <= 0) {
          initParticle(p, canvas.width, canvas.height);
          p.y = canvas.height + 4;
        }
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── GSAP ScrollTrigger ─────────────────────────────────────────────────
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const trigger = {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          };

          // Logo zoom + fade
          gsap.fromTo(
            logoRef.current,
            { scale: 1, opacity: 1 },
            { scale: 4, opacity: 0, ease: "none", scrollTrigger: trigger }
          );

          // Text: fade in at 30%, out at 70%
          gsap.fromTo(
            textRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "30% top",
                end: "50% top",
                scrub: 1.5,
              },
            }
          );
          gsap.fromTo(
            textRef.current,
            { opacity: 1 },
            {
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "55% top",
                end: "70% top",
                scrub: 1.5,
              },
            }
          );
        });
      } catch {
        // GSAP unavailable — show static
        if (textRef.current) textRef.current.style.opacity = "1";
      }
    };

    init();
    return () => { if (ctx) ctx.revert(); };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "200vh", position: "relative" }}>
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#050510",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />

        {/* Radial vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 65% 65% at 50% 50%, transparent 30%, #050510 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={logoRef}
          src="/images/logo2.png-removebg-preview.png"
          alt="Neuraxis IA"
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            objectFit: "contain",
            willChange: "transform, opacity",
            filter: "drop-shadow(0 0 40px rgba(123,47,190,0.5))",
            zIndex: 10,
          }}
        />

        {/* Text overlay — scroll-driven opacity */}
        <div
          ref={textRef}
          style={{
            position: "absolute",
            bottom: "18%",
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: 0,
            willChange: "opacity",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "0.25em",
              fontFamily: "var(--font-syne, sans-serif)",
              lineHeight: 1,
              marginBottom: "0.5rem",
            }}
          >
            NEURAXIS
          </p>
          <p
            style={{
              fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
              color: "rgba(255,255,255,0.38)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontFamily: "var(--font-syne, sans-serif)",
            }}
          >
            Automatización Inteligente
          </p>
        </div>

        {/* Bottom fade to white (next section) */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(to bottom, transparent, #FFFFFF)",
            pointerEvents: "none",
            zIndex: 30,
          }}
        />
      </div>
    </div>
  );
}
