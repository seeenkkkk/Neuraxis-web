import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f7f8ff",
        foreground: "#0f0f1a",
        surface: "#ffffff",
        "surface-2": "#f0f1ff",
        "brand-purple": "#6a11cb",
        "brand-purple-light": "#8b3cf7",
        "brand-cyan": "#22d4fd",
        "brand-cyan-light": "#67e8f9",
        "brand-green": "#10b981",
        "text-primary": "#0f0f1a",
        "text-secondary": "#4b5563",
        "text-muted": "#9ca3af",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-neon": "linear-gradient(135deg, #6a11cb 0%, #22d4fd 100%)",
        "gradient-neon-soft":
          "linear-gradient(135deg, rgba(106,17,203,0.12) 0%, rgba(34,212,253,0.08) 100%)",
        "gradient-purple-fade":
          "radial-gradient(ellipse at center, rgba(106,17,203,0.15) 0%, transparent 70%)",
        "gradient-cyan-fade":
          "radial-gradient(ellipse at center, rgba(34,212,253,0.12) 0%, transparent 70%)",
      },
      animation: {
        "pulse-neon": "pulseNeon 2.5s ease-in-out infinite",
        "pulse-cyan": "pulseCyan 2.5s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "gem-pulse": "gemPulse 2s ease-in-out infinite",
        orbit: "orbit 6s linear infinite",
      },
      keyframes: {
        pulseNeon: {
          "0%, 100%": {
            boxShadow:
              "0 0 0 1.5px #6a11cb, 0 0 12px rgba(106,17,203,0.35), 0 0 30px rgba(106,17,203,0.15)",
          },
          "50%": {
            boxShadow:
              "0 0 0 2px #8b3cf7, 0 0 24px rgba(106,17,203,0.6), 0 0 50px rgba(106,17,203,0.25)",
          },
        },
        pulseCyan: {
          "0%, 100%": {
            boxShadow:
              "0 0 0 1.5px #22d4fd, 0 0 12px rgba(34,212,253,0.4), 0 0 30px rgba(34,212,253,0.15)",
          },
          "50%": {
            boxShadow:
              "0 0 0 2px #67e8f9, 0 0 24px rgba(34,212,253,0.6), 0 0 50px rgba(34,212,253,0.25)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        gemPulse: {
          "0%, 100%": {
            boxShadow: "0 0 6px rgba(34,212,253,0.6), 0 0 12px rgba(34,212,253,0.3)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 12px rgba(34,212,253,0.9), 0 0 24px rgba(34,212,253,0.5)",
            transform: "scale(1.1)",
          },
        },
        orbit: {
          from: { transform: "rotate(0deg) translateX(60px) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(60px) rotate(-360deg)" },
        },
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
        "glass-hover": "0 16px 48px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.06)",
        "neon-purple": "0 0 15px rgba(106,17,203,0.4), 0 0 30px rgba(106,17,203,0.2)",
        "neon-cyan": "0 0 15px rgba(34,212,253,0.5), 0 0 30px rgba(34,212,253,0.25)",
        "neon-purple-lg": "0 0 25px rgba(106,17,203,0.5), 0 0 50px rgba(106,17,203,0.25), 0 0 80px rgba(106,17,203,0.1)",
        "neon-cyan-lg": "0 0 25px rgba(34,212,253,0.6), 0 0 50px rgba(34,212,253,0.3), 0 0 80px rgba(34,212,253,0.1)",
        "card": "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 24px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
