import { useState } from "react";
import { Search, X } from "lucide-react";

import { useSelectedToken } from "../../app/TokenContext";
import { mockTokens } from "../../data/mock-data";

export default function TokenSearch() {
  const { setSelectedToken } = useSelectedToken();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredTokens = mockTokens.filter((token) => {
    const search = query.trim().toLowerCase();

    return (
      token.name.toLowerCase().includes(search) ||
      token.symbol.toLowerCase().includes(search) ||
      token.network.toLowerCase().includes(search) ||
      (token.contractAddress?.toLowerCase().includes(search) ?? false)
    );
  });

  const handleSelect = (tokenId: string) => {
    const token = mockTokens.find((item) => item.id === tokenId);

    if (!token) return;

    setSelectedToken(token);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#101513] px-3 py-2 focus-within:border-emerald-500">
        <Search size={17} className="shrink-0 text-gray-400" />

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
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            aria-label="Clear search"
            className="text-gray-400 hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          id="token-search-results"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-white/10 bg-[#101513] p-2 shadow-2xl"
        >
          <div className="mb-2 px-2 text-xs text-gray-500">Demo Tokens</div>

          {filteredTokens.length > 0 ? (
            filteredTokens.map((token) => (
              <button
                key={token.id}
                type="button"
                onClick={() => handleSelect(token.id)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left transition hover:bg-white/5"
              >
                <div>
                  <p className="text-sm font-medium text-white">{token.name}</p>

                  <p className="text-xs text-gray-400">{token.network}</p>
                </div>

                <span className="text-xs font-semibold text-emerald-400">
                  {token.symbol}
                </span>
              </button>
            ))
          ) : (
            <p className="px-3 py-4 text-center text-sm text-gray-400">
              No matching tokens found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
