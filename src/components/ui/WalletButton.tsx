import { Wallet } from "lucide-react";

export default function WalletButton() {
  return (
    <button
      type="button"
      disabled
      title="Wallet connection is not configured yet"
      className="inline-flex cursor-not-allowed items-center justify-center gap-2 whitespace-nowrap rounded-full bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-violet-200 opacity-70"
    >
      <Wallet size={14} />
      <span>Connect Wallet</span>
    </button>
  );
}