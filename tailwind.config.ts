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
        background: "#0a0a0f",
        foreground: "#ffffff",
        "brand-green": "#a8e063",
        "brand-purple": "#6a11cb",
        "brand-cyan": "#22d4fd",
        "surface": "#111118",
        "surface-2": "#16161f",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #6a11cb 0%, #22d4fd 100%)",
        "gradient-brand-green":
          "linear-gradient(135deg, #a8e063 0%, #6a11cb 50%, #22d4fd 100%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(106,17,203,0.15) 0%, rgba(34,212,253,0.05) 100%)",
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 40px 10px rgba(34,212,253,0.25)",
        "glow-purple": "0 0 40px 10px rgba(106,17,203,0.3)",
        "glow-brand": "0 0 60px 15px rgba(106,17,203,0.2), 0 0 40px 8px rgba(34,212,253,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
