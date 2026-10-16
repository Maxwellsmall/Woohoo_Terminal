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
    <div className="min-h-screen bg-[#080b0a] text-gray-200">
      {header}

      <main className="mx-auto max-w-[1920px] p-3 sm:p-4">
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[260px_minmax(0,1fr)_310px]">
          <aside className="min-w-0 rounded-xl border border-white/[0.08] bg-[#0b0f0d]">
            {activity}
          </aside>

          <section className="min-w-0 rounded-xl border border-white/[0.08] bg-[#0b0f0d]">
            {market}
          </section>

          <aside className="min-w-0 rounded-xl border border-white/[0.08] bg-[#0b0f0d]">
            {intelligence}
          </aside>
        </div>

        <section className="mt-3 min-w-0 rounded-xl border border-white/[0.08] bg-[#0b0f0d]">
          {analytics}
        </section>
      </main>
    </div>
  );
}
