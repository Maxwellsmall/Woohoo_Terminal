import type { ReactNode } from "react";

export type StatusVariant = "success" | "warning" | "danger" | "neutral";

interface StatusBadgeProps {
  children: ReactNode;
  variant?: StatusVariant;
  dot?: boolean;
}

const variantClasses: Record<StatusVariant, string> = {
  success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  warning: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  danger: "border-rose-500/20 bg-rose-500/10 text-rose-400",
  neutral: "border-white/10 bg-white/5 text-gray-400",
};

export default function StatusBadge({
  children,
  variant = "neutral",
  dot = false,
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${variantClasses[variant]}`}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-current"
        />
      )}

      {children}
    </span>
  );
}
