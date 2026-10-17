import { useSelectedToken } from "../../app/TokenContext";

import TokenOverview from "./TokenOverview";
import TokenMetrics from "./TokenMetrics";
import SecurityPanel from "./SecurityPanel";

export default function TokenIntelligence() {
  const { selectedToken, isLoading, error } = useSelectedToken();

  if (isLoading) {
    return (
      <aside
        role="status"
        className="rounded-xl border border-white/10 bg-[#101513] p-5"
      >
        <p className="text-sm text-gray-400">Loading token information...</p>
      </aside>
    );
  }

  if (error) {
    return (
      <aside
        role="alert"
        className="rounded-xl border border-red-500/20 bg-[#101513] p-5"
      >
        <p className="text-sm text-red-400">{error}</p>
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

        <span className="rounded-md bg-amber-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-400">
          Demo Data
        </span>
      </div>

      <TokenOverview token={selectedToken} />

      <TokenMetrics metrics={selectedToken.metrics} />

      <SecurityPanel security={selectedToken.security} />
    </aside>
  );
}
