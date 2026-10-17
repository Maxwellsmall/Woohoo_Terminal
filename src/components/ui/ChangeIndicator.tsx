import { TrendingDown, TrendingUp } from "lucide-react";

interface ChangeIndicatorProps {
  value: number | null;
  suffix?: string;
  showIcon?: boolean;
}

export default function ChangeIndicator({
  value,
  suffix = "%",
  showIcon = true,
}: ChangeIndicatorProps) {
  if (value === null || !Number.isFinite(value)) {
    return <span className="text-xs text-gray-500">—</span>;
  }

  const isPositive = value >= 0;

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium ${
        isPositive ? "text-emerald-400" : "text-rose-400"
      }`}
    >
      {showIcon &&
        (isPositive ? (
          <TrendingUp size={13} aria-hidden="true" />
        ) : (
          <TrendingDown size={13} aria-hidden="true" />
        ))}

      {isPositive ? "+" : ""}
      {value.toFixed(2)}
      {suffix}
    </span>
  );
}
