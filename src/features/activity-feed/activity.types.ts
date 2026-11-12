export type ActivityKind = "buy" | "sell" | "unknown";

export interface TokenActivity {
  id: string;
  transactionHash: string;
  timestamp: number;
  kind: ActivityKind;
  tokenAmount: number | null;
  quoteAmount: number | null;
  usdValue: number | null;
  tokenPriceUsd: number | null;
  walletAddress: string | null;
  walletExplorerUrl: string | null;
  pairAddress: string;
  network: string;
  dex: string | null;
  explorerUrl: string | null;
}

export type ActivityFilter = "all" | "buy" | "sell";

export interface ActivityResponse {
  activities: TokenActivity[];
  updatedAt: number;
}
