interface StatusDotProps {
  status: "active" | "inactive" | "loading" | "error";
  label?: string;
  className?: string;
}

const STATUS = {
  active:   { color: "#00FF88", shadow: "rgba(0,255,136,0.7)",  label: "Activo"     },
  inactive: { color: "#4B5563", shadow: "transparent",          label: "Inactivo"   },
  loading:  { color: "#00AAFF", shadow: "rgba(0,170,255,0.6)",  label: "Cargando"   },
  error:    { color: "#FF4444", shadow: "rgba(255,68,68,0.7)",  label: "Error"      },
};

export default function StatusDot({ status, label, className = "" }: StatusDotProps) {
  const s = STATUS[status];
  const isLoading = status === "loading";
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span
        className={`w-2 h-2 rounded-full flex-shrink-0 ${isLoading ? "animate-[pulse-dot_1.5s_infinite]" : ""}`}
        style={{ background: s.color, boxShadow: `0 0 6px ${s.shadow}` }}
      />
      {label !== undefined && (
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {label || s.label}
        </span>
      )}
    </span>
  );
}
