import type { Token } from "../types";

export const mockToken: Token = {
  id: "woohoo-demo",
  name: "Woohoo",
  symbol: "WHH",
  network: "Demo Network",
  contractAddress: null,

  metrics: {
    priceUsd: 0.0245,
    priceNative: 0.00012,
    marketCapUsd: 2450000,
    fdvUsd: 2600000,
    liquidityUsd: 385000,
    volume24hUsd: 128500,
    priceChange24h: 5.24,
    pooledBase: 8500,
    pooledQuote: 220,
    periods: {} as Token["metrics"]["periods"],
  },

  security: {
    contractVerification: "unknown",
    ownershipRenounced: null,
    liquidityLocked: null,
  },
};

export const secondMockToken: Token = {
  id: "sample-demo",
  name: "Sample Token",
  symbol: "SMP",
  network: "Demo Network",
  contractAddress: null,

  metrics: {
    priceUsd: 1.245,
    priceNative: 0.00018,
    marketCapUsd: 12500000,
    fdvUsd: 13500000,
    liquidityUsd: 850000,
    volume24hUsd: 425000,
    priceChange24h: -2.75,
    pooledBase: 12000,
    pooledQuote: 320,
    periods: {} as Token["metrics"]["periods"],
  },

  security: {
    contractVerification: "unknown",
    ownershipRenounced: null,
    liquidityLocked: null,
  },
};

export const mockTokens: Token[] = [mockToken, secondMockToken];