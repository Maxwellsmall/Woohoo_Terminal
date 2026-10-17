/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Token } from "../types";
import { tokenService } from "../services/token.service";

interface TokenContextType {
  selectedToken: Token | null;
  tokens: Token[];
  setSelectedToken: (token: Token) => void;
  isLoading: boolean;
  error: string | null;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

interface TokenProviderProps {
  children: ReactNode;
}

export function TokenProvider({ children }: TokenProviderProps) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadTokens() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await tokenService.getTokens();

        if (!active) return;

        setTokens(data);
        setSelectedToken((current) => {
          return (
            data.find((token) => token.id === current?.id) ?? data[0] ?? null
          );
        });
      } catch {
        if (active) {
          setError("Unable to load token information.");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadTokens();

    return () => {
      active = false;
    };
  }, []);

  return (
    <TokenContext.Provider
      value={{
        selectedToken,
        tokens,
        setSelectedToken,
        isLoading,
        error,
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
