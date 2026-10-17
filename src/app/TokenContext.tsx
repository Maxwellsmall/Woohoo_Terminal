/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";

import type { Token } from "../types";
import { mockToken } from "../data/mock-data";

interface TokenContextType {
  selectedToken: Token;
  setSelectedToken: (token: Token) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

interface TokenProviderProps {
  children: ReactNode;
}

export function TokenProvider({ children }: TokenProviderProps) {
  const [selectedToken, setSelectedToken] = useState<Token>(mockToken);

  return (
    <TokenContext.Provider
      value={{
        selectedToken,
        setSelectedToken,
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
