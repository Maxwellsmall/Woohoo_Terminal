import type { ReactNode } from "react";

type TerminalLayoutProps = {
  header: ReactNode;
  activity: ReactNode;
  market: ReactNode;
  intelligence: ReactNode;
  analytics: ReactNode;
};

export default function TerminalLayout({
  header,
  activity,
  market,
  intelligence,
  analytics,
}: TerminalLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#080b0a] text-gray-200">
      {/* Global terminal header */}
      {header}

      <main className="mx-auto flex w-full max-w-[1920px] flex-1 flex-col p-2 sm:p-3">
        {/* Main terminal workspace */}
        <div
          className="
            grid min-h-0 flex-1 grid-cols-1 gap-3
            xl:grid-cols-[260px_minmax(0,1fr)_280px]
          "
        >
          {/* Activity stream */}
          <aside className="min-w-0 overflow-hidden rounded-xl border border-emerald-500/20 bg-[#0b0f0d]">
            {activity}
          </aside>

          {/* Market chart */}
          <section className="min-w-0 overflow-hidden rounded-xl border border-emerald-500/20 bg-[#0b0f0d]">
            {market}
          </section>

          {/* Token intelligence */}
          <aside className="min-w-0 overflow-hidden rounded-xl border border-emerald-500/20 bg-[#0b0f0d]">
            {intelligence}
          </aside>
        </div>

        {/* Positions and network analytics */}
        <section className="mt-3 min-w-0 overflow-hidden rounded-xl border border-emerald-500/20 bg-[#0b0f0d]">
          {analytics}
        </section>
      </main>
    </div>
  );
}
