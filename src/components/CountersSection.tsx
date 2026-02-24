"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  { value: 500, suffix: "+", label: "Automatizaciones desplegadas", color: "text-brand-purple" },
  { value: 50, suffix: "+", label: "Empresas automatizadas", color: "text-brand-cyan" },
  { value: 10000, suffix: "+", label: "Horas ahorradas", color: "text-brand-green", separator: "." },
  { value: 98, suffix: "%", label: "Satisfacción de clientes", color: "text-brand-purple" },
];

export default function CountersSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-20 border-y border-white/5 bg-[#0d0d14]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center flex flex-col items-center gap-2"
            >
              <div className={`text-4xl sm:text-5xl font-bold ${stat.color}`}>
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    separator={stat.separator || ""}
                    suffix={stat.suffix}
                  />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <p className="text-sm text-white/50 leading-snug max-w-[120px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
