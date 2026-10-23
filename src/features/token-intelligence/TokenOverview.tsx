import { Copy, ExternalLink } from "lucide-react";
import type { Token } from "../../types";

interface TokenOverviewProps {
  token: Token;
}

export default function TokenOverview({ token }: TokenOverviewProps) {
  const copyAddress = async () => {
    if (!token.contractAddress) return;

    try {
      await navigator.clipboard.writeText(token.contractAddress);
    } catch {
      console.error("Unable to copy contract address");
    }
  };

  return (
    <section className="border-b border-white/10 pb-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-lg font-bold text-emerald-400">
          {token.symbol.slice(0, 2)}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">{token.name}</h2>

          <p className="text-sm text-gray-400">{token.symbol}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Network</span>

          <span className="text-sm text-white">{token.network}</span>
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-400">Contract Address</p>

          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
            <span className="truncate text-xs text-gray-300">
              {token.contractAddress ?? "Not available"}
            </span>

            <button
              type="button"
              onClick={copyAddress}
              disabled={!token.contractAddress}
              aria-label="Copy contract address"
              className="ml-2 text-gray-400 transition hover:text-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Copy size={15} />
            </button>
          </div>
        </div>

        <button
          type="button"
          disabled
          className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-white/10 py-2 text-sm text-gray-500"
        >
          View on Explorer
          <ExternalLink size={14} />
        </button>
      </div>
    </section>
  );
}
