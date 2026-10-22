export type Timeframe = "1m" | "5m" | "15m" | "1h" | "4h" | "1d";

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const intervals: Record<Timeframe, number> = {
  "1m": 1,
  "5m": 5,
  "15m": 15,
  "1h": 60,
  "4h": 240,
  "1d": 1440,
};

interface KrakenResponse {
  error: string[];
  result: Record<string, unknown>;
}

export async function getMarketCandles(
  timeframe: Timeframe,
  signal?: AbortSignal,
): Promise<Candle[]> {
  const interval = intervals[timeframe];

  const response = await fetch(
    `https://api.kraken.com/0/public/OHLC?pair=XBTUSD&interval=${interval}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Market request failed: ${response.status}`);
  }

  const data = (await response.json()) as KrakenResponse;

  if (data.error.length > 0) {
    throw new Error(data.error.join(", "));
  }

  const pairKey = Object.keys(data.result).find((key) => key !== "last");

  if (!pairKey) {
    throw new Error("Market data unavailable");
  }

  const rows = data.result[pairKey];

  if (!Array.isArray(rows)) {
    throw new Error("Invalid market response");
  }

  return rows
    .map((row): Candle => {
      if (!Array.isArray(row)) {
        throw new Error("Invalid candle data");
      }

      return {
        time: Number(row[0]),
        open: Number(row[1]),
        high: Number(row[2]),
        low: Number(row[3]),
        close: Number(row[4]),
        volume: Number(row[6]),
      };
    })
    .filter((candle) =>
      [
        candle.time,
        candle.open,
        candle.high,
        candle.low,
        candle.close,
        candle.volume,
      ].every(Number.isFinite),
    )
    .sort((a, b) => a.time - b.time);
}
