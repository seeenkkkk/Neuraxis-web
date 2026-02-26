"use client";

import { motion, AnimatePresence } from "framer-motion";

export type Emotion = "happy" | "waving" | "sad" | "angry" | "scared" | "sleeping";

interface NexMascotProps {
  emotion?: Emotion;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  message?: string;
  className?: string;
}

const SIZES = { sm: 72, md: 108, lg: 144, xl: 180 };

// viewBox: 0 0 100 145
// Head: flat-top hexagon, center (50,40), r=24 → points "74,40 62,61 38,61 26,40 38,19 62,19"
// Face panel: rect x=30 y=24 w=40 h=24 rx=5   (eyes ~y=34, mouth ~y=42)
// Body: rect x=36 y=64 w=28 h=36 rx=7
// Arms: from shoulders at (36,76) and (64,76)
// Legs: from y=99

function Face({ emotion }: { emotion: Emotion }) {
  switch (emotion) {
    case "happy":
      return (
        <g>
          {/* Happy ^^ eyes */}
          <path d="M36,35 Q40,31 44,35" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M56,35 Q60,31 64,35" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Big smile */}
          <path d="M37,42 Q50,52 63,42" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Blush */}
          <circle cx="33" cy="41" r="3" fill="#FF6B9D" fillOpacity="0.3" />
          <circle cx="67" cy="41" r="3" fill="#FF6B9D" fillOpacity="0.3" />
        </g>
      );
    case "waving":
      return (
        <g>
          <path d="M36,35 Q40,31 44,35" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M56,35 Q60,31 64,35" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Gentle smile */}
          <path d="M39,42 Q50,48 61,42" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
      );
    case "sad":
      return (
        <g>
          {/* Sad vv eyes */}
          <path d="M36,33 Q40,37 44,33" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M56,33 Q60,37 64,33" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Frown */}
          <path d="M37,45 Q50,38 63,45" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Cyan teardrop */}
          <ellipse cx="40" cy="41" rx="1.5" ry="3" fill="#00D4FF" fillOpacity="0.85" />
        </g>
      );
    case "angry":
      return (
        <g>
          {/* Angled angry brows */}
          <path d="M34,29 L44,33" stroke="#FF4444" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M56,33 L66,29" stroke="#FF4444" strokeWidth="1.8" strokeLinecap="round" />
          {/* Slit eyes */}
          <rect x="35" y="33" width="9" height="3.5" rx="1.5" fill="#FF4444" />
          <rect x="56" y="33" width="9" height="3.5" rx="1.5" fill="#FF4444" />
          {/* Jagged grimace */}
          <path d="M38,43 Q44,40 50,43 Q56,46 62,43" stroke="#FF4444" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
      );
    case "scared":
      return (
        <g>
          {/* Wide-open eyes */}
          <circle cx="40" cy="34" r="5.5" fill="#F0F0FF" fillOpacity="0.95" />
          <circle cx="60" cy="34" r="5.5" fill="#F0F0FF" fillOpacity="0.95" />
          <circle cx="40" cy="34" r="3" fill="#7C3AED" />
          <circle cx="60" cy="34" r="3" fill="#7C3AED" />
          <circle cx="41" cy="33" r="1.2" fill="#000" />
          <circle cx="61" cy="33" r="1.2" fill="#000" />
          {/* Eye shine */}
          <circle cx="38.5" cy="32" r="0.9" fill="white" />
          <circle cx="58.5" cy="32" r="0.9" fill="white" />
          {/* Open "O" mouth */}
          <ellipse cx="50" cy="44" rx="6" ry="3.5" fill="none" stroke="#A855F7" strokeWidth="1.5" />
        </g>
      );
    case "sleeping":
    default:
      return (
        <g>
          {/* Closed ~~ eyes */}
          <path d="M36,34 Q40,38 44,34" stroke="#00AAFF" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M56,34 Q60,38 64,34" stroke="#00AAFF" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Relaxed mouth */}
          <path d="M44,43 Q50,45 56,43" stroke="#4B5563" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </g>
      );
  }
}

function Arms({ emotion, animated }: { emotion: Emotion; animated: boolean }) {
  const A = { strokeWidth: 4, strokeLinecap: "round" as const, fill: "none" };

  switch (emotion) {
    case "happy":
      return (
        <g>
          {/* Both arms raised */}
          <path d="M36,76 Q24,64 18,54" stroke="url(#nex-main)" {...A} />
          <circle cx="18" cy="54" r="4.5" fill="#00AAFF" fillOpacity="0.7" />
          <path d="M64,76 Q76,64 82,54" stroke="url(#nex-main)" {...A} />
          <circle cx="82" cy="54" r="4.5" fill="#7C3AED" fillOpacity="0.7" />
        </g>
      );
    case "waving":
      return (
        <g>
          {/* Left arm hanging */}
          <path d="M36,76 Q28,84 24,92" stroke="url(#nex-main)" {...A} />
          <circle cx="24" cy="92" r="4.5" fill="#00AAFF" fillOpacity="0.6" />
          {/* Right arm waving with rotation animation */}
          <motion.g
            style={{ transformOrigin: "64px 76px" }}
            animate={animated ? { rotate: [0, 30, 5, 25, 0] } : {}}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" as const }}
          >
            <path d="M64,76 Q74,63 80,56" stroke="url(#nex-main)" {...A} />
            <circle cx="80" cy="56" r="4.5" fill="#7C3AED" fillOpacity="0.7" />
          </motion.g>
        </g>
      );
    case "sad":
      return (
        <g>
          {/* Both arms hanging low */}
          <path d="M36,76 Q24,90 18,103" stroke="#A855F7" {...A} strokeOpacity={0.7} />
          <circle cx="18" cy="103" r="4.5" fill="#A855F7" fillOpacity="0.5" />
          <path d="M64,76 Q76,90 82,103" stroke="#A855F7" {...A} strokeOpacity={0.7} />
          <circle cx="82" cy="103" r="4.5" fill="#A855F7" fillOpacity="0.5" />
        </g>
      );
    case "angry":
      return (
        <g>
          {/* L-shaped arms with fists */}
          <path d="M36,76 L20,76 L20,88" stroke="#FF4444" {...A} />
          <rect x="15" y="85" width="9" height="7" rx="3" fill="#FF4444" fillOpacity="0.8" />
          <path d="M64,76 L80,76 L80,88" stroke="#FF4444" {...A} />
          <rect x="76" y="85" width="9" height="7" rx="3" fill="#FF4444" fillOpacity="0.8" />
        </g>
      );
    case "scared":
      return (
        <g>
          {/* Arms out to sides */}
          <path d="M36,76 Q26,72 18,72" stroke="url(#nex-main)" {...A} />
          <circle cx="18" cy="72" r="4.5" fill="#7C3AED" fillOpacity="0.7" />
          {/* Left lightning bolt */}
          <path d="M18,67 L14,73 L19,73 L15,79" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M64,76 Q74,72 82,72" stroke="url(#nex-main)" {...A} />
          <circle cx="82" cy="72" r="4.5" fill="#7C3AED" fillOpacity="0.7" />
          {/* Right lightning bolt */}
          <path d="M82,67 L86,73 L81,73 L85,79" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
      );
    case "sleeping":
    default:
      return (
        <g>
          {/* Relaxed hanging arms */}
          <path d="M36,76 Q30,82 26,90" stroke="url(#nex-main)" {...A} strokeOpacity={0.5} />
          <circle cx="26" cy="90" r="4.5" fill="#00AAFF" fillOpacity="0.35" />
          <path d="M64,76 Q70,82 74,90" stroke="url(#nex-main)" {...A} strokeOpacity={0.5} />
          <circle cx="74" cy="90" r="4.5" fill="#7C3AED" fillOpacity="0.35" />
        </g>
      );
  }
}

function Extras({ emotion, animated }: { emotion: Emotion; animated: boolean }) {
  if (emotion === "happy") {
    return (
      <g>
        <motion.g
          style={{ transformOrigin: "10px 22px" }}
          animate={animated ? { opacity: [1, 0.3, 1], scale: [1, 1.3, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" as const }}
        >
          <text x="6" y="22" fontSize="9" fill="#FFD700" fontFamily="sans-serif">★</text>
        </motion.g>
        <motion.g
          style={{ transformOrigin: "86px 18px" }}
          animate={animated ? { opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.2, delay: 0.5, ease: "easeInOut" as const }}
        >
          <text x="82" y="18" fontSize="7" fill="#00D4FF" fontFamily="sans-serif">★</text>
        </motion.g>
        <motion.g
          animate={animated ? { opacity: [0.3, 1, 0.3] } : {}}
          transition={{ repeat: Infinity, duration: 2, delay: 1, ease: "easeInOut" as const }}
        >
          <text x="76" y="8" fontSize="6" fill="#A855F7" fontFamily="sans-serif">✦</text>
        </motion.g>
      </g>
    );
  }
  if (emotion === "sleeping") {
    return (
      <g>
        <motion.g
          animate={animated ? { y: [0, -3, 0], opacity: [0.7, 1, 0.7] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" as const }}
        >
          <text x="66" y="18" fontSize="7" fontWeight="bold" fill="#A855F7" fontFamily="monospace">Z</text>
        </motion.g>
        <motion.g
          animate={animated ? { y: [0, -4, 0], opacity: [0.5, 0.9, 0.5] } : {}}
          transition={{ repeat: Infinity, duration: 2.3, delay: 0.4, ease: "easeInOut" as const }}
        >
          <text x="74" y="10" fontSize="8" fontWeight="bold" fill="#7C3AED" fontFamily="monospace">Z</text>
        </motion.g>
        <motion.g
          animate={animated ? { y: [0, -5, 0], opacity: [0.3, 0.7, 0.3] } : {}}
          transition={{ repeat: Infinity, duration: 2.6, delay: 0.8, ease: "easeInOut" as const }}
        >
          <text x="82" y="3" fontSize="9" fontWeight="bold" fill="#A855F7" fontFamily="monospace">Z</text>
        </motion.g>
      </g>
    );
  }
  if (emotion === "angry") {
    return (
      <g>
        <motion.line
          x1="18" y1="35" x2="26" y2="38"
          stroke="#FF4444" strokeWidth="1" strokeLinecap="round"
          animate={animated ? { opacity: [1, 0.2, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.5 }}
        />
        <motion.line
          x1="74" y1="35" x2="82" y2="38"
          stroke="#FF4444" strokeWidth="1" strokeLinecap="round"
          animate={animated ? { opacity: [0.2, 1, 0.2] } : {}}
          transition={{ repeat: Infinity, duration: 0.5 }}
        />
        <motion.line
          x1="22" y1="51" x2="27" y2="57"
          stroke="#FF4444" strokeWidth="0.8" strokeLinecap="round"
          animate={animated ? { opacity: [1, 0.1, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.35, delay: 0.15 }}
        />
      </g>
    );
  }
  return null;
}

export default function NexMascot({
  emotion = "happy",
  size = "md",
  animated = true,
  message,
  className = "",
}: NexMascotProps) {
  const px = SIZES[size];
  const height = Math.round(px * 1.45);

  // Per-emotion body animation
  const anim = !animated
    ? {}
    : emotion === "happy"
    ? { y: [0, -5, 0] }
    : emotion === "waving"
    ? { rotate: [-1, 2, -1] }
    : emotion === "sad"
    ? { y: [0, 2, 0] }
    : emotion === "angry"
    ? { x: [-2, 2, -2, 2, 0] }
    : emotion === "scared"
    ? { x: [-1.5, 1.5, -1.5, 1.5, 0] }
    : { y: [0, -3, 0] }; // sleeping

  const trans = !animated
    ? {}
    : emotion === "happy"
    ? { repeat: Infinity, duration: 1.2, ease: "easeInOut" as const }
    : emotion === "waving"
    ? { repeat: Infinity, duration: 1.8, ease: "easeInOut" as const }
    : emotion === "sad"
    ? { repeat: Infinity, duration: 2.5, ease: "easeInOut" as const }
    : emotion === "angry"
    ? { repeat: Infinity, duration: 0.35, ease: "linear" as const }
    : emotion === "scared"
    ? { repeat: Infinity, duration: 0.25, ease: "linear" as const }
    : { repeat: Infinity, duration: 3.5, ease: "easeInOut" as const }; // sleeping

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {/* Speech bubble */}
      <AnimatePresence>
        {message && (
          <motion.div
            key="nex-bubble"
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-[180px] text-xs text-center px-3 py-2 rounded-xl"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-neon)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-dm-sans, sans-serif)",
            }}
          >
            {message}
            <span
              className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 block w-3 h-3 rotate-45"
              style={{
                background: "var(--bg-elevated)",
                borderRight: "1px solid var(--border-neon)",
                borderBottom: "1px solid var(--border-neon)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot SVG */}
      <motion.div
        animate={anim}
        transition={trans}
        style={{ width: px, height }}
      >
        <svg
          viewBox="0 0 100 145"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <linearGradient id="nex-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00AAFF" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="nex-body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1A1A2E" />
              <stop offset="100%" stopColor="#0F0F1C" />
            </linearGradient>
            <filter id="nex-glow-f">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Extras: sparkles / ZZZ / angry sparks */}
          <Extras emotion={emotion} animated={animated} />

          {/* ── HEAD ── */}
          <polygon
            points="74,40 62,61 38,61 26,40 38,19 62,19"
            fill="url(#nex-main)"
            fillOpacity="0.12"
          />
          <polygon
            points="74,40 62,61 38,61 26,40 38,19 62,19"
            fill="none"
            stroke="url(#nex-main)"
            strokeWidth="1.5"
          />

          {/* Antenna */}
          <line x1="50" y1="19" x2="50" y2="11" stroke="url(#nex-main)" strokeWidth="1.2" />
          <circle cx="50" cy="10" r="2.2" fill="#00D4FF" filter="url(#nex-glow-f)" />

          {/* Face screen */}
          <rect x="30" y="24" width="40" height="24" rx="5" fill="#0F0F1C" fillOpacity="0.92" />
          <rect
            x="30"
            y="24"
            width="40"
            height="24"
            rx="5"
            fill="none"
            stroke="rgba(0,212,255,0.25)"
            strokeWidth="0.5"
          />

          {/* Face expression */}
          <Face emotion={emotion} />

          {/* ── BODY ── */}
          <rect x="36" y="64" width="28" height="36" rx="7" fill="url(#nex-body-grad)" />
          <rect
            x="36"
            y="64"
            width="28"
            height="36"
            rx="7"
            fill="none"
            stroke="url(#nex-main)"
            strokeWidth="1"
          />
          {/* Circuit detail */}
          <line
            x1="50" y1="68" x2="50" y2="97"
            stroke="rgba(0,170,255,0.2)"
            strokeWidth="0.6"
          />
          <line
            x1="40" y1="79" x2="60" y2="79"
            stroke="rgba(0,170,255,0.15)"
            strokeWidth="0.6"
          />
          {/* Chest gem */}
          <circle cx="50" cy="88" r="3.5" fill="url(#nex-main)" fillOpacity="0.45" filter="url(#nex-glow-f)" />
          <circle cx="50" cy="88" r="1.5" fill="#00D4FF" fillOpacity="0.7" />

          {/* ── ARMS ── */}
          <Arms emotion={emotion} animated={animated} />

          {/* ── LEGS ── */}
          <rect x="38" y="99" width="10" height="18" rx="5" fill="url(#nex-main)" fillOpacity="0.45" />
          <rect x="52" y="99" width="10" height="18" rx="5" fill="url(#nex-main)" fillOpacity="0.45" />
          {/* Feet */}
          <rect x="35" y="113" width="14" height="7" rx="3.5" fill="url(#nex-main)" fillOpacity="0.35" />
          <rect x="51" y="113" width="14" height="7" rx="3.5" fill="url(#nex-main)" fillOpacity="0.35" />
        </svg>
      </motion.div>
    </div>
  );
}
