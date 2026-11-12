export type Timeframe = "1m" | "5m" | "15m" | "1h" | "4h" | "1d";

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

type JsonRecord = Record<string, unknown>;

const timeframeConfig: Record<
  Timeframe,
  { interval: "minute" | "hour" | "day"; aggregate: number }
> = {
  "1m": { interval: "minute", aggregate: 1 },
  "5m": { interval: "minute", aggregate: 5 },
  "15m": { interval: "minute", aggregate: 15 },
  "1h": { interval: "hour", aggregate: 1 },
  "4h": { interval: "hour", aggregate: 4 },
  "1d": { interval: "day", aggregate: 1 },
};

const networkAliases: Record<string, string> = {
  ethereum: "eth",
  eth: "eth",
  bsc: "bsc",
  "binance-smart-chain": "bsc",
  base: "base",
  arbitrum: "arbitrum",
  optimism: "optimism",
  polygon: "polygon_pos",
  polygon_pos: "polygon_pos",
  "polygon-pos": "polygon_pos",
  avalanche: "avax",
  avax: "avax",
  solana: "solana",
  opbnb: "opbnb",
  mantle: "mantle",
};

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toFiniteNumber(value: unknown): number | null {
  if (
    (typeof value !== "number" && typeof value !== "string") ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function getGeckoNetwork(network: string): string | null {
  const networkId = network.trim().toLowerCase();
  return networkAliases[networkId] ?? null;
}

export async function getMarketCandles(
  network: string,
  pairAddress: string,
  timeframe: Timeframe,
  signal?: AbortSignal,
): Promise<Candle[]> {
  if (!network.trim() || !pairAddress.trim()) {
    throw new Error("A network and trading pair are required for chart data.");
  }

  const geckoNetwork = getGeckoNetwork(network);
  if (!geckoNetwork) {
    throw new Error(
      `Chart data is not configured for the ${network} network yet.`,
    );
  }

  const config = timeframeConfig[timeframe];
  const params = new URLSearchParams({
    aggregate: String(config.aggregate),
    limit: "100",
    currency: "usd",
    token: "base",
  });
  const url =
    `https://api.geckoterminal.com/api/v2/networks/` +
    `${encodeURIComponent(geckoNetwork)}/pools/${encodeURIComponent(pairAddress)}/ohlcv/` +
    `${config.interval}?${params.toString()}`;

  let response: Response;
  try {
    response = await fetch(url, {
      signal,
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new Error(
      "Unable to connect to GeckoTerminal. Historical candles may be unavailable from this browser or network.",
      { cause: error },
    );
  }

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error(
        "GeckoTerminal chart-data rate limit reached. Try again shortly.",
      );
    }

    if (response.status === 404) {
      throw new Error(
        "Historical candles are not available for this network and pair.",
      );
    }

    throw new Error(`GeckoTerminal request failed: HTTP ${response.status}.`);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new Error("GeckoTerminal returned an unreadable response.");
  }

  if (!isRecord(payload)) {
    throw new Error("GeckoTerminal returned an invalid response structure.");
  }

  const data = isRecord(payload.data) ? payload.data : null;
  const attributes =
    data && isRecord(data.attributes) ? data.attributes : null;
  const rows = attributes?.ohlcv_list;

  if (!Array.isArray(rows)) {
    throw new Error("GeckoTerminal returned an invalid candle list.");
  }

  return rows
    .filter((row): row is unknown[] => Array.isArray(row) && row.length >= 6)
    .map((row): Candle | null => {
      const values = row.slice(0, 6).map(toFiniteNumber);
      if (values.some((value) => value === null)) return null;

      const [time, open, high, low, close, volume] = values as [
        number,
        number,
        number,
        number,
        number,
        number,
      ];
      if (
        time < 0 ||
        open <= 0 ||
        high <= 0 ||
        low <= 0 ||
        close <= 0 ||
        volume < 0 ||
        high < Math.max(open, close, low) ||
        low > Math.min(open, close, high)
      ) {
        return null;
      }

      return { time, open, high, low, close, volume };
    })
    .filter((candle): candle is Candle => candle !== null)
    .sort((first, second) => first.time - second.time);
}
