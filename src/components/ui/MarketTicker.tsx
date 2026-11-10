import { Activity } from "lucide-react";
import { useSelectedToken } from "../../app/TokenContext";

export default function MarketTicker() {
  const { selectedToken, isLoading } = useSelectedToken();

  if (isLoading || !selectedToken) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
        <Activity size={14} className="text-slate-400" />
        <span className="text-xs text-slate-500">Loading market...</span>
      </div>
    );
  }

  const { priceUsd, priceChange24h, volume24hUsd } = selectedToken.metrics;

  const isPositive = priceChange24h >= 0;

  const formatCompactCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
      <div className="flex items-center gap-1.5 whitespace-nowrap text-xs">
        <span className="font-bold text-slate-900">{selectedToken.symbol}</span>
        <span className="text-slate-400">/ USD</span>
      </div>

      <span className="whitespace-nowrap font-mono text-xs font-bold text-slate-900">
        ${priceUsd.toFixed(priceUsd < 1 ? 4 : 2)}
      </span>

      <span
        className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-semibold ${
          isPositive
            ? "border-emerald-200 bg-emerald-50 text-emerald-600"
            : "border-rose-200 bg-rose-50 text-rose-600"
        }`}
      >
        {isPositive ? "+" : ""}
        {priceChange24h.toFixed(2)}%
      </span>

      <div className="hidden border-l border-slate-200 pl-3 xl:block">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
          Volume 24h
        </p>
        <p className="whitespace-nowrap font-mono text-xs font-semibold text-slate-700">
          ${formatCompactCurrency(volume24hUsd)}
        </p>
      </div>
    </div>
  );
}