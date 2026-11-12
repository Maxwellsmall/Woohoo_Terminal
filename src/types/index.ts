export type SecurityStatus = "verified" | "unverified" | "unknown";

export type MarketPeriod = "m5" | "h1" | "h6" | "h24";

export interface TokenPeriodMetrics {
  priceChangePct: number | null;
  volumeUsd: number | null;
  buys: number | null;
  sells: number | null;
}

export interface TokenMetrics {
  priceUsd: number | null;
  priceNative: number | null;
  marketCapUsd: number | null;
  fdvUsd: number | null;
  liquidityUsd: number | null;
  pooledBase: number | null;
  pooledQuote: number | null;
  volume24hUsd: number | null;
  priceChange24h: number | null;
  periods: Record<MarketPeriod, TokenPeriodMetrics>;
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

  dexId?: string;
  pairAddress?: string;
  pairUrl?: string;
  quoteSymbol?: string;
  quoteContractAddress?: string;
  pairCreatedAt?: number | null;

  metrics: TokenMetrics;
  security: TokenSecurity;
}
