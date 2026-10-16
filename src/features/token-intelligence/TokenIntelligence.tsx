import { ArrowUpRight, Copy, ShieldCheck } from "lucide-react";
import PanelHeading from "../../components/layout/PanelHeading";

const metrics = [
  { label: "Market Cap", value: "—" },
  { label: "Liquidity", value: "—" },
  { label: "24h Volume", value: "—" },
  { label: "FDV", value: "—" },
];

export default function TokenIntelligence() {
  return (
    <div>
      <PanelHeading
        title="Token Intelligence"
        description="Overview and risk indicators"
      />

      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] text-lg font-bold text-emerald-400">
            W
          </div>

          <div>
            <h3 className="font-semibold text-white">Woohoo</h3>
            <p className="mt-1 text-xs text-gray-500">WHH · Demo token</p>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="text-xs text-gray-500">Token price</p>
          <p className="mt-2 text-2xl font-semibold text-white">—</p>
          <p className="mt-1 text-[10px] text-gray-600">
            Waiting for a verified data source
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-white/[0.06] p-3"
            >
              <p className="text-[10px] text-gray-500">{metric.label}</p>
              <p className="mt-2 text-sm font-semibold text-gray-200">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 border-t border-white/[0.06] pt-4">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <ShieldCheck className="h-4 w-4 text-gray-500" />
            Security verification
          </div>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            No security assessment has been performed. Verification status is
            currently unknown.
          </p>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-xs text-gray-300 hover:bg-white/[0.05]"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy address
          </button>

          <button
            type="button"
            aria-label="Open token details"
            className="rounded-lg border border-white/10 px-3 py-2.5 text-gray-300 hover:bg-white/[0.05]"
          >
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
