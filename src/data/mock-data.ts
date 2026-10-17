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
