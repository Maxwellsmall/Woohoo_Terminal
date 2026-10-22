import type { Token } from "../types";

export const mockToken: Token = {
  id: "woohoo-demo",
  name: "Woohoo",
  symbol: "WHH",
  network: "Demo Network",
  contractAddress: null,

  metrics: {
    priceUsd: 0.0245,
    marketCapUsd: 2450000,
    liquidityUsd: 385000,
    volume24hUsd: 128500,
    priceChange24h: 5.24,
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
    marketCapUsd: 12500000,
    liquidityUsd: 850000,
    volume24hUsd: 425000,
    priceChange24h: -2.75,
  },

  security: {
    contractVerification: "unknown",
    ownershipRenounced: null,
    liquidityLocked: null,
  },
};

export const mockTokens: Token[] = [mockToken, secondMockToken];