"use client";

import { useEffect, useRef } from "react";

/**
 * ScrollJourney — sección tipo Apple: la sección se queda fija y el scroll
 * "conduce" una cámara que entra en cada escena y pasa a la siguiente.
 *   1. Web (navegador)          → zoom dentro de la pantalla
 *   2. Automatización (nodos)   → zoom dentro del nodo IA
 *   3. Contenido (móvil + reels)
 *   4. Cierre con Nex y botón a Servicios
 * Fondos y mascota: imágenes propias de Neuraxis en /public/images/journey.
 */

const BG = "#050510";
const PURPLE = "#7B2FBE";
const CYAN = "#00A8D6";
const GREEN = "#00CC6A";
const GRADIENT = `linear-gradient(135deg, ${PURPLE} 0%, ${CYAN} 100%)`;
const IMG = "/images/journey";

const STEPS = ["Web", "Automatización", "Contenido"];

const CAPTIONS = [
  {
    num: "01",
    title: "Tu web, a medida",
    text: "Diseñamos una web única para tu marca, pensada para convertir visitas en clientes.",
  },
  {
    num: "02",
    title: "Tu negocio en automático",
    text: "Emails, chatbots y avisos que trabajan solos, conectados con tus herramientas.",
  },
  {
    num: "03",
    title: "Tus redes, siempre activas",
    text: "Vídeos, reels y publicaciones con IA para que te encuentren cada día.",
  },
];

// Mascota Nex: entra con un "pop" y flota suavemente
function Nex({ src, className, style }: { src: string; className: string; style: React.CSSProperties }) {
  return (
    <div className={`${className} absolute pointer-events-none`} style={{ zIndex: 20, ...style }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${IMG}/${src}`}
        alt=""
        aria-hidden
        className="sj-float w-full h-auto select-none"
        style={{ filter: `drop-shadow(0 12px 30px ${PURPLE}88)` }}
        draggable={false}
      />
    </div>
  );
}

// ── Escena 1: navegador que se construye ──────────────────────────────────
function BrowserScene() {
  return (
    <div className="sj-browser" style={{ width: "min(78vw, 720px, 86vh)", aspectRatio: "16 / 10", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          background: "rgba(14,14,34,0.92)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: `0 30px 120px ${PURPLE}66, 0 0 0 1px rgba(0,168,214,0.18)`,
          overflow: "hidden",
        }}
      >
        {/* Barra del navegador */}
        <div style={{ height: "8%", display: "flex", alignItems: "center", gap: 8, padding: "0 3%", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span key={c} style={{ width: 10, height: 10, borderRadius: 99, background: c, opacity: 0.85 }} />
          ))}
          <span style={{ marginLeft: "3%", flex: 1, maxWidth: "45%", height: "48%", borderRadius: 99, background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", paddingLeft: 10, fontSize: 10, color: "rgba(255,255,255,0.45)", overflow: "hidden", whiteSpace: "nowrap" }}>
            🔒 tunegocio.com
          </span>
        </div>

        <div style={{ position: "absolute", inset: "8% 0 0 0", padding: "4% 5%" }}>
          {/* Nav falsa */}
          <div className="sj-block" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5%" }}>
            <span style={{ width: "18%", height: 10, borderRadius: 6, background: GRADIENT }} />
            <span style={{ display: "flex", gap: 10 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ width: 34, height: 6, borderRadius: 6, background: "rgba(255,255,255,0.18)" }} />
              ))}
            </span>
          </div>
          {/* Hero falso con imagen real */}
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "6%", alignItems: "center" }}>
            <div>
              <span className="sj-block" style={{ display: "block", width: "90%", height: 16, borderRadius: 6, background: "rgba(255,255,255,0.85)", marginBottom: 10 }} />
              <span className="sj-block" style={{ display: "block", width: "70%", height: 16, borderRadius: 6, background: GRADIENT, marginBottom: 16 }} />
              <span className="sj-block" style={{ display: "block", width: "85%", height: 6, borderRadius: 6, background: "rgba(255,255,255,0.2)", marginBottom: 7 }} />
              <span className="sj-block" style={{ display: "block", width: "65%", height: 6, borderRadius: 6, background: "rgba(255,255,255,0.2)", marginBottom: 18 }} />
              <span className="sj-block" style={{ display: "inline-block", width: 96, height: 26, borderRadius: 8, background: GRADIENT, boxShadow: `0 6px 24px ${PURPLE}66` }} />
            </div>
            <div
              className="sj-block"
              style={{
                aspectRatio: "1 / 0.8",
                borderRadius: 14,
                backgroundImage: `url(${IMG}/bg-hero.webp)`,
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: `0 10px 40px ${CYAN}33`,
              }}
            />
          </div>
          {/* Tarjetas */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4%", marginTop: "6%" }}>
            {[PURPLE, CYAN, GREEN].map((c) => (
              <div key={c} className="sj-block" style={{ height: 52, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: `1px solid ${c}44`, padding: 10 }}>
                <span style={{ display: "block", width: 16, height: 16, borderRadius: 5, background: c, marginBottom: 8, opacity: 0.9 }} />
                <span style={{ display: "block", width: "70%", height: 5, borderRadius: 5, background: "rgba(255,255,255,0.25)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Nex src="nex-portatil.webp" className="sj-nex-1" style={{ width: "clamp(84px, 17vw, 210px)", left: "-9%", bottom: "-16%" }} />
    </div>
  );
}

// ── Escena 2: flujo de automatización ─────────────────────────────────────
function FlowScene() {
  const nodes = [
    { id: "mail", x: 90, y: 90, label: "Gmail", color: "#EA4335", icon: "✉️" },
    { id: "web", x: 90, y: 310, label: "Web", color: CYAN, icon: "🌐" },
    { id: "wa", x: 610, y: 90, label: "WhatsApp", color: "#25D366", icon: "💬" },
    { id: "crm", x: 610, y: 310, label: "CRM", color: GREEN, icon: "📇" },
  ];
  const center = { x: 350, y: 200 };
  return (
    <div style={{ width: "min(86vw, 760px, 92vh)", aspectRatio: "700 / 400", position: "relative" }}>
      <svg viewBox="0 0 700 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
        <defs>
          <linearGradient id="sj-line" x1="0" x2="1">
            <stop offset="0%" stopColor={PURPLE} />
            <stop offset="100%" stopColor={CYAN} />
          </linearGradient>
          <filter id="sj-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {nodes.map((n) => (
          <path
            key={n.id}
            className="sj-line"
            d={`M ${n.x} ${n.y} C ${(n.x + center.x) / 2} ${n.y}, ${(n.x + center.x) / 2} ${center.y}, ${center.x} ${center.y}`}
            fill="none"
            stroke="url(#sj-line)"
            strokeWidth={3}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset="1"
            filter="url(#sj-glow)"
          />
        ))}
        {nodes.map((n) => (
          <circle key={n.id + "p"} className="sj-pulse" r={6} fill="#fff" cx={n.x} cy={n.y} opacity={0} filter="url(#sj-glow)" />
        ))}
      </svg>
      {nodes.map((n) => (
        <div
          key={n.id}
          className="sj-node"
          style={{
            position: "absolute",
            left: `${(n.x / 700) * 100}%`,
            top: `${(n.y / 400) * 100}%`,
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            borderRadius: 14,
            background: "rgba(17,17,42,0.85)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${n.color}77`,
            boxShadow: `0 8px 30px ${n.color}44`,
            color: "white",
            fontSize: 13,
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontSize: 18 }}>{n.icon}</span>
          {n.label}
        </div>
      ))}
      {/* Nodo central IA con el logo: aquí hacemos zoom hacia la escena 3 */}
      <div
        className="sj-core"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "19%",
          aspectRatio: "1",
          transform: "translate(-50%, -50%)",
          borderRadius: "28%",
          background: "rgba(10,10,30,0.9)",
          border: "2px solid transparent",
          backgroundImage: `linear-gradient(rgba(10,10,30,0.92), rgba(10,10,30,0.92)), ${GRADIENT}`,
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 80px ${PURPLE}aa, 0 0 160px ${CYAN}55`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo2.png-removebg-preview.png" alt="" aria-hidden style={{ width: "78%", height: "auto" }} draggable={false} />
      </div>
      <Nex src="nex-arriba.webp" className="sj-nex-2" style={{ width: "clamp(56px, 8vw, 110px)", left: "50%", bottom: "-6%", marginLeft: "clamp(-28px, -4vw, -55px)" }} />
    </div>
  );
}

// ── Escena 3: móvil con reels reales ──────────────────────────────────────
function PhoneScene() {
  const reels = [
    { img: "reel-1.webp", likes: "12,4 mil", tag: "#verano" },
    { img: "reel-2.webp", likes: "8,9 mil", tag: "#ciudad" },
    { img: "reel-3.webp", likes: "21 mil", tag: "#tienda" },
  ];
  return (
    <div style={{ position: "relative", height: "min(54vh, 520px)", aspectRatio: "9 / 18.5" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "14% / 7%",
          background: "#0B0B1C",
          border: "2px solid rgba(255,255,255,0.18)",
          boxShadow: `0 30px 120px ${CYAN}55, 0 0 0 8px #15152e`,
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "1.6%", left: "50%", transform: "translateX(-50%)", width: "30%", height: "3%", borderRadius: 99, background: "#000", zIndex: 5 }} />
        {reels.map((r, i) => (
          <div
            key={i}
            className="sj-reel"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.25), transparent 25%, transparent 60%, rgba(0,0,0,0.65)), url(${IMG}/${r.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `translateY(${i * 100}%)`,
            }}
          >
            <div style={{ position: "absolute", right: "6%", bottom: "16%", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: "white", fontSize: 10, fontWeight: 700, textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
              <span style={{ fontSize: 20 }}>❤️</span>
              {r.likes}
              <span style={{ fontSize: 18 }}>💬</span>
              <span style={{ fontSize: 18 }}>↗</span>
            </div>
            <div style={{ position: "absolute", left: "7%", bottom: "7%", right: "26%", color: "white", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, fontSize: 11, fontWeight: 800 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo2.png-removebg-preview.png" alt="" aria-hidden style={{ width: 20, height: 20, borderRadius: 99, background: "#0B0B1C", padding: 2 }} />
                tu_negocio
              </div>
              <div style={{ fontSize: 10, opacity: 0.85 }}>Hecho con IA en minutos ✨ {r.tag}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Corazones que suben */}
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="sj-heart"
          style={{ position: "absolute", right: `${-8 - (i % 3) * 7}%`, bottom: `${20 + i * 4}%`, fontSize: 18 + (i % 2) * 8, opacity: 0 }}
        >
          {i % 2 ? "💜" : "💙"}
        </span>
      ))}
      <Nex src="nex-movil.webp" className="sj-nex-3" style={{ width: "clamp(78px, 13vw, 170px)", right: "112%", bottom: "4%" }} />
    </div>
  );
}

export default function ScrollJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const q = gsap.utils.selector(stageRef);

        // ── Estado inicial
        gsap.set(q(".sj-scene-2, .sj-scene-3, .sj-final"), { autoAlpha: 0 });
        gsap.set(q(".sj-bg-2, .sj-bg-3"), { autoAlpha: 0, scale: 1.35 });
        gsap.set(q(".sj-bg-1"), { scale: 1.12 });
        gsap.set(q(".sj-cap"), { autoAlpha: 0, y: 30 });
        gsap.set(q(".sj-block"), { autoAlpha: 0, y: 40, scale: 0.9 });
        gsap.set(q(".sj-scene-1"), { scale: 0.85, rotateX: 18, transformPerspective: 1200 });
        gsap.set(q(".sj-scene-2"), { scale: 0.35 });
        gsap.set(q(".sj-scene-3"), { scale: 0.3 });
        gsap.set(q(".sj-node"), { autoAlpha: 0, scale: 0.6 });
        gsap.set(q(".sj-nex-1, .sj-nex-2, .sj-nex-3"), { autoAlpha: 0, y: 50, scale: 0.6, rotate: -8 });
        gsap.set(q(".sj-step"), { opacity: 0.4 });
        gsap.set(q(".sj-step-1"), { opacity: 1 });
        gsap.set(q(".sj-bar"), { scaleX: 0, transformOrigin: "left center" });

        if (reduced) {
          gsap.set(q(".sj-block, .sj-cap-1, .sj-nex-1"), { autoAlpha: 1, y: 0, scale: 1, rotate: 0 });
          gsap.set(q(".sj-scene-1"), { scale: 1, rotateX: 0 });
          return;
        }

        const pop = { autoAlpha: 1, y: 0, scale: 1, rotate: 0, duration: 0.6, ease: "back.out(1.8)" };
        const out = { autoAlpha: 0, y: 30, scale: 0.7, duration: 0.35, ease: "power2.in" };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        // ── Escena 1: el navegador se endereza, la web se construye y llega Nex
        tl.to(q(".sj-scene-1"), { scale: 1, rotateX: 0, duration: 1.2, ease: "power2.out" }, 0)
          .to(q(".sj-bg-1"), { scale: 1, duration: 2.5 }, 0)
          .to(q(".sj-cap-1"), { autoAlpha: 1, y: 0, duration: 0.6 }, 0.2)
          .to(q(".sj-block"), { autoAlpha: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.5, ease: "power2.out" }, 0.3)
          .to(q(".sj-nex-1"), pop, 1.0)
          .to({}, { duration: 0.8 })

          // ── Zoom dentro de la pantalla → escena 2
          .addLabel("toFlow")
          .to(q(".sj-nex-1"), out, "toFlow")
          .to(q(".sj-cap-1"), { autoAlpha: 0, y: -30, duration: 0.4 }, "toFlow")
          .to(q(".sj-scene-1"), { scale: 7, autoAlpha: 0, duration: 1.2, ease: "power2.in" }, "toFlow+=0.15")
          .to(q(".sj-bg-1"), { scale: 1.6, autoAlpha: 0, duration: 1.2, ease: "power2.in" }, "toFlow+=0.15")
          .to(q(".sj-bg-2"), { autoAlpha: 1, scale: 1.1, duration: 1.4, ease: "power2.out" }, "toFlow+=0.6")
          .to(q(".sj-step-1"), { opacity: 0.4, duration: 0.2 }, "toFlow+=0.7")
          .to(q(".sj-step-2"), { opacity: 1, duration: 0.2 }, "toFlow+=0.7")
          .to(q(".sj-scene-2"), { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power2.out" }, "toFlow+=0.6")
          .to(q(".sj-cap-2"), { autoAlpha: 1, y: 0, duration: 0.6 }, "toFlow+=1.2")
          .to(q(".sj-node"), { autoAlpha: 1, scale: 1, stagger: 0.12, duration: 0.5, ease: "back.out(1.6)" }, "toFlow+=1.2")
          .to(q(".sj-line"), { strokeDashoffset: 0, stagger: 0.12, duration: 0.8 }, "toFlow+=1.5")
          .to(q(".sj-nex-2"), pop, "toFlow+=1.7")
          .to(q(".sj-pulse"), { opacity: 1, duration: 0.1 }, "toFlow+=2.2")
          .to(q(".sj-pulse"), { attr: { cx: 350, cy: 200 }, duration: 0.8, stagger: 0.1 }, "toFlow+=2.2")
          .to(q(".sj-pulse"), { opacity: 0, duration: 0.15 }, ">-0.1")
          .to(q(".sj-core"), { scale: 1.15, duration: 0.3, yoyo: true, repeat: 1 }, ">-0.2")
          .to(q(".sj-bg-2"), { scale: 1, duration: 1.2 }, "<")
          .to({}, { duration: 0.6 })

          // ── Zoom dentro del nodo IA → escena 3
          .addLabel("toPhone")
          .to(q(".sj-nex-2"), out, "toPhone")
          .to(q(".sj-cap-2"), { autoAlpha: 0, y: -30, duration: 0.4 }, "toPhone")
          .to(q(".sj-node, .sj-line"), { autoAlpha: 0, duration: 0.5 }, "toPhone")
          .to(q(".sj-scene-2"), { scale: 9, autoAlpha: 0, duration: 1.2, ease: "power2.in" }, "toPhone+=0.15")
          .to(q(".sj-bg-2"), { scale: 1.6, autoAlpha: 0, duration: 1.2, ease: "power2.in" }, "toPhone+=0.15")
          .to(q(".sj-bg-3"), { autoAlpha: 1, scale: 1.1, duration: 1.4, ease: "power2.out" }, "toPhone+=0.6")
          .to(q(".sj-step-2"), { opacity: 0.4, duration: 0.2 }, "toPhone+=0.7")
          .to(q(".sj-step-3"), { opacity: 1, duration: 0.2 }, "toPhone+=0.7")
          .to(q(".sj-scene-3"), { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power2.out" }, "toPhone+=0.6")
          .to(q(".sj-cap-3"), { autoAlpha: 1, y: 0, duration: 0.6 }, "toPhone+=1.2")
          .to(q(".sj-nex-3"), pop, "toPhone+=1.3")
          // los reels pasan como si hicieras swipe
          .to(q(".sj-reel"), { yPercent: -100, duration: 0.7, ease: "power2.inOut" }, "toPhone+=1.6")
          .to(q(".sj-reel"), { yPercent: -200, duration: 0.7, ease: "power2.inOut" }, ">+0.3")
          .to(q(".sj-heart"), { opacity: 1, y: -60, stagger: 0.1, duration: 0.5 }, "toPhone+=1.8")
          .to(q(".sj-heart"), { opacity: 0, y: -140, stagger: 0.1, duration: 0.5 }, ">-0.2")
          .to(q(".sj-bg-3"), { scale: 1, duration: 1.4 }, "toPhone+=1.8")
          .to({}, { duration: 0.4 })

          // ── Cierre: Nex con el pulgar arriba
          .addLabel("final")
          .to(q(".sj-cap-3"), { autoAlpha: 0, y: -30, duration: 0.4 }, "final")
          .to(q(".sj-nex-3"), out, "final")
          .to(q(".sj-scene-3"), { scale: 0.6, autoAlpha: 0, y: -40, duration: 0.8, ease: "power2.in" }, "final")
          .to(q(".sj-bg-3"), { filter: "blur(8px) brightness(0.3)", duration: 0.8 }, "final")
          .fromTo(q(".sj-final"), { autoAlpha: 0, scale: 0.8, y: 40 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" }, "final+=0.5")
          .to({}, { duration: 0.8 });

        // Barra de progreso de toda la sección
        tl.fromTo(q(".sj-bar"), { scaleX: 0 }, { scaleX: 1, duration: tl.duration() }, 0);
      }, containerRef);

      ScrollTrigger.refresh();
    };

    init();
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "700vh", position: "relative", background: BG }}>
      <style>{`
        @keyframes sj-float { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
        .sj-float { animation: sj-float 3.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .sj-float { animation: none; } }
      `}</style>
      <div
        ref={stageRef}
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: BG }}
      >
        {/* Fondos con los escenarios de Neuraxis */}
        {["bg-web", "bg-auto", "bg-content"].map((bg, i) => (
          <div
            key={bg}
            aria-hidden
            className={`sj-bg-${i + 1} absolute inset-0`}
            style={{
              backgroundImage: `url(${IMG}/${bg}.webp)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.42) saturate(1.15)",
              willChange: "transform, opacity",
            }}
          />
        ))}
        {/* Oscurecido para que se lean los textos */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 75% 65% at 50% 42%, rgba(5,5,16,0.15) 0%, rgba(5,5,16,0.75) 70%, ${BG} 100%), linear-gradient(to bottom, rgba(5,5,16,0.55) 0%, transparent 22%, transparent 55%, rgba(5,5,16,0.92) 100%)`,
          }}
        />

        {/* Pasos + barra de progreso */}
        <div className="absolute left-0 right-0 flex justify-center px-4" style={{ top: "calc(64px + 3vh)", zIndex: 30 }}>
          <div
            className="relative flex items-center gap-1 sm:gap-2 rounded-full px-2 py-1.5 overflow-hidden"
            style={{ background: "rgba(10,10,30,0.6)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {STEPS.map((s, i) => (
              <span key={s} className={`sj-step sj-step-${i + 1} px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-bold text-white whitespace-nowrap`}>
                {String(i + 1).padStart(2, "0")} {s}
              </span>
            ))}
            <span className="sj-bar absolute left-0 bottom-0 h-[2px] w-full" style={{ background: GRADIENT }} />
          </div>
        </div>

        {/* Escenas (centradas, apiladas) */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ paddingBottom: "12vh", paddingTop: "8vh" }}>
          <div className="sj-scene-1 absolute" style={{ willChange: "transform, opacity" }}>
            <BrowserScene />
          </div>
          <div className="sj-scene-2 absolute" style={{ willChange: "transform, opacity" }}>
            <FlowScene />
          </div>
          <div className="sj-scene-3 absolute" style={{ willChange: "transform, opacity" }}>
            <PhoneScene />
          </div>

          {/* Cierre */}
          <div className="sj-final absolute flex flex-col items-center text-center px-6" style={{ zIndex: 40 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${IMG}/nex-pulgar.webp`}
              alt="Nex, la mascota de Neuraxis, con el pulgar arriba"
              className="sj-float mb-6"
              style={{ width: "clamp(130px, 22vh, 220px)", filter: `drop-shadow(0 16px 40px ${PURPLE}aa)` }}
              draggable={false}
            />
            <h3 className="text-3xl sm:text-5xl font-black text-white mb-3" style={{ fontFamily: "var(--font-syne, sans-serif)" }}>
              Todo esto,{" "}
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                para tu negocio
              </span>
            </h3>
            <p className="text-sm sm:text-lg mb-7 max-w-md" style={{ color: "rgba(255,255,255,0.6)" }}>
              Web, automatización y contenido con un mismo equipo.
            </p>
            <a
              href="#servicios"
              className="px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-transform hover:scale-105"
              style={{ background: GRADIENT, boxShadow: `0 10px 40px ${PURPLE}77` }}
            >
              Ver servicios →
            </a>
          </div>
        </div>

        {/* Textos */}
        <div className="absolute left-0 right-0 bottom-[6vh] px-6 flex justify-center pointer-events-none" style={{ zIndex: 30 }}>
          <div className="relative w-full max-w-xl text-center" style={{ minHeight: 120 }}>
            {CAPTIONS.map((c, i) => (
              <div key={c.num} className={`sj-cap sj-cap-${i + 1} absolute inset-x-0 top-0`}>
                <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: CYAN }}>
                  {c.num} · Neuraxis
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white mb-2" style={{ fontFamily: "var(--font-syne, sans-serif)", textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}>
                  {c.title}
                </h3>
                <p className="text-sm sm:text-base" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
