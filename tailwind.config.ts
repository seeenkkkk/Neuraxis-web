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
        background: "#ffffff",
        foreground: "#0d0d1a",
        surface: "#ffffff",
        "surface-2": "#f0f2ff",
        "brand-purple": "#9B30FF",
        "brand-purple-light": "#B86AFF",
        "brand-blue": "#007AFF",
        "brand-blue-light": "#40A2FF",
        "brand-cyan": "#00C4FF",
        "brand-cyan-light": "#50D8FF",
        "brand-green": "#00CC6A",
        "text-primary": "#0d0d1a",
        "text-secondary": "#4b5570",
        "text-muted": "#9ca3af",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-neon": "linear-gradient(135deg, #007AFF 0%, #9B30FF 100%)",
        "gradient-neon-soft":
          "linear-gradient(135deg, rgba(0,122,255,0.10) 0%, rgba(155,48,255,0.08) 100%)",
        "gradient-purple-fade":
          "radial-gradient(ellipse at center, rgba(155,48,255,0.12) 0%, transparent 70%)",
        "gradient-blue-fade":
          "radial-gradient(ellipse at center, rgba(0,122,255,0.10) 0%, transparent 70%)",
        "gradient-cyan-fade":
          "radial-gradient(ellipse at center, rgba(0,196,255,0.10) 0%, transparent 70%)",
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
              "0 0 0 1.5px #9B30FF, 0 0 12px rgba(155,48,255,0.35), 0 0 30px rgba(155,48,255,0.15)",
          },
          "50%": {
            boxShadow:
              "0 0 0 2px #B86AFF, 0 0 24px rgba(155,48,255,0.55), 0 0 50px rgba(155,48,255,0.22)",
          },
        },
        pulseCyan: {
          "0%, 100%": {
            boxShadow:
              "0 0 0 1.5px #007AFF, 0 0 12px rgba(0,122,255,0.40), 0 0 30px rgba(0,122,255,0.15)",
          },
          "50%": {
            boxShadow:
              "0 0 0 2px #40A2FF, 0 0 24px rgba(0,122,255,0.60), 0 0 50px rgba(0,122,255,0.25)",
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
            boxShadow: "0 0 6px rgba(0,122,255,0.55), 0 0 12px rgba(155,48,255,0.30)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 12px rgba(0,122,255,0.80), 0 0 24px rgba(155,48,255,0.50)",
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
        "neon-purple": "0 0 15px rgba(155,48,255,0.40), 0 0 30px rgba(155,48,255,0.20)",
        "neon-blue": "0 0 15px rgba(0,122,255,0.45), 0 0 30px rgba(0,122,255,0.22)",
        "neon-cyan": "0 0 15px rgba(0,196,255,0.45), 0 0 30px rgba(0,196,255,0.22)",
        "neon-purple-lg": "0 0 25px rgba(155,48,255,0.50), 0 0 50px rgba(155,48,255,0.25), 0 0 80px rgba(155,48,255,0.10)",
        "neon-blue-lg": "0 0 25px rgba(0,122,255,0.50), 0 0 50px rgba(0,122,255,0.25), 0 0 80px rgba(0,122,255,0.10)",
        "neon-cyan-lg": "0 0 25px rgba(0,196,255,0.55), 0 0 50px rgba(0,196,255,0.28), 0 0 80px rgba(0,196,255,0.10)",
        "card": "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 24px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
