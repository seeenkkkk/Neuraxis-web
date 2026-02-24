"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    name: "María González",
    role: "Directora",
    company: "Clínica Estética Lumina",
    text: "Desde que implementamos Neuraxis, los leads de Instagram se responden en segundos. Hemos reducido las ausencias un 60% y nuestras consultoras pueden enfocarse en lo que importa: los clientes.",
    initials: "MG",
    color: "from-brand-purple to-brand-cyan",
  },
  {
    name: "Carlos Martínez",
    role: "CEO",
    company: "Inmobiliaria Primavera",
    text: "El seguimiento automático de leads transformó nuestro negocio. Antes perdíamos el 40% de los contactos por falta de respuesta rápida. Ahora cerramos el doble de ventas con el mismo equipo.",
    initials: "CM",
    color: "from-brand-cyan to-brand-green",
  },
  {
    name: "Laura Fernández",
    role: "Fundadora",
    company: "BeautyFlow Studio",
    text: "La automatización de citas y recordatorios nos ahorró más de 20 horas semanales. El ROI fue evidente desde el primer mes. No puedo imaginar volver a gestionar todo manualmente.",
    initials: "LF",
    color: "from-brand-green to-brand-purple",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [inView, next]);

  return (
    <section ref={ref} className="py-24 bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-brand-cyan text-sm font-semibold uppercase tracking-widest mb-4">
            Testimonios
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Lo que dicen nuestros clientes
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <div className="glass-card rounded-2xl p-8 sm:p-12 min-h-[280px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-brand-cyan">★</span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white/80 text-lg leading-relaxed mb-8">
                  &ldquo;{testimonials[current].text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[current].color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                  >
                    {testimonials[current].initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {testimonials[current].name}
                    </p>
                    <p className="text-sm text-white/50">
                      {testimonials[current].role} · {testimonials[current].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-6 h-2 bg-brand-cyan"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
