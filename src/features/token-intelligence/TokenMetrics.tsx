import { useState } from "react";
import type { MarketPeriod, TokenMetrics as TokenMetricsType } from "../../types";

interface TokenMetricsProps {
  metrics: TokenMetricsType;
  quoteSymbol: string;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
};

export default function TokenMetrics({
  metrics,
  quoteSymbol,
}: TokenMetricsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<MarketPeriod>("h24");
  const periodMetrics = metrics.periods[selectedPeriod];

  const cards = [
    { label: "Price USD", value: formatPrice(metrics.priceUsd, "USD") },
    {
      label: `Price ${quoteSymbol}`,
      value: formatPrice(metrics.priceNative, quoteSymbol),
    },
    { label: "Liquidity", value: formatCurrency(metrics.liquidityUsd) },
    { label: "FDV", value: formatCurrency(metrics.fdvUsd) },
    { label: "Market Cap", value: formatCurrency(metrics.marketCapUsd) },
    { label: "24H Volume", value: formatCurrency(metrics.volume24hUsd) },
  ];

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

      <div className="mt-3">
        <div className="mb-2 grid grid-cols-4 rounded-md bg-white/[0.04] p-0.5">
          {periods.map(({ key, label }) => {
            const change = metrics.periods[key].priceChangePct;
            const positive = change !== null && change >= 0;

            return (
              <button
                type="button"
                key={key}
                onClick={() => setSelectedPeriod(key)}
                aria-pressed={selectedPeriod === key}
                className={`min-w-0 rounded px-1 py-1 text-center ${
                  selectedPeriod === key
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="block text-[9px]">{label}</span>
                <span
                  className={`block truncate text-[8px] ${
                    change === null
                      ? "text-gray-500"
                      : positive
                        ? "text-emerald-400"
                        : "text-rose-400"
                  }`}
                >
                  {change === null
                    ? "—"
                    : `${positive ? "+" : ""}${change.toFixed(2)}%`}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1 rounded-md border border-white/10 bg-white/[0.02] p-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] text-gray-500">Transactions</span>
            <strong className="text-[9px] text-gray-200">
              {formatCount(
                periodMetrics.buys === null || periodMetrics.sells === null
                  ? null
                  : periodMetrics.buys + periodMetrics.sells,
              )}
            </strong>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] text-gray-500">Volume</span>
            <strong className="text-[9px] text-gray-200">
              {formatCurrency(periodMetrics.volumeUsd)}
            </strong>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] text-gray-500">Buys</span>
            <strong className="text-[9px] text-emerald-400">
              {formatCount(periodMetrics.buys)}
            </strong>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] text-gray-500">Sells</span>
            <strong className="text-[9px] text-rose-400">
              {formatCount(periodMetrics.sells)}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
