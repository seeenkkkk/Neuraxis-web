"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 z-0"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repel" },
            resize: { enable: true },
          },
          modes: {
            repel: { distance: 80, duration: 0.4 },
          },
        },
        particles: {
          color: { value: ["#6a11cb", "#22d4fd", "#a8e063"] },
          links: {
            color: "#6a11cb",
            distance: 140,
            enable: true,
            opacity: 0.35,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: true,
            speed: 0.8,
            straight: false,
          },
          number: { density: { enable: true, width: 900 }, value: 70 },
          opacity: {
            value: { min: 0.2, max: 0.7 },
            animation: { enable: true, speed: 1, sync: false },
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1, max: 3 },
            animation: { enable: true, speed: 2, sync: false },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
