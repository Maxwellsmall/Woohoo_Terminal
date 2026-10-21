
export default function Header() {
  return (
    <header className="flex items-center justify-between bg-zinc-950 px-4 py-3 border-b border-zinc-800 text-xs text-zinc-400">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-500 flex items-center justify-center font-bold text-black text-sm">
            W
          </div>
          <span className="font-bold text-white text-base tracking-wider">WOOHOO WORLD</span>
        </div>
        <nav className="flex space-x-4">
          <a href="#" className="text-teal-400 font-semibold border-b border-teal-400 pb-1">DEX</a>
          <a href="#" className="hover:text-white transition-colors">MARKETS</a>
          <a href="#" className="hover:text-white transition-colors">GOVERNANCE</a>
          <a href="#" className="hover:text-white transition-colors">REWARDS</a>
        </nav>
      </div>

      <div className="flex items-center space-x-6 bg-zinc-900/60 px-4 py-1.5 rounded-lg border border-zinc-800">
        <div className="flex items-center space-x-2">
          <span className="text-zinc-500">Pair:</span>
          <span className="font-semibold text-white">WWH / USDC</span>
        </div>
        <div>
          <span className="text-zinc-500">Price: </span>
          <span className="text-teal-400 font-mono font-semibold">$2.99</span>
        </div>
        <div>
          <span className="text-zinc-500">24h Chg: </span>
          <span className="text-rose-500 font-mono">-8.11%</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button className="bg-teal-400 hover:bg-teal-300 text-black font-bold px-4 py-1.5 rounded-md transition-all shadow-md shadow-teal-500/20">
          Connect Wallet
        </button>
      </div>
    </header>
  );
}