
const networkStats = [
  {
    id: 1,
    label: "Transactions",
    value: "24,891",
    description: "Total transactions",
    icon: "↗",
  },
  {
    id: 2,
    label: "Active wallets",
    value: "3,482",
    description: "Unique wallets",
    icon: "◉",
  },
  {
    id: 3,
    label: "Network activity",
    value: "1,284",
    description: "Transactions per hour",
    icon: "⌁",
  },
  {
    id: 4,
    label: "Consensus",
    value: "Operational",
    description: "Demo status only",
    icon: "✓",
  },
];

export default function NetworkAnalytics() {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-white">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Network Analytics</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Network activity and performance overview
          </p>
        </div>

        <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
          Demo data
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {networkStats.map((stat) => (
          <article
            key={stat.id}
            className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-zinc-400">{stat.label}</p>
              <span className="text-xl text-teal-400" aria-hidden="true">
                {stat.icon}
              </span>
            </div>

            <p className="text-2xl font-semibold tracking-tight">
              {stat.value}
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              {stat.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-zinc-800 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-medium">Network status</h3>
            <p className="mt-1 text-xs text-zinc-500">
              Illustrative status; not connected to a live network.
            </p>
          </div>

          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-400">
            Unverified
          </span>
        </div>
      </div>
    </section>
  );
}
