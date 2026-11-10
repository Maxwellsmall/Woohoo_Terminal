import { Wallet } from "lucide-react";

export default function WalletButton() {
  return (
    <button
      type="button"
      disabled
      title="Wallet connection is not implemented; this dashboard is read-only"
      className="wallet-unavailable"
    >
      <Wallet size={14} />
      <span>Wallet unavailable</span>
    </button>
  );
}