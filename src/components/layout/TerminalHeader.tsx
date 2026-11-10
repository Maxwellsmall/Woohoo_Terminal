import { Settings2, Terminal } from "lucide-react";

import TokenSearch from "../ui/TokenSearch";
import TokenSelector from "../ui/TokenSelector";
import MarketTicker from "../ui/MarketTicker";
import NetworkIndicator from "../ui/NetworkIndicator";
import WalletButton from "../ui/WalletButton";
import Logo from "./Logo";

export default function TerminalHeader() {
  return (
    <header className="relative z-30 border-b border-slate-200 bg-white shadow-sm">
      <div className="flex min-h-16 flex-wrap items-center gap-3 px-4 py-3 xl:flex-nowrap">
        {/* Brand (subtitle now lives inside Logo) */}
        <div className="flex shrink-0 items-center">
          <Logo showText={true} />
        </div>

        {/* Terminal navigation */}
        <nav
          aria-label="Terminal navigation"
          className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm lg:flex"
        >
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-violet-600 px-4 py-1.5 text-xs font-semibold text-white"
          >
            <Terminal size={13} />
            Terminal
          </button>

          <button
            type="button"
            disabled
            title="Swap functionality is not implemented"
            className="cursor-not-allowed rounded-full px-4 py-1.5 text-xs text-slate-400"
          >
            Swap
          </button>
        </nav>

        {/* Search */}
        <div className="order-3 w-full min-w-0 xl:order-0 xl:ml-auto xl:w-auto xl:flex-1 xl:max-w-sm">
          <TokenSearch />
        </div>

        {/* Market and token controls */}
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <div className="hidden 2xl:block">
            <MarketTicker />
          </div>

          <div className="hidden md:block">
            <TokenSelector />
          </div>

          <NetworkIndicator />
        </div>

        {/* Settings and wallet */}
        <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-0">
          <button
            type="button"
            aria-label="Settings"
            title="Settings are not implemented yet"
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-50 hover:text-violet-600"
          >
            <Settings2 size={16} />
          </button>

          <WalletButton />
        </div>
      </div>

      {/* Compact ticker for medium screens */}
      <div className="border-t border-slate-100 px-4 py-2 2xl:hidden">
        <MarketTicker />
      </div>
    </header>
  );
}