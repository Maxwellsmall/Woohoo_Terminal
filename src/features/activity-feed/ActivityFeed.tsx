import { useEffect, useMemo, useState } from "react";
import { ExternalLink, RefreshCw, Search } from "lucide-react";
import { useSelectedToken } from "../../app/TokenContext";
import { activityService } from "../../services/activity.service";
import type {
  ActivityFilter,
  TokenActivity,
} from "./activity.types";
import PanelHeading from "../../components/layout/PanelHeading";

const REFRESH_INTERVAL_MS = 30_000;
const EMPTY_ACTIVITIES: TokenActivity[] = [];
const FILTERS: { label: string; value: ActivityFilter }[] = [
  { label: "ALL", value: "all" },
  { label: "BUYS", value: "buy" },
  { label: "SELLS", value: "sell" },
];

interface ActivityState {
  key: string;
  activities: TokenActivity[];
  loading: boolean;
  error: string | null;
  updatedAt: number | null;
}

function formatAmount(value: number | null, maximumFractionDigits = 4): string {
  if (value === null) return "Unavailable";

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
}

function formatUsd(value: number | null): string {
  if (value === null) return "Unavailable";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: value >= 1_000 ? "compact" : "standard",
    maximumFractionDigits: value >= 1_000 ? 2 : 4,
  }).format(value);
}

function formatRelativeTime(timestamp: number, now: number): string {
  const seconds = Math.max(0, Math.floor((now - timestamp) / 1_000));
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  return `${Math.floor(hours / 24)}d ago`;
}

function truncateAddress(address: string): string {
  if (address.length <= 14) return address;
  return `${address.slice(0, 7)}…${address.slice(-5)}`;
}

export default function ActivityFeed() {
  const { selectedToken, isLoading: isTokenLoading } = useSelectedToken();
  const network = selectedToken?.network ?? "";
  const pairAddress = selectedToken?.pairAddress ?? "";
  const contractAddress = selectedToken?.contractAddress ?? "";
  const dex = selectedToken?.dexId ?? "";
  const requestKey = `${network}:${pairAddress}:${contractAddress}`;
  const [state, setState] = useState<ActivityState | null>(null);
  const [filter, setFilter] = useState<ActivityFilter>("all");
  const [query, setQuery] = useState("");
  const [now, setNow] = useState(Date.now());
  const [refreshVersion, setRefreshVersion] = useState(0);

  useEffect(() => {
    const timerId = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (!network || !pairAddress || !contractAddress) return;

    const controller = new AbortController();
    const token = {
      network,
      pairAddress,
      contractAddress,
      dexId: dex || undefined,
    };
    let timeoutId: number | undefined;

    const loadActivity = async () => {
      try {
        const result = await activityService.getRecentTrades(
          token,
          controller.signal,
        );
        if (controller.signal.aborted) return;

        setState((current) => ({
          key: requestKey,
          activities:
            current?.key === requestKey
              ? mergeActivities(current.activities, result.activities)
              : result.activities,
          loading: false,
          error: null,
          updatedAt: result.updatedAt,
        }));
      } catch (requestError) {
        if (controller.signal.aborted) return;

        setState((current) => ({
          key: requestKey,
          activities:
            current?.key === requestKey ? current.activities : [],
          loading: false,
          error:
            requestError instanceof Error
              ? requestError.message
              : "On-chain activity is temporarily unavailable.",
          updatedAt: current?.key === requestKey ? current.updatedAt : null,
        }));
      } finally {
        if (!controller.signal.aborted) {
          timeoutId = window.setTimeout(
            () => void loadActivity(),
            REFRESH_INTERVAL_MS,
          );
        }
      }
    };

    void loadActivity();
    return () => {
      controller.abort();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [
    contractAddress,
    dex,
    network,
    pairAddress,
    requestKey,
    refreshVersion,
  ]);

  const currentState =
    state?.key === requestKey ? state : null;
  const activities = currentState?.activities ?? EMPTY_ACTIVITIES;
  const visibleActivities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return activities.filter((activity) => {
      const matchesFilter = filter === "all" || activity.kind === filter;
      const searchable = [
        activity.transactionHash,
        activity.walletAddress ?? "",
        activity.kind,
        activity.dex ?? "",
        activity.tokenAmount?.toString() ?? "",
        activity.usdValue?.toString() ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && searchable.includes(normalizedQuery);
    });
  }, [activities, filter, query]);

  const loading = !currentState || currentState.loading;

  return (
    <div className="feed-content">
      <PanelHeading
        title="ACTIVITY STREAM"
        action={
          <span className="activity-source">
            GECKOTERMINAL · 24H TRADES
          </span>
        }
      />

      <div className="feed-toolbar">
        <div className="feed-filters" aria-label="Filter transactions">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={filter === value ? "active" : ""}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="activity-update">
          {currentState?.updatedAt
            ? `Updated ${new Date(currentState.updatedAt).toLocaleTimeString()}`
            : loading
              ? "Loading"
              : "Not updated"}
        </span>
      </div>

      <label className="activity-search">
        <Search size={14} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search wallet or transaction..."
          aria-label="Search fetched transactions"
        />
      </label>

      {currentState?.error && (
        <p className="activity-error" role="status">
          {currentState.error}
        </p>
      )}

      <div className="activity-list" aria-live="polite">
        {loading && activities.length === 0 && (
          <p className="activity-state" role="status">
            {isTokenLoading
              ? "Loading selected trading pair..."
              : "Loading recent transactions..."}
          </p>
        )}

        {!loading && !currentState?.error && activities.length === 0 && (
          <p className="activity-state">
            No recent transactions found for this pair.
          </p>
        )}

        {!loading && activities.length > 0 && visibleActivities.length === 0 && (
          <p className="activity-state">No matching transactions.</p>
        )}

        {visibleActivities.map((activity) => (
          <article className="activity-item" key={activity.id}>
            <div className="activity-meta">
              <span className={`activity-kind ${activity.kind}`}>
                {activity.kind === "unknown"
                  ? "UNKNOWN"
                  : activity.kind.toUpperCase()}
              </span>
              <time dateTime={new Date(activity.timestamp).toISOString()}>
                {formatRelativeTime(activity.timestamp, now)}
              </time>
            </div>

            <div className="activity-amounts">
              <strong>
                {formatAmount(activity.tokenAmount)}{" "}
                {selectedToken?.symbol ?? "tokens"}
              </strong>
              <span>{formatUsd(activity.usdValue)}</span>
            </div>

            <div className="activity-details">
              <span
                title={activity.walletAddress ?? "Wallet address unavailable"}
              >
                {activity.walletAddress
                  ? truncateAddress(activity.walletAddress)
                  : "Wallet unavailable"}
              </span>
              <span>
                {activity.quoteAmount === null
                  ? "Quote amount unavailable"
                  : `${formatAmount(activity.quoteAmount)} ${selectedToken?.quoteSymbol ?? "quote"}`}
              </span>
            </div>

            <div className="activity-footer">
              <span>{activity.dex ?? "DEX unavailable"}</span>
              {activity.explorerUrl ? (
                <a
                  href={activity.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Open transaction ${activity.transactionHash} in the block explorer`}
                  aria-label={`View transaction ${truncateAddress(activity.transactionHash)} in block explorer`}
                >
                  {truncateAddress(activity.transactionHash)}
                  <ExternalLink size={11} aria-hidden="true" />
                </a>
              ) : (
                <span title={activity.transactionHash}>
                  {truncateAddress(activity.transactionHash)}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      <footer className="feed-footer">
        <span>{selectedToken?.network ?? "Network unavailable"}</span>
        <button
          type="button"
          className="activity-refresh"
          disabled={loading}
          onClick={() => {
            setState((current) =>
              current?.key === requestKey
                ? { ...current, loading: true, error: null }
                : current,
            );
            setRefreshVersion((version) => version + 1);
          }}
          title="Activity refreshes automatically every 30 seconds"
        >
          <RefreshCw size={12} aria-hidden="true" />
          30s refresh
        </button>
      </footer>
    </div>
  );
}

function mergeActivities(
  existing: TokenActivity[],
  incoming: TokenActivity[],
): TokenActivity[] {
  const activities = new Map(
    existing.map((activity) => [activity.id, activity]),
  );

  for (const activity of incoming) {
    activities.set(activity.id, activity);
  }

  return [...activities.values()]
    .sort((first, second) => second.timestamp - first.timestamp)
    .slice(0, 300);
}
