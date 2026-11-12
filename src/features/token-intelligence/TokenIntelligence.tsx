import { RefreshCw } from "lucide-react";

import { useSelectedToken } from "../../app/TokenContext";

import TokenOverview from "./TokenOverview";
import TokenMetrics from "./TokenMetrics";

export default function TokenIntelligence() {
  const {
    selectedToken,
    isLoading,
    isRefreshing,
    error,
    refreshTokens,
  } = useSelectedToken();

  if (isLoading) {
    return (
      <aside
        role="status"
        className="rounded-xl border border-white/10 bg-[#101513] p-5"
      >
        <p className="text-sm text-gray-400">
          Loading Dexscreener information...
        </p>
      </aside>
    );
  }

  if (error && !selectedToken) {
    return (
      <aside
        role="alert"
        className="rounded-xl border border-red-500/20 bg-[#101513] p-5"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-white">
            Token Intelligence
          </h2>

          <button
            type="button"
            onClick={() => void refreshTokens()}
            aria-label="Retry loading token information"
            className="text-emerald-400 hover:text-emerald-300"
          >
            <RefreshCw size={15} />
          </button>
        </div>

        <p className="mt-4 text-sm text-red-400">{error}</p>
      </aside>
    );
  }

  if (!selectedToken) {
    return (
      <aside className="rounded-xl border border-white/10 bg-[#101513] p-5">
        <p className="text-sm text-gray-400">No token information available.</p>
      </aside>
    );
  }

  return (
    <aside className="h-full rounded-xl border border-white/10 bg-[#101513] p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-white">
          Token Intelligence
        </h2>

        <div className="flex items-center gap-3">
          <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
            DEXSCREENER
          </span>

          <button
            type="button"
            onClick={() => void refreshTokens()}
            aria-label="Refresh token information"
            title="Refresh token information"
            disabled={isRefreshing}
            className={`text-gray-400 transition hover:text-emerald-400 disabled:opacity-50 ${isRefreshing ? "animate-spin" : ""}`}
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      {error && (
        <div
          role="status"
          className="mb-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs leading-relaxed text-amber-200/90"
        >
          Latest refresh failed. Showing the last successful data, which may be
          stale. {error}
        </div>
      )}

      <TokenOverview token={selectedToken} />

      <TokenMetrics
        metrics={selectedToken.metrics}
        quoteSymbol={selectedToken.quoteSymbol ?? "USD"}
      />
    </aside>
  );
}
