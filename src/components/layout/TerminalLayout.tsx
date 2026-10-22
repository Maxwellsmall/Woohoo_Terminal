import type { ReactNode } from "react";

type TerminalLayoutProps = {
  header: ReactNode;
  activity: ReactNode;
  market: ReactNode;
  intelligence: ReactNode;
  analytics: ReactNode;
};

export default function TerminalLayout({ header, activity, market, intelligence, analytics }: TerminalLayoutProps) {
  return (
    <div className="terminal-shell">
      {header}
      <main className="terminal-grid">
        <aside className="terminal-panel activity-panel">{activity}</aside>
        <section className="terminal-center">
          <div className="terminal-panel market-panel">{market}</div>
          <section className="terminal-panel analytics-panel">{analytics}</section>
        </section>
        <aside className="terminal-panel intelligence-panel">{intelligence}</aside>
      </main>
    </div>
  );
}
