import TerminalHeader from "./components/layout/TerminalHeader";
import TerminalLayout from "./components/layout/TerminalLayout";

import ActivityFeed from "./features/activity-feed/ActivityFeed";
import MarketChart from "./features/market-chart/MarketChart";
import TokenIntelligence from "./features/token-intelligence/TokenIntelligence";
import AnalyticsPanel from "./features/analytics/AnalyticsPanel";

export default function App() {
  return (
    <TerminalLayout
      header={<TerminalHeader />}
      activity={<ActivityFeed />}
      market={<MarketChart />}
      intelligence={<TokenIntelligence />}
      analytics={<AnalyticsPanel />}
    />
  );
}
