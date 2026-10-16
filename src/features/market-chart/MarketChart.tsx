import { BarChart3, CandlestickChart, LineChart } from "lucide-react";
import PanelHeading from "../../components/layout/PanelHeading";

export default function MarketChart() {
  return (
    <div>
      <PanelHeading
        title="Market Overview"
        description="Price action and trading activity"
        action={
          <span className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-gray-500">
            DEMO DATA
          </span>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3">
        <div>
          <p className="text-xs text-gray-500">Selected market</p>
          <h3 className="mt-1 text-lg font-semibold text-white">WHH / USD</h3>
        </div>

        <div className="flex items-center gap-1">
          {["1m", "5m", "15m", "1h", "1d"].map((timeframe, index) => (
            <button
              key={timeframe}
              type="button"
              className={`rounded px-2 py-1.5 text-xs ${
                index === 1
                  ? "bg-emerald-400/10 text-emerald-300"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 px-4 py-3 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <CandlestickChart className="h-4 w-4" />
          Candles
        </span>

        <span className="flex items-center gap-1.5">
          <LineChart className="h-4 w-4" />
          Line
        </span>

        <span className="flex items-center gap-1.5">
          <BarChart3 className="h-4 w-4" />
          Volume
        </span>
      </div>

      <div className="flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center sm:min-h-[420px]">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.05]">
          <CandlestickChart className="h-7 w-7 text-emerald-400" />
        </div>

        <h3 className="mt-5 text-sm font-medium text-gray-200">
          Market chart coming next
        </h3>

        <p className="mt-2 max-w-xs text-xs leading-6 text-gray-500">
          This panel is ready for the candlestick chart and market data
          integration.
        </p>

        <span className="mt-4 rounded-full border border-white/[0.08] px-3 py-1 text-[10px] text-gray-500">
          Chart integration pending
        </span>
      </div>
    </div>
  );
}
