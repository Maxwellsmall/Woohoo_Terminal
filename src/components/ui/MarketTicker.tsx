import { Activity } from "lucide-react";
import { useSelectedToken } from "../../app/TokenContext";

export default function MarketTicker() {
  const { selectedToken, isLoading, error, isRefreshing } = useSelectedToken();

  if (isLoading && !selectedToken) {
    return (
      <div className="market-ticker market-ticker-empty">
        <Activity size={14} />
        <span>Loading market data...</span>
      </div>
    );
  }

  if (!selectedToken) {
    return (
      <div className="market-ticker market-ticker-empty" role="status">
        <Activity size={14} />
        <span>{error ?? "Market data unavailable"}</span>
      </div>
    );
  }

  const { priceUsd, priceChange24h, volume24hUsd } = selectedToken.metrics;

  const isPositive = priceChange24h !== null && priceChange24h >= 0;

  const formatCompactCurrency = (value: number | null) =>
    value === null
      ? "Unavailable"
      : new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 2,
        }).format(value);

  return (
    <div className="market-ticker" aria-live="polite">
      <div className="market-ticker-symbol">
        <span>{selectedToken.symbol}</span>
        <span>/ USD</span>
      </div>

      <span className="market-ticker-price">
        {priceUsd === null
          ? "Unavailable"
          : new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumSignificantDigits: 7,
            }).format(priceUsd)}
      </span>

      <span
        className={`market-ticker-change ${
          priceChange24h === null
            ? "unavailable"
            : isPositive
              ? "positive"
              : "negative"
        }`}
      >
        {priceChange24h === null
          ? "Unavailable"
          : `${isPositive ? "+" : ""}${priceChange24h.toFixed(2)}%`}
      </span>

      <div className="market-ticker-volume">
        <span>24H VOL</span>
        <strong>
          {volume24hUsd === null
            ? "Unavailable"
            : `$${formatCompactCurrency(volume24hUsd)}`}
        </strong>
      </div>

      {isRefreshing && <span className="market-ticker-refresh">Updating</span>}
    </div>
  );
}
