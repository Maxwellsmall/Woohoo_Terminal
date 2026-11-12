import { useEffect, useState } from "react";
import { CheckCircle2, Copy, ExternalLink, X } from "lucide-react";
import type { Token } from "../../types";

interface TokenOverviewProps {
  token: Token;
}

interface CopyToast {
  status: "success" | "error";
  message: string;
}

function formatAmount(value: number | null): string {
  if (value === null) return "Unavailable";

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 3,
  }).format(value);
}

export default function TokenOverview({ token }: TokenOverviewProps) {
  const [logoFailed, setLogoFailed] = useState(false);
  const [copyToast, setCopyToast] = useState<CopyToast | null>(null);

  useEffect(() => {
    if (!copyToast) return;

    const timeoutId = window.setTimeout(() => setCopyToast(null), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [copyToast]);

  const copyAddress = async (address: string | null | undefined) => {
    if (!address) return;

    try {
      await navigator.clipboard.writeText(address);
      setCopyToast({
        status: "success",
        message: "Address copied to clipboard!",
      });
    } catch (error) {
      console.error("Unable to copy address", error);
      setCopyToast({
        status: "error",
        message: "Unable to copy address to clipboard.",
      });
    }
  };

  const addressRows = [
    { label: "Pair", address: token.pairAddress },
    { label: token.symbol, address: token.contractAddress },
    { label: token.quoteSymbol ?? "Quote", address: token.quoteContractAddress },
  ];

  return (
    <section className="border-b border-white/10 pb-3">
      <div className="mb-3 flex items-center gap-2">
        {token.logoUrl && !logoFailed ? (
          <img
            src={token.logoUrl}
            alt={`${token.symbol} logo`}
            className="h-9 w-9 rounded-full object-cover"
            referrerPolicy="no-referrer"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-400">
            {token.symbol.slice(0, 2)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold text-white">
            {token.name}
          </h2>
          <p className="truncate text-xs text-gray-400">
            {token.network} · {token.dexId ?? "DEX"} · {token.symbol}/
            {token.quoteSymbol ?? "Unavailable"}
          </p>
        </div>
        {token.pairUrl && (
          <a
            href={token.pairUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open market pair"
            title="Open market pair"
            className="shrink-0 text-emerald-400 hover:text-emerald-300"
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-white/10 bg-white/3 p-2">
          <span className="block text-[9px] uppercase tracking-wide text-gray-500">
            Pair created
          </span>
          <strong className="mt-1 block text-[10px] font-medium text-gray-200">
            {token.pairCreatedAt == null
              ? "Unavailable"
              : new Date(token.pairCreatedAt).toLocaleString()}
          </strong>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/3 p-2">
          <span className="block text-[9px] uppercase tracking-wide text-gray-500">
            Liquidity
          </span>
          <strong className="mt-1 block text-[10px] font-medium text-gray-200">
            {token.metrics.liquidityUsd == null
              ? "Unavailable"
              : new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  notation: "compact",
                  maximumFractionDigits: 2,
                }).format(token.metrics.liquidityUsd)}
          </strong>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/3 p-2">
          <span className="block truncate text-[9px] uppercase tracking-wide text-gray-500">
            Pooled {token.symbol}
          </span>
          <strong className="mt-1 block truncate text-[10px] font-medium text-gray-200">
            {formatAmount(token.metrics.pooledBase)}
          </strong>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/3 p-2">
          <span className="block truncate text-[9px] uppercase tracking-wide text-gray-500">
            Pooled {token.quoteSymbol ?? "quote"}
          </span>
          <strong className="mt-1 block truncate text-[10px] font-medium text-gray-200">
            {formatAmount(token.metrics.pooledQuote)}
          </strong>
        </div>
      </div>

      <div className="space-y-1">
        {addressRows.map(({ label, address }) => (
          <div
            className="flex min-w-0 items-center gap-2 rounded-md bg-white/3 px-2 py-1.5"
            key={label}
          >
            <span className="w-10 shrink-0 text-[9px] text-gray-500">
              {label}
            </span>
            <span
              className="min-w-0 flex-1 truncate font-mono text-[9px] text-gray-300"
              title={address ?? undefined}
            >
              {address ?? "Unavailable"}
            </span>
            <button
              type="button"
              onClick={() => void copyAddress(address)}
              disabled={!address}
              aria-label={`Copy ${label} address`}
              title={`Copy ${label} address`}
              className="shrink-0 text-gray-500 transition hover:text-emerald-400 disabled:opacity-40"
            >
              <Copy size={12} />
            </button>
          </div>
        ))}
      </div>

      {copyToast && (
        <div
          role={copyToast.status === "success" ? "status" : "alert"}
          aria-live={copyToast.status === "success" ? "polite" : "assertive"}
          className={`fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-md px-4 py-3 text-sm shadow-lg ${
            copyToast.status === "success"
              ? "bg-green-200 text-gray-900"
              : "bg-red-200 text-red-950"
          }`}
        >
          {copyToast.status === "success" ? (
            <CheckCircle2 size={16} aria-hidden="true" />
          ) : (
            <X size={16} aria-hidden="true" />
          )}
          <span>{copyToast.message}</span>
          <button
            type="button"
            aria-label="Close notification"
            onClick={() => setCopyToast(null)}
            className="ml-2 rounded p-1 transition hover:bg-black/10"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
