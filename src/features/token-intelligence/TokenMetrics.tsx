import type { TokenMetrics as TokenMetricsType } from "../../types";

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
  const isPositive = metrics.priceChange24h >= 0;

  const rows = [
    {
      label: "Price",
      value: `$${metrics.priceUsd.toFixed(4)}`,
    },
    {
      label: "Market Cap",
      value: formatCurrency(metrics.marketCapUsd),
    },
    {
      label: "Liquidity",
      value: formatCurrency(metrics.liquidityUsd),
    },
    {
      label: "24h Volume",
      value: formatCurrency(metrics.volume24hUsd),
    },
  ];

  return (
    <section className="border-b border-white/10 py-5">
      <h3 className="mb-4 text-sm font-semibold text-white">Market Metrics</h3>

      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{row.label}</span>

            <span className="text-sm font-medium text-white">{row.value}</span>
          </div>
        ))}

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">24h Change</span>

          <span
            className={`text-sm font-medium ${
              isPositive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {metrics.priceChange24h.toFixed(2)}%
          </span>
        </div>
      </div>
    </section>
  );
}
