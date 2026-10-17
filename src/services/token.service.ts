import type { Token } from "../types";
import { mockTokens } from "../data/mock-data";

const SIMULATED_DELAY = 400;

const wait = (milliseconds: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

export const tokenService = {
  async getTokens(): Promise<Token[]> {
    await wait(SIMULATED_DELAY);
    return mockTokens;
  },

  async getTokenById(id: string): Promise<Token | null> {
    await wait(SIMULATED_DELAY);

    return mockTokens.find((token) => token.id === id) ?? null;
  },

  async searchTokens(query: string): Promise<Token[]> {
    await wait(SIMULATED_DELAY);

    const search = query.trim().toLowerCase();

    return mockTokens.filter((token) => {
      return (
        token.name.toLowerCase().includes(search) ||
        token.symbol.toLowerCase().includes(search) ||
        token.network.toLowerCase().includes(search) ||
        (token.contractAddress?.toLowerCase().includes(search) ?? false)
      );
    });
  },
};
