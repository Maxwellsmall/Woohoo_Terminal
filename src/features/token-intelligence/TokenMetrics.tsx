import type { TokenMetrics as TokenMetricsType } from "../../types";

import ChangeIndicator from "../../components/ui/ChangeIndicator";
import MetricCard from "../../components/ui/MetricCard";

interface TokenMetricsProps {
  metrics: TokenMetricsType;
}

const formatCurrency = (value: number | null): string => {
  if (value === null) return "Unavailable";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
};

const formatPrice = (value: number | null): string => {
  if (value === null) return "Unavailable";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 7,
  }).format(value);
};

export default function TokenMetrics({ metrics }: TokenMetricsProps) {
  return (
    <section className="border-b border-white/10 py-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Market Metrics</h3>

        <span className="text-[9px] text-emerald-400">DEXSCREENER</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MetricCard label="Price" value={formatPrice(metrics.priceUsd)} />

        <MetricCard
          label="Market Cap"
          value={formatCurrency(metrics.marketCapUsd)}
        />

        <MetricCard
          label="Liquidity"
          value={formatCurrency(metrics.liquidityUsd)}
        />

        <MetricCard
          label="24h Volume"
          value={formatCurrency(metrics.volume24hUsd)}
        />

        <MetricCard label="FDV" value={formatCurrency(metrics.fdvUsd)} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-400">24h Change</span>

        <ChangeIndicator value={metrics.priceChange24h} />
      </div>
    </section>
  );
}
