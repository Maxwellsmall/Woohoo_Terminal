export type SecurityStatus = "verified" | "unverified" | "unknown";

export interface TokenMetrics {
  priceUsd: number | null;
  marketCapUsd: number | null;
  fdvUsd: number | null;
  liquidityUsd: number | null;
  volume24hUsd: number | null;
  priceChange24h: number | null;
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
