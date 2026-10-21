
import ActivityFeed from "../features/activity-feed/ActivityFeed";
import PositionTable from "../features/analytics/PositionTable";
import NetworkAnalytics from "../features/analytics/NetworkAnalytics";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header>
          <p className="text-sm font-medium uppercase tracking-widest text-teal-400">
            Woohoo World
          </p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            Activity & Analytics
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Explore portfolio positions and network activity.
          </p>
        </header>

        <NetworkAnalytics />

        <PositionTable />

        <ActivityFeed />
      </div>
    </main>
  );
}
