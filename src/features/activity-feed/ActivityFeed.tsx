import { useMemo, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import PanelHeading from "../../components/layout/PanelHeading";

type ActivityType = "SWAP" | "MINT" | "VOTE";
type Activity = { id: number; type: ActivityType; title: string; detail: string; wallet: string; time: string; amount: string };
const seed: Activity[] = [
  { id: 1, type: "SWAP", title: "Swap $15378.79 -> 7,887 WHH", detail: "$15378.79", wallet: "0x7A...c07D", time: "23:55:53", amount: "$15,378.79" },
  { id: 2, type: "MINT", title: "Minted Avatar #5763", detail: "0.99 ETH ($3078)", wallet: "0x6b5a...3e9e", time: "23:55:29", amount: "0.99 ETH" },
  { id: 3, type: "VOTE", title: "Voted YES Prop #42", detail: "48,449 WHH", wallet: "0x0a07...0cB8", time: "23:55:24", amount: "48,449 WHH" },
  { id: 4, type: "MINT", title: "Minted Avatar #32998", detail: "0.33 ETH ($1029)", wallet: "0x6b88...b48e", time: "23:55:20", amount: "0.33 ETH" },
  { id: 5, type: "SWAP", title: "Swap $5753.02 -> 2,639 WHH", detail: "$5753.02", wallet: "0x3f0a...bb25", time: "23:55:15", amount: "$5,753.02" },
  { id: 6, type: "VOTE", title: "Voted YES Prop #42", detail: "24,594 WHH", wallet: "0x5533...bd25", time: "23:55:11", amount: "24,594 WHH" },
];
const filters = ["ALL", "MINTS", "VOTES", "SWAPS"] as const;
export default function ActivityFeed() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");
  const [query, setQuery] = useState("");
  const [refresh, setRefresh] = useState(false);
  const rows = useMemo(() => seed.filter((item) => (filter === "ALL" || item.type === filter.slice(0, -1)) && `${item.title} ${item.wallet} ${item.detail}`.toLowerCase().includes(query.toLowerCase())), [filter, query]);
  return <div className="feed-content">
    <PanelHeading title="ACTIVITY STREAM" action={<span className="live-pill"><i /> LIVE</span>} />
    <div className="feed-toolbar"><div className="feed-filters">{filters.map((name) => <button key={name} onClick={() => setFilter(name)} className={filter === name ? "active" : ""}>{name}</button>)}</div><button aria-label="Refresh activity" className="icon-action" onClick={() => setRefresh(true)}><RefreshCw size={12} className={refresh ? "spin-once" : ""} /></button></div>
    <label className="activity-search"><Search size={12} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter hex, item, id..." /></label>
    <div className="activity-list">{rows.map((item) => <article key={item.id} className="activity-item"><div className="activity-meta"><span>{item.time}</span><b className={`activity-tag ${item.type.toLowerCase()}`}>{item.type}</b><span className="wallet-short">{item.wallet}</span></div><p>{item.title}</p><div className="activity-detail"><strong>{item.detail}</strong><span>{item.amount}</span></div></article>)}{rows.length === 0 && <p className="empty-state">No matching activity.</p>}</div>
    <footer className="feed-footer"><span>BLOCK #19,482,931</span><span>ZKP 100% FINAL</span></footer>
  </div>;
}
