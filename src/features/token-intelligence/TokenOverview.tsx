import { useState } from "react";
import { Copy, ExternalLink } from "lucide-react";
import type { Token } from "../../types";

interface TokenOverviewProps {
  token: Token;
}

export default function TokenOverview({ token }: TokenOverviewProps) {
  const [logoFailed, setLogoFailed] = useState(false);
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
        {token.logoUrl && !logoFailed ? (
          <img
            src={token.logoUrl}
            alt={`${token.symbol} logo`}
            className="h-12 w-12 rounded-full object-cover"
            referrerPolicy="no-referrer"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-lg font-bold text-emerald-400">
            {token.symbol.slice(0, 2)}
          </div>
        )}

        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-white">
            {token.name}
          </h2>

          <p className="text-sm text-gray-400">{token.symbol}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-gray-400">Network</span>

          <span className="text-sm text-white">{token.network}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-gray-400">DEX</span>

          <span className="text-sm text-white">
            {token.dexId ?? "Unavailable"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-gray-400">Trading Pair</span>

          <span className="text-sm text-white">
            {token.symbol} / {token.quoteSymbol ?? "Unavailable"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-gray-400">Pair Address</span>
          <span
            className="max-w-[65%] truncate font-mono text-xs text-gray-300"
            title={token.pairAddress}
          >
            {token.pairAddress ?? "Unavailable"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-gray-400">Pair Created</span>
          <span className="text-xs text-gray-300">
            {token.pairCreatedAt === null || token.pairCreatedAt === undefined
              ? "Unavailable"
              : new Date(token.pairCreatedAt).toLocaleString()}
          </span>
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-400">Contract Address</p>

          <div className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
            <span className="truncate text-xs text-gray-300">
              {token.contractAddress ?? "Not available"}
            </span>

            <button
              type="button"
              onClick={copyAddress}
              disabled={!token.contractAddress}
              aria-label="Copy contract address"
              className="shrink-0 text-gray-400 transition hover:text-emerald-400 disabled:opacity-40"
            >
              <Copy size={15} />
            </button>
          </div>
        </div>

        {token.pairUrl ? (
          <a
            href={token.pairUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-500/30 py-2 text-sm text-emerald-400 transition hover:bg-emerald-500/10"
          >
            View Market Pair
            <ExternalLink size={14} />
          </a>
        ) : (
          <p className="text-center text-xs text-gray-500">
            Dexscreener pair page unavailable.
          </p>
        )}
      </div>
    </section>
  );
}
