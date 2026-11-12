import { useSelectedToken } from "../../app/TokenContext";

interface TokenSelectorProps {
  onSelect?: () => void;
}

export default function TokenSelector({ onSelect }: TokenSelectorProps) {
  const { selectedToken, setSelectedToken, tokens, isLoading, isRefreshing } =
    useSelectedToken();

  return (
    <div>
      <label className="settings-label" htmlFor="settings-pair-selector">
        Active pair and network
      </label>
      <select
        id="settings-pair-selector"
        aria-label="Select active trading pair and network"
        value={selectedToken?.id ?? ""}
        disabled={isLoading || tokens.length === 0}
        onChange={(event) => {
          const token = tokens.find((item) => item.id === event.target.value);
          if (!token) return;

          setSelectedToken(token);
          onSelect?.();
        }}
        className="pair-selector settings-pair-selector"
      >
        {tokens.length === 0 && (
          <option value="">
            {isLoading ? "Loading pairs..." : "No pairs available"}
          </option>
        )}
        {tokens.map((token) => (
          <option key={token.id} value={token.id}>
            {token.symbol}/{token.quoteSymbol ?? "?"} · {token.dexId ?? "DEX"} ·{" "}
            {token.network}
          </option>
        ))}
      </select>
      {isRefreshing && (
        <span className="sr-only" role="status">
          Refreshing trading pairs
        </span>
      )}
    </div>
  );
}
