import type { Token } from "../types";
import { mockTokens } from "../data/mock-data";

const SIMULATED_DELAY = 400;

const wait = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });

export interface TokenSearchParams {
  query?: string;
  network?: string;
}

function matchesQuery(token: Token, query: string): boolean {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return (
    token.name.toLowerCase().includes(normalizedQuery) ||
    token.symbol.toLowerCase().includes(normalizedQuery) ||
    token.network.toLowerCase().includes(normalizedQuery) ||
    (token.contractAddress?.toLowerCase().includes(normalizedQuery) ?? false)
  );
}

export const tokenService = {
  async getTokens(): Promise<Token[]> {
    await wait(SIMULATED_DELAY);

    return mockTokens;
  },

  async getTokenById(id: string): Promise<Token | null> {
    await wait(SIMULATED_DELAY);

    return mockTokens.find((token) => token.id === id) ?? null;
  },

  async searchTokens(params: TokenSearchParams = {}): Promise<Token[]> {
    await wait(SIMULATED_DELAY);

    return mockTokens.filter((token) => {
      const matchesNetwork =
        !params.network ||
        token.network.toLowerCase() === params.network.toLowerCase();

      return matchesNetwork && matchesQuery(token, params.query ?? "");
    });
  },
};
