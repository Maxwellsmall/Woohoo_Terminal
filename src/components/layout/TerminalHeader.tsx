import { Activity, Settings2, Terminal } from "lucide-react";

import TokenSearch from "../ui/TokenSearch";
import TokenSelector from "../ui/TokenSelector";
import MarketTicker from "../ui/MarketTicker";
import NetworkIndicator from "../ui/NetworkIndicator";
import WalletButton from "../ui/WalletButton";

export default function TerminalHeader() {
  return (
    <header className="relative z-30 border-b border-emerald-500/20 bg-[#0b100e]">
      <div className="flex min-h-[64px] flex-wrap items-center gap-3 px-4 py-3 xl:flex-nowrap">
        {/* Brand */}
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-500/10">
            <Activity size={18} className="text-emerald-400" />
          </div>

          <div>
            <h1 className="whitespace-nowrap text-sm font-bold tracking-wide text-white">
              WOOHOO WORLD
            </h1>
            <p className="text-[9px] uppercase tracking-[0.2em] text-emerald-400">
              Multiverse Terminal
            </p>
          </div>
        </div>

        {/* Terminal navigation */}
        <nav
          aria-label="Terminal navigation"
          className="hidden items-center gap-1 rounded-lg border border-white/10 p-1 lg:flex"
        >
          <button
            type="button"
            className="flex items-center gap-2 rounded-md bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-300"
          >
            <Terminal size={13} />
            Terminal
          </button>

          <button
            type="button"
            disabled
            title="Swap functionality is not implemented"
            className="cursor-not-allowed rounded-md px-3 py-2 text-xs text-gray-500"
          >
            Swap
          </button>
        </nav>

        {/* Search */}
        <div className="order-3 w-full min-w-0 xl:order-none xl:ml-auto xl:w-auto xl:flex-1 xl:max-w-sm">
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
            className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:text-white"
          >
            <Settings2 size={16} />
          </button>

          <WalletButton />
        </div>
      </div>

      {/* Compact ticker for medium screens */}
      <div className="border-t border-white/5 px-4 py-2 2xl:hidden">
        <MarketTicker />
      </div>
    </header>
  );
}
