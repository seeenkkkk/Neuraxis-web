"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const BRAND_GRADIENT = "linear-gradient(135deg, #7B2FBE 0%, #00A8D6 100%)";

export default function HeroNew() {
  const logoRightRef = useRef<HTMLImageElement>(null);

  // GSAP: subtle scroll scale on right logo
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.fromTo(
            logoRightRef.current,
            { scale: 1 },
            {
              scale: 1.08,
              ease: "none",
              scrollTrigger: {
                trigger: "#hero-content",
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        });
      } catch {
        // GSAP unavailable
      }
    };

    init();
    return () => { if (ctx) ctx.revert(); };
  }, []);

  return (
    <section
      id="hero-content"
      style={{ background: "#FFFFFF", minHeight: "100vh" }}
      className="flex items-center px-6 py-24"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-5 gap-12 items-center">

        {/* Left column (60%) */}
        <div className="lg:col-span-3 flex flex-col">

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] mb-6"
            style={{
              fontFamily: "var(--font-syne, sans-serif)",
              color: "#1a1a2e",
            }}
          >
            Automatizamos tu negocio.{" "}
            <span
              style={{
                background: BRAND_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Tú te dedicas a crecer.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="text-base sm:text-lg leading-relaxed mb-10 max-w-lg"
            style={{ color: "#4a4a6a" }}
          >
            Cada minuto que no automatizas, es dinero que pierdes. Despliega agentes IA propios,
            automatiza workflows y escala tu negocio desde el primer día — sin código, sin fricciones.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="flex flex-wrap items-center gap-3 mb-12"
          >
            <a href="mailto:neuraxis.ia.global@gmail.com">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 text-sm font-bold rounded-xl text-white"
                style={{
                  background: BRAND_GRADIENT,
                  boxShadow: "0 2px 12px rgba(123,47,190,0.25)",
                }}
              >
                Contactar
              </motion.button>
            </a>
          </motion.div>

        </div>

        {/* Right column (40%) — Logo */}
        <motion.div
          className="lg:col-span-2 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={logoRightRef}
            src="/images/logo2.png-removebg-preview.png"
            alt="Neuraxis IA"
            className="w-64 sm:w-80 lg:w-full max-w-sm object-contain"
            style={{
              willChange: "transform",
              filter: "drop-shadow(0 20px 60px rgba(123,47,190,0.3))",
            }}
          />
        </motion.div>

      </div>
    </section>
  );
}
