import { Wallet } from "lucide-react";

export default function WalletButton() {
  return (
    <button
      type="button"
      disabled
      title="Wallet connection is not configured yet"
      className="inline-flex cursor-not-allowed items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 opacity-80"
    >
      <Wallet size={14} />
      <span>Connect Wallet</span>
    </button>
  );
}
