/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { Token } from "../types";
import { tokenService } from "../services/token.service";

const REFRESH_INTERVAL_MS = 45_000;

interface TokenContextType {
  selectedToken: Token | null;
  tokens: Token[];
  setSelectedToken: (token: Token) => void;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  refreshTokens: () => Promise<void>;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

interface TokenProviderProps {
  children: ReactNode;
}

export function TokenProvider({ children }: TokenProviderProps) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedPairId, setSelectedPairId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestRef = useRef<AbortController | null>(null);
  const hasLoadedDataRef = useRef(false);

  const refreshTokens = useCallback(async () => {
    if (requestRef.current && !requestRef.current.signal.aborted) return;

    const controller = new AbortController();
    requestRef.current = controller;
    setIsLoading(!hasLoadedDataRef.current);
    setIsRefreshing(true);
    setError(null);

    try {
      const data = await tokenService.getTokens(controller.signal);
      if (controller.signal.aborted || requestRef.current !== controller) return;

      setTokens(data);
      setSelectedPairId((currentId) =>
        data.some((token) => token.id === currentId)
          ? currentId
          : (data[0]?.id ?? null),
      );
      hasLoadedDataRef.current = true;
    } catch (requestError) {
      if (controller.signal.aborted || requestRef.current !== controller) return;

      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to retrieve token information.",
      );
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    void refreshTokens();
    const intervalId = window.setInterval(
      () => void refreshTokens(),
      REFRESH_INTERVAL_MS,
    );

    return () => {
      window.clearInterval(intervalId);
      requestRef.current?.abort();
      requestRef.current = null;
    };
  }, [refreshTokens]);

  const setSelectedToken = useCallback((token: Token) => {
    setSelectedPairId(token.id);
  }, []);

  const selectedToken = useMemo(
    () => tokens.find((token) => token.id === selectedPairId) ?? null,
    [tokens, selectedPairId],
  );

  return (
    <TokenContext.Provider
      value={{
        selectedToken,
        tokens,
        setSelectedToken,
        isLoading,
        isRefreshing,
        error,
        refreshTokens,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export function useSelectedToken() {
  const context = useContext(TokenContext);

  if (!context) {
    throw new Error("useSelectedToken must be used inside TokenProvider");
  }

  return context;
}
