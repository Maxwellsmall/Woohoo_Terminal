import { useState } from "react";
import { Search, X } from "lucide-react";

import { useSelectedToken } from "../../app/TokenContext";

export default function TokenSearch() {
  const { tokens, setSelectedToken, isLoading } = useSelectedToken();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredTokens = tokens.filter((token) => {
    const search = query.trim().toLowerCase();

    return (
      token.name.toLowerCase().includes(search) ||
      token.symbol.toLowerCase().includes(search) ||
      token.network.toLowerCase().includes(search) ||
      (token.contractAddress?.toLowerCase().includes(search) ?? false)
    );
  });

  const handleSelect = (tokenId: string) => {
    const token = tokens.find((item) => item.id === tokenId);

    if (!token) return;

    setSelectedToken(token);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 transition focus-within:border-violet-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-violet-100">
        <Search size={17} className="shrink-0 text-slate-400" />

        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsOpen(false);
            }
          }}
          placeholder="Search tokens..."
          aria-label="Search tokens"
          aria-expanded={isOpen}
          aria-controls="token-search-results"
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            aria-label="Clear search"
            className="text-slate-400 hover:text-slate-700"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          id="token-search-results"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
        >
          <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Demo Tokens
          </div>

          {isLoading ? (
            <p className="px-3 py-4 text-center text-sm text-slate-500">
              Loading tokens...
            </p>
          ) : filteredTokens.length > 0 ? (
            filteredTokens.map((token) => (
              <button
                key={token.id}
                type="button"
                onClick={() => handleSelect(token.id)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition hover:bg-violet-50"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {token.name}
                  </p>

                  <p className="text-xs text-slate-500">{token.network}</p>
                </div>

                <span className="rounded-full bg-violet-50 px-2 py-0.5 text-xs font-semibold text-violet-600">
                  {token.symbol}
                </span>
              </button>
            ))
          ) : (
            <p className="px-3 py-4 text-center text-sm text-slate-500">
              No matching tokens found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}