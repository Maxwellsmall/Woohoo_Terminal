import type { TokenMetrics as TokenMetricsType } from "../../types";

import ChangeIndicator from "../../components/ui/ChangeIndicator";
import MetricCard from "../../components/ui/MetricCard";

interface TokenMetricsProps {
  metrics: TokenMetricsType;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
};

export default function TokenMetrics({ metrics }: TokenMetricsProps) {
  return (
    <section className="border-b border-white/10 py-5">
      <h3 className="mb-4 text-sm font-semibold text-white">Market Metrics</h3>

      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          label="Price"
          value={`$${metrics.priceUsd.toFixed(metrics.priceUsd < 1 ? 4 : 2)}`}
        />

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
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-400">24h Change</span>

        <ChangeIndicator value={metrics.priceChange24h} />
      </div>
    </section>
  );
}
