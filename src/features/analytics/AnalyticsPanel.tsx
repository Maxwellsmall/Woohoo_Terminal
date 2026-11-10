import { useSelectedToken } from "../../app/TokenContext";

function formatCurrency(value: number | null): string {
  if (value === null) return "Unavailable";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function AnalyticsPanel() {
  const { selectedToken } = useSelectedToken();

  const metrics = selectedToken
    ? [
        ["MARKET CAP", formatCurrency(selectedToken.metrics.marketCapUsd)],
        ["FDV", formatCurrency(selectedToken.metrics.fdvUsd)],
        ["LIQUIDITY", formatCurrency(selectedToken.metrics.liquidityUsd)],
        ["24H VOLUME", formatCurrency(selectedToken.metrics.volume24hUsd)],
      ]
    : [];

  return (
    <div className="analytics-content">
      <div className="analytics-title">
        <h2>PAIR ANALYTICS</h2>
        <span>Dexscreener market data</span>
      </div>

      {selectedToken ? (
        <div className="analytics-grid">
          {metrics.map(([label, value]) => (
            <section className="analytics-metric" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </section>
          ))}
          <p className="analytics-disclaimer">
            Portfolio holdings and network statistics are not connected.
          </p>
        </div>
      ) : (
        <p className="analytics-empty" role="status">
          Pair analytics will appear when valid market data is available.
        </p>
      )}
    </div>
  );
}
