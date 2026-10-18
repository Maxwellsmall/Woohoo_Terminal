import { Radio } from "lucide-react";
import PanelHeading from "../../components/layout/PanelHeading";

const activities = [
  { type: "SWAP", label: "Token swap detected", time: "Just now" },
  { type: "MINT", label: "New token minted", time: "2 min ago" },
  { type: "VOTE", label: "Network vote recorded", time: "5 min ago" },
  { type: "SWAP", label: "Market transaction", time: "8 min ago" },
];

export default function ActivityFeed() {
  return (
    <div>
      <PanelHeading
        title="Live Activity"
        description="Recent network events"
        action={
          <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
            <Radio className="h-3 w-3" />
            DEMO
          </span>
        }
      />

      <div className="flex gap-1 border-b border-white/6 p-3">
        {["All", "Swaps", "Mints", "Votes"].map((filter, index) => (
          <button
            key={filter}
            type="button"
            className={`rounded-md px-2.5 py-1.5 text-xs ${
              index === 0
                ? "bg-emerald-400/10 text-emerald-300"
                : "text-gray-500 hover:bg-white/5 hover:text-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="divide-y divide-white/5">
        {activities.map((activity, index) => (
          <div key={`${activity.type}-${index}`} className="px-4 py-4">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded bg-white/5 px-2 py-1 text-[10px] text-gray-400">
                {activity.type}
              </span>

              <span className="text-[10px] text-gray-600">{activity.time}</span>
            </div>

            <p className="mt-2 text-xs text-gray-300">{activity.label}</p>
          </div>
        ))}
      </div>

      <p className="px-4 py-4 text-center text-xs text-gray-600">
        Sample activity · Not live network data
      </p>
    </div>
  );
}
