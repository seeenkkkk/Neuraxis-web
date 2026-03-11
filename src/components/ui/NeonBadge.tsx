import { ReactNode } from "react";

interface NeonBadgeProps {
  children: ReactNode;
  color?: "blue" | "purple" | "cyan" | "green" | "orange" | "red" | "gold";
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
}

const COLORS = {
  blue:   { text: "#007AFF", bg: "rgba(0,122,255,0.12)",   border: "rgba(0,122,255,0.3)"   },
  purple: { text: "#9B30FF", bg: "rgba(155,48,255,0.12)",  border: "rgba(155,48,255,0.3)"  },
  cyan:   { text: "#00C4FF", bg: "rgba(0,196,255,0.12)",   border: "rgba(0,196,255,0.3)"   },
  green:  { text: "#00FF88", bg: "rgba(0,255,136,0.12)",   border: "rgba(0,255,136,0.3)"   },
  orange: { text: "#FF6B35", bg: "rgba(255,107,53,0.12)",  border: "rgba(255,107,53,0.3)"  },
  red:    { text: "#FF4444", bg: "rgba(255,68,68,0.12)",   border: "rgba(255,68,68,0.3)"   },
  gold:   { text: "#FFD700", bg: "rgba(255,215,0,0.12)",   border: "rgba(255,215,0,0.3)"   },
};

const SIZES = {
  sm: "text-[10px] px-1.5 py-0.5 rounded-md",
  md: "text-xs px-2.5 py-1 rounded-lg",
};

export default function NeonBadge({
  children,
  color = "blue",
  size = "md",
  dot = false,
  className = "",
}: NeonBadgeProps) {
  const c = COLORS[color];
  return (
    <span
      className={`inline-flex items-center gap-1 font-medium border ${SIZES[size]} ${className}`}
      style={{ color: c.text, background: c.bg, borderColor: c.border }}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: c.text, boxShadow: `0 0 4px ${c.text}` }}
        />
      )}
      {children}
    </span>
  );
}
