import { useEffect, useState } from "react";
import { useSelectedToken } from "../../app/TokenContext";
import { getMarketCandles } from "../../services/market.service";
import type { Candle, Timeframe } from "../../services/market.service";

interface CandleState {
  key: string;
  candles: Candle[];
  loading: boolean;
  error: string | null;
}

export function useMarketCandles(timeframe: Timeframe) {
  const { selectedToken } = useSelectedToken();
  const network = selectedToken?.network ?? "";
  const pairAddress = selectedToken?.pairAddress ?? "";
  const requestKey = `${network}:${pairAddress}:${timeframe}`;
  const [state, setState] = useState<CandleState | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    if (!network || !pairAddress) return () => controller.abort();

    async function loadCandles() {
      try {
        const candles = await getMarketCandles(
          network,
          pairAddress,
          timeframe,
          controller.signal,
        );

        if (controller.signal.aborted) return;
        setState({
          key: requestKey,
          candles,
          loading: false,
          error:
            candles.length === 0
              ? "No historical candles are available for this pair and timeframe."
              : null,
        });
      } catch (requestError) {
        if (controller.signal.aborted) return;
        setState({
          key: requestKey,
          candles: [],
          loading: false,
          error:
            requestError instanceof Error
              ? requestError.message
              : "Unable to load historical market data.",
        });
      }
    }

    void loadCandles();
    return () => controller.abort();
  }, [network, pairAddress, requestKey, timeframe]);

  if (!state || state.key !== requestKey) {
    return {
      candles: [],
      loading: Boolean(network && pairAddress),
      error: network && pairAddress
        ? null
        : "Select a token with an available trading pair.",
    };
  }

  return state;
}
