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
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
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
        className="w-full min-w-40 appearance-none rounded-full border border-slate-200 bg-white px-4 py-2 pr-10 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:opacity-50"
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