import { Activity } from "lucide-react";
import { useSelectedToken } from "../../app/TokenContext";

export default function MarketTicker() {
  const { selectedToken, isLoading } = useSelectedToken();

  if (isLoading || !selectedToken) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2">
        <Activity size={14} className="text-gray-500" />
        <span className="text-xs text-gray-400">Loading market...</span>
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
    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#101513] px-3 py-2">
      <div className="flex items-center gap-1.5 whitespace-nowrap text-xs">
        <span className="font-semibold text-white">{selectedToken.symbol}</span>
        <span className="text-gray-500">/ USD</span>
      </div>

      <span className="whitespace-nowrap text-xs font-semibold text-white">
        ${priceUsd.toFixed(priceUsd < 1 ? 4 : 2)}
      </span>

      <span
        className={`whitespace-nowrap text-xs ${
          isPositive ? "text-emerald-400" : "text-rose-400"
        }`}
      >
        {isPositive ? "+" : ""}
        {priceChange24h.toFixed(2)}%
      </span>

      <div className="hidden border-l border-white/10 pl-3 xl:block">
        <p className="text-[9px] uppercase tracking-wider text-gray-500">
          Volume 24h
        </p>
        <p className="whitespace-nowrap text-xs text-gray-300">
          ${formatCompactCurrency(volume24hUsd)}
        </p>
      </div>
    </div>
  );
}
