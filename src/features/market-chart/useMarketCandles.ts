import { useEffect, useState } from "react";

import {
  getMarketCandles,
  type Candle,
  type Timeframe,
} from "../../services/market.service";

interface MarketState {
  candles: Candle[];
  loading: boolean;
  error: string | null;
}

export function useMarketCandles(timeframe: Timeframe) {
  const [state, setState] = useState<MarketState>({
    candles: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setState((previous) => ({
        ...previous,
        loading: true,
        error: null,
      }));

      try {
        const candles = await getMarketCandles(timeframe, controller.signal);

        if (!controller.signal.aborted) {
          setState({
            candles,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (controller.signal.aborted) return;

        setState({
          candles: [],
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "Unable to load market data",
        });
      }
    }

    void load();

    return () => controller.abort();
  }, [timeframe]);

  return state;
}
