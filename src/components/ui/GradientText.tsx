import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  gradient?: "primary" | "green" | "gold";
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const GRADIENTS = {
  primary: "linear-gradient(135deg, #00AAFF, #A855F7)",
  green:   "linear-gradient(135deg, #00FF88, #00CC66)",
  gold:    "linear-gradient(135deg, #FFD700, #FF9900)",
};

export default function GradientText({
  children,
  gradient = "primary",
  className = "",
  as: Tag = "span",
}: GradientTextProps) {
  return (
    <Tag
      className={className}
      style={{
        background: GRADIENTS[gradient],
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </Tag>
  );
}
