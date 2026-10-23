import { ChevronDown } from "lucide-react";

import { useSelectedToken } from "../../app/TokenContext";

export default function TokenSelector() {
  const { selectedToken, setSelectedToken, tokens, isLoading } =
    useSelectedToken();

  return (
    <div className="relative">
      <ChevronDown
        size={15}
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <select
        aria-label="Select token"
        value={selectedToken?.id ?? ""}
        disabled={isLoading || tokens.length === 0}
        onChange={(event) => {
          const token = tokens.find((item) => item.id === event.target.value);

          if (token) {
            setSelectedToken(token);
          }
        }}
        className="w-full min-w-40 appearance-none rounded-lg border border-white/10 bg-[#101513] px-3 py-2 pr-9 text-sm text-white outline-none focus:border-emerald-500 disabled:opacity-50"
      >
        {tokens.length === 0 && (
          <option value="">{isLoading ? "Loading..." : "No tokens"}</option>
        )}

        {tokens.map((token) => (
          <option key={token.id} value={token.id}>
            {token.symbol} — {token.name}
          </option>
        ))}
      </select>
    </div>
  );
}
