import type { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  valueClassName?: string;
}

export default function MetricCard({
  label,
  value,
  subtitle,
  icon,
  valueClassName = "text-white",
}: MetricCardProps) {
  return (
    <div className="min-w-0 rounded-lg border border-white/10 bg-[#0b100e] p-3">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="truncate text-[10px] font-medium uppercase tracking-wider text-gray-500">
          {label}
        </p>

        {icon && <span className="shrink-0 text-gray-400">{icon}</span>}
      </div>

      <p className={`wrap-break-word text-base font-semibold ${valueClassName}`}>
        {value}
      </p>

      {subtitle && (
        <p className="mt-1 truncate text-[10px] text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}
