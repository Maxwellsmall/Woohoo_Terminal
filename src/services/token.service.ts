import type { MarketPeriod, Token, TokenPeriodMetrics } from "../types";

const TOKEN_ADDRESS = "0x9244708F469199C2e1bC613d31e615E33Bf87777";
const DEXSCREENER_URL = `https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`;

type JsonRecord = Record<string, unknown>;

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

function nestedRecord(value: unknown, key: string): JsonRecord | null {
  const record = isRecord(value) ? value[key] : null;
  return isRecord(record) ? record : null;
}

function nestedValue(value: unknown, key: string): unknown {
  return isRecord(value) ? value[key] : null;
}

function mapPeriodMetrics(
  period: MarketPeriod,
  transactions: JsonRecord,
  volumes: JsonRecord,
  priceChanges: JsonRecord,
): TokenPeriodMetrics {
  const periodTransactions = nestedRecord(transactions, period);

  return {
    priceChangePct: finiteNumber(nestedValue(priceChanges, period)),
    volumeUsd: finiteNumber(nestedValue(volumes, period)),
    buys: finiteNumber(periodTransactions?.buys),
    sells: finiteNumber(periodTransactions?.sells),
  };
}

function safeDexscreenerUrl(value: unknown): string | undefined {
  const url = nonEmptyString(value);
  if (!url) return undefined;

  try {
    const parsed = new URL(url);
    if (
      parsed.protocol === "https:" &&
      (parsed.hostname === "dexscreener.com" ||
        parsed.hostname.endsWith(".dexscreener.com"))
    ) {
      return parsed.toString();
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function mapDexPair(value: unknown): Token | null {
  if (!isRecord(value)) return null;

  const baseToken = nestedRecord(value, "baseToken");
  const quoteToken = nestedRecord(value, "quoteToken");
  const chainId = nonEmptyString(value.chainId);
  const pairAddress = nonEmptyString(value.pairAddress);
  const baseAddress = nonEmptyString(baseToken?.address);
  const name = nonEmptyString(baseToken?.name);
  const symbol = nonEmptyString(baseToken?.symbol);
  const quoteAddress = nonEmptyString(quoteToken?.address);
  const quoteSymbol = nonEmptyString(quoteToken?.symbol);

  if (
    !chainId ||
    !pairAddress ||
    !baseAddress ||
    baseAddress.toLowerCase() !== TOKEN_ADDRESS.toLowerCase() ||
    !name ||
    !symbol ||
    !quoteAddress ||
    !quoteSymbol
  ) {
    return null;
  }

  const liquidity = nestedValue(value.liquidity, "usd");
  const volume = nestedValue(value.volume, "h24");
  const priceChange = nestedValue(value.priceChange, "h24");
  const liquidityBase = nestedValue(value.liquidity, "base");
  const liquidityQuote = nestedValue(value.liquidity, "quote");
  const pairTransactions = isRecord(value.txns) ? value.txns : {};
  const pairVolumes = isRecord(value.volume) ? value.volume : {};
  const pairPriceChanges = isRecord(value.priceChange) ? value.priceChange : {};
  const pairPeriods = {
    m5: mapPeriodMetrics("m5", pairTransactions, pairVolumes, pairPriceChanges),
    h1: mapPeriodMetrics("h1", pairTransactions, pairVolumes, pairPriceChanges),
    h6: mapPeriodMetrics("h6", pairTransactions, pairVolumes, pairPriceChanges),
    h24: mapPeriodMetrics("h24", pairTransactions, pairVolumes, pairPriceChanges),
  };
  const info = isRecord(value.info) ? value.info : null;
  const pairCreatedAt = finiteNumber(value.pairCreatedAt);
  const imageUrl = nonEmptyString(info?.imageUrl);
  const dexId = nonEmptyString(value.dexId);

  return {
    id: `${chainId}:${pairAddress}`.toLowerCase(),
    name,
    symbol,
    network: chainId,
    contractAddress: TOKEN_ADDRESS,
    ...(imageUrl ? { logoUrl: imageUrl } : {}),
    ...(dexId ? { dexId } : {}),
    pairAddress,
    pairUrl: safeDexscreenerUrl(value.url),
    quoteSymbol,
    quoteContractAddress: quoteAddress,
    pairCreatedAt,
    metrics: {
      priceUsd: finiteNumber(value.priceUsd),
      priceNative: finiteNumber(value.priceNative),
      marketCapUsd: finiteNumber(value.marketCap),
      fdvUsd: finiteNumber(value.fdv),
      liquidityUsd: finiteNumber(liquidity),
      pooledBase: finiteNumber(liquidityBase),
      pooledQuote: finiteNumber(liquidityQuote),
      volume24hUsd: finiteNumber(volume),
      priceChange24h: finiteNumber(priceChange),
      periods: pairPeriods,
    },
    security: {
      contractVerification: "unknown",
      ownershipRenounced: null,
      liquidityLocked: null,
    },
  };
}

export const tokenService = {
  async getTokens(signal?: AbortSignal): Promise<Token[]> {
    let response: Response;
    try {
      response = await fetch(DEXSCREENER_URL, {
        signal,
        headers: { Accept: "application/json" },
      });
    } catch (error) {
      if (signal?.aborted) throw error;
      throw new Error(
        "Unable to connect to Dexscreener. Check your connection and try again.",
        { cause: error },
      );
    }

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(
          "Dexscreener rate limit reached. Your last successful market data is being kept; please try again shortly.",
        );
      }

      throw new Error(`Dexscreener request failed: HTTP ${response.status}.`);
    }

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      throw new Error("Dexscreener returned an unreadable response.");
    }

    if (!isRecord(payload) || !("pairs" in payload)) {
      throw new Error("Dexscreener returned an invalid response structure.");
    }

    if (payload.pairs !== null && !Array.isArray(payload.pairs)) {
      throw new Error("Dexscreener returned a malformed trading-pair list.");
    }

    const pairs = Array.isArray(payload.pairs) ? payload.pairs : [];
    const uniquePairs = new Map<string, Token>();

    for (const pair of pairs) {
      const token = mapDexPair(pair);
      if (token && !uniquePairs.has(token.id)) {
        uniquePairs.set(token.id, token);
      }
    }

    const tokens = [...uniquePairs.values()].sort((first, second) => {
      const firstLiquidity = first.metrics.liquidityUsd;
      const secondLiquidity = second.metrics.liquidityUsd;
      if (firstLiquidity === null) return secondLiquidity === null ? 0 : 1;
      if (secondLiquidity === null) return -1;
      return secondLiquidity - firstLiquidity;
    });

    if (tokens.length === 0) {
      throw new Error(
        "Dexscreener returned no valid trading pairs for the Woohoo contract.",
      );
    }

    return tokens;
  },
};
