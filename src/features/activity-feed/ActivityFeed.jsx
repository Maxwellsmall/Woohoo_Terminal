
import { useState } from "react";

const activities = [
  {
    id: 1,
    type: "Swap",
    description: "Swapped SOL for USDC",
    amount: "125.00 USDC",
    wallet: "7xKp...9mQa",
    time: "2 minutes ago",
  },
  {
    id: 2,
    type: "Mint",
    description: "Minted Woohoo Genesis NFT",
    amount: "1 NFT",
    wallet: "3aLm...2vRt",
    time: "15 minutes ago",
  },
  {
    id: 3,
    type: "Vote",
    description: "Voted on Proposal #024",
    amount: "Governance vote",
    wallet: "8nBx...4pWd",
    time: "32 minutes ago",
  },
  {
    id: 4,
    type: "Swap",
    description: "Swapped USDC for SOL",
    amount: "2.50 SOL",
    wallet: "5jQr...7kMz",
    time: "1 hour ago",
  },
  {
    id: 5,
    type: "Mint",
    description: "Minted Community Badge",
    amount: "1 NFT",
    wallet: "9tUv...6cFe",
    time: "3 hours ago",
  },
];

const filters = ["All", "Mints", "Votes", "Swaps"];

const categoryStyles = {
  Swap: "bg-cyan-500/10 text-cyan-400",
  Mint: "bg-purple-500/10 text-purple-400",
  Vote: "bg-amber-500/10 text-amber-400",
};

export default function ActivityFeed() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredActivities = activities.filter((activity) => {
    if (activeFilter === "All") return true;

    return activity.type.toLowerCase() ===
      activeFilter.slice(0, -1).toLowerCase();
  });

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-white">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Activity Feed</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Recent wallet and network activity
          </p>
        </div>

        <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
          Demo data
        </span>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-lg px-4 py-2 text-sm transition ${
              activeFilter === filter
                ? "bg-teal-500 text-zinc-950"
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <article
              key={activity.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-zinc-800 p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                    categoryStyles[activity.type]
                  }`}
                >
                  {activity.type}
                </span>

                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    {activity.description}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {activity.wallet}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-sm font-medium">{activity.amount}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  {activity.time}
                </p>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-800 py-10 text-center">
            <p className="text-sm text-zinc-400">
              No {activeFilter.toLowerCase()} activity yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
