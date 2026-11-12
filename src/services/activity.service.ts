import type { Token } from "../types";
import type {
  ActivityKind,
  ActivityResponse,
  TokenActivity,
} from "../features/activity-feed/activity.types";

type JsonRecord = Record<string, unknown>;

type ActivityPair = Pick<
  Token,
  | "network"
  | "pairAddress"
  | "contractAddress"
  | "dexId"
>;

const explorerHosts: Record<string, string> = {
  arbitrum: "https://arbiscan.io",
  avalanche: "https://snowtrace.io",
  base: "https://basescan.org",
  bsc: "https://bscscan.com",
  eth: "https://etherscan.io",
  optimism: "https://optimistic.etherscan.io",
  polygon: "https://polygonscan.com",
  polygon_pos: "https://polygonscan.com",
  solana: "https://solscan.io",
};

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function finiteNumber(value: unknown): number | null {
  if (
    (typeof value !== "number" && typeof value !== "string") ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function getActivityKind(value: unknown): ActivityKind {
  if (value === "buy" || value === "sell") return value;
  return "unknown";
}

function getExplorerHost(network: string): string | null {
  return explorerHosts[network.toLowerCase()] ?? null;
}

function mapTrade(
  value: unknown,
  token: ActivityPair,
  explorerHost: string | null,
): TokenActivity | null {
  if (!isRecord(value) || !isRecord(value.attributes)) return null;

  const attributes = value.attributes;
  const transactionHash = nonEmptyString(attributes.tx_hash);
  const timestamp = nonEmptyString(attributes.block_timestamp);
  const walletAddress = nonEmptyString(attributes.tx_from_address);
  const id = nonEmptyString(value.id);
  const baseTokenAddress = nonEmptyString(attributes.from_token_address);
  const quoteTokenAddress = nonEmptyString(attributes.to_token_address);
  if (!transactionHash || !timestamp || !id || !baseTokenAddress || !quoteTokenAddress) {
    return null;
  }

  const parsedTimestamp = Date.parse(timestamp);
  if (!Number.isFinite(parsedTimestamp)) return null;

  const baseAmount = finiteNumber(attributes.from_token_amount);
  const quoteAmount = finiteNumber(attributes.to_token_amount);
  const baseIsWoohoo =
    baseTokenAddress.toLowerCase() === token.contractAddress?.toLowerCase();
  const quoteIsWoohoo =
    quoteTokenAddress.toLowerCase() === token.contractAddress?.toLowerCase();

  if (!baseIsWoohoo && !quoteIsWoohoo) return null;

  const tokenAmount = baseIsWoohoo ? baseAmount : quoteIsWoohoo ? quoteAmount : null;
  const quoteAmountValue = baseIsWoohoo ? quoteAmount : quoteIsWoohoo ? baseAmount : null;
  const usdValue = finiteNumber(attributes.volume_in_usd);
  const tokenPriceUsd = finiteNumber(
    baseIsWoohoo
      ? attributes.price_from_in_usd
      : attributes.price_to_in_usd,
  );
  const explorerUrl = explorerHost
    ? new URL(`/tx/${encodeURIComponent(transactionHash)}`, explorerHost).toString()
    : null;
  const walletExplorerUrl =
    walletAddress && explorerHost
      ? new URL(
          token.network.toLowerCase() === "solana"
            ? `/account/${encodeURIComponent(walletAddress)}`
            : `/address/${encodeURIComponent(walletAddress)}`,
          explorerHost,
        ).toString()
      : null;

  return {
    id,
    transactionHash,
    timestamp: parsedTimestamp,
    kind: getActivityKind(attributes.kind),
    tokenAmount,
    quoteAmount: quoteAmountValue,
    usdValue: usdValue !== null && usdValue >= 0 ? usdValue : null,
    tokenPriceUsd:
      tokenPriceUsd !== null && tokenPriceUsd > 0 ? tokenPriceUsd : null,
    walletAddress,
    walletExplorerUrl,
    pairAddress: token.pairAddress ?? "",
    network: token.network,
    dex: token.dexId ?? null,
    explorerUrl,
  };
}

export const activityService = {
  async getRecentTrades(
    token: ActivityPair,
    signal?: AbortSignal,
  ): Promise<ActivityResponse> {
    if (!token.network || !token.pairAddress || !token.contractAddress) {
      throw new Error("A selected network, pair, and token contract are required.");
    }

    const explorerHost = getExplorerHost(token.network);

    const url =
      `https://api.geckoterminal.com/api/v2/networks/${encodeURIComponent(token.network)}` +
      `/pools/${encodeURIComponent(token.pairAddress)}/trades?token=${encodeURIComponent(token.contractAddress)}`;

    let response: Response;
    try {
      response = await fetch(url, {
        signal,
        headers: { Accept: "application/json" },
      });
    } catch (error) {
      if (signal?.aborted) throw error;
      throw new Error(
        "On-chain activity is temporarily unavailable. Unable to connect to GeckoTerminal.",
        { cause: error },
      );
    }

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(
          "GeckoTerminal activity rate limit reached. Retrying at the next scheduled update.",
        );
      }

      throw new Error(
        `On-chain activity is temporarily unavailable. GeckoTerminal returned HTTP ${response.status}.`,
      );
    }

    let payload: unknown;
    try {
      payload = await response.json();
    } catch (error) {
      throw new Error("GeckoTerminal returned an unreadable activity response.", {
        cause: error,
      });
    }

    if (!isRecord(payload) || !Array.isArray(payload.data)) {
      throw new Error("GeckoTerminal returned an invalid activity response.");
    }

    const activitiesById = new Map<string, TokenActivity>();
    for (const trade of payload.data) {
      const activity = mapTrade(trade, token, explorerHost);
      if (activity) activitiesById.set(activity.id, activity);
    }

    const activities = [...activitiesById.values()].sort(
      (first, second) => second.timestamp - first.timestamp,
    );

    return { activities, updatedAt: Date.now() };
  },
};
