export type SecurityStatus = "verified" | "unverified" | "unknown";

export type MarketPeriod = "m5" | "h1" | "h6" | "h24";

export interface TokenPeriodMetrics {
  priceChangePct: number | null;
  volumeUsd: number | null;
  buys: number | null;
  sells: number | null;
}

export interface TokenMetrics {
  priceUsd: number;
  marketCapUsd: number;
  liquidityUsd: number;
  volume24hUsd: number;
  priceChange24h: number;
}

export interface TokenSecurity {
  contractVerification: SecurityStatus;
  ownershipRenounced: boolean | null;
  liquidityLocked: boolean | null;
}

export interface Token {
  id: string;
  name: string;
  symbol: string;
  network: string;
  contractAddress: string | null;
  logoUrl?: string;
  metrics: TokenMetrics;
  security: TokenSecurity;
}
