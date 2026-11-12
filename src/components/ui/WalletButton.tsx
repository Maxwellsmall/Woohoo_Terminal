import { useState } from "react";
import { Wallet } from "lucide-react";

export default function WalletButton() {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div className="wallet-control">
      <button
        type="button"
        aria-expanded={detailsOpen}
        aria-controls="wallet-availability"
        title="Show wallet availability"
        className="wallet-unavailable"
        onClick={() => setDetailsOpen((open) => !open)}
      >
        <Wallet size={14} />
        <span>Wallet unavailable</span>
      </button>
      {detailsOpen && (
        <p id="wallet-availability" className="wallet-status" role="status">
          Wallet access is not enabled. This dashboard is read-only and will
          not request wallet permissions or sign transactions.
        </p>
      )}
    </div>
  );
}
