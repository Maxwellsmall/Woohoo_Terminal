import { useSelectedToken } from "../../app/TokenContext";

import TokenOverview from "./TokenOverview";
import TokenMetrics from "./TokenMetrics";
import SecurityPanel from "./SecurityPanel";

export default function TokenIntelligence() {
  const { selectedToken } = useSelectedToken();

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
