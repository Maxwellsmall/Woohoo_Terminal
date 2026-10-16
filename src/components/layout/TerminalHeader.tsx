import {
  Activity,
  Bell,
  ChevronDown,
  Search,
  Settings2,
  Wallet,
} from "lucide-react";

export default function TerminalHeader() {
  return (
    <header className="flex min-h-16 items-center justify-between gap-4 border-b border-white/8 bg-[#0b0f0d] px-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10">
          <Activity className="h-5 w-5 text-emerald-400" />
        </div>

        <div>
          <h1 className="text-sm font-bold tracking-wide text-white">
            WOOHOO
            <span className="ml-1 text-emerald-400">TERMINAL</span>
          </h1>

          <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-gray-500">
            Web3 Market Intelligence
          </p>
        </div>
      </div>

      <div className="hidden max-w-md flex-1 md:flex">
        <div className="flex w-full items-center gap-2 rounded-lg border border-white/8 bg-white/2 px-3 py-2">
          <Search className="h-4 w-4 text-gray-500" />

          <input
            type="search"
            placeholder="Search tokens, wallets, contracts..."
            aria-label="Search tokens, wallets, and contracts"
            className="w-full bg-transparent text-sm text-gray-200 outline-none placeholder:text-gray-600"
          />

          <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-gray-500">
            /
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/6 px-3 py-1.5 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-xs text-emerald-300">System Online</span>
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-gray-400 transition hover:bg-white/6 hover:text-white"
        >
          <Bell className="h-4 w-4" />
        </button>

        <button
          type="button"
          aria-label="Settings"
          className="rounded-lg p-2 text-gray-400 transition hover:bg-white/6 hover:text-white"
        >
          <Settings2 className="h-4 w-4" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/4 px-3 py-2 text-xs font-medium text-gray-200 transition hover:bg-white/8"
        >
          <Wallet className="h-4 w-4 text-emerald-400" />
          <span className="hidden sm:inline">Connect Wallet</span>
          <ChevronDown className="hidden h-3 w-3 sm:block" />
        </button>
      </div>
    </header>
  );
}
