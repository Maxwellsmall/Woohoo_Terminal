import { Activity, ArrowDownRight, ArrowUpRight, CircleDot, Network } from "lucide-react";
// import PanelHeading from "../../components/layout/PanelHeading";

const positions = [
  { pair: "WHH / USDC", liquidity: "$6.84M", direction: "LONG 5x", pnl: "+$1,420", up: true },
  { pair: "WHH / ETH", liquidity: "$4.22M", direction: "LONG 3x", pnl: "+$890", up: true },
  { pair: "WHH / SOL", liquidity: "$1.95M", direction: "SHORT 2x", pnl: "-$140", up: false },
];
const producers = [
  ["0x3bD28...49a1", "+0.042 ETH"], ["0x8a19a...88c2", "+0.058 ETH"], ["0xD001e...10b9", "+0.020 ETH"], ["0x8dB11...7b9a", "+0.049 ETH"],
];
export default function AnalyticsPanel() {
  return <div className="analytics-content">
    <div className="analytics-title"><h2>POSITIONS &amp; NETWORK ANALYSIS <i /></h2><span>Epoch #48,192 finalized</span></div>
    <div className="analytics-grid">
      <section className="mini-panel positions-mini"><div className="mini-heading"><span>POSITIONS</span><span>PNL</span></div><div className="position-head"><span>SYMBOL</span><span>LIQUIDITY</span><span>DIR</span><span>PNL</span></div>{positions.map(p => <div className="position-row" key={p.pair}><strong>{p.pair}</strong><span>{p.liquidity}</span><span className={p.up ? "positive" : "negative"}>{p.direction}</span><b className={p.up ? "positive" : "negative"}>{p.up ? <ArrowUpRight size={10}/> : <ArrowDownRight size={10}/>} {p.pnl}</b></div>)}<div className="position-foot"><span>TOTAL MARGIN: $24,580</span><strong>APY: 24.5%</strong></div></section>
      <section className="mini-panel producers-mini"><div className="mini-heading"><span>CONSENSUS PRODUCER</span><span>REWARD</span></div>{producers.map(([address,reward],i)=><div className="producer-row" key={address}><span>{i+1}. {address}</span><b>{reward}</b></div>)}<div className="producer-foot"><span>SLOT: 148/148</span><span>VALID: 100%</span></div></section>
      <section className="mini-panel network-mini"><div className="mini-heading"><span><Network size={11}/> DATA-SPHERE · L3 NETWORK</span><b>ORBIT</b></div><svg viewBox="0 0 170 110" className="network-map" aria-label="Illustrative network map"><g stroke="#087c61" strokeWidth="1" opacity=".7"><path d="M35 50 L65 25 L100 35 L130 60 L90 82 L48 78 L35 50 M65 25 L90 82 M100 35 L48 78 M35 50 L130 60" fill="none"/></g>{[[35,50],[65,25],[100,35],[130,60],[90,82],[48,78],[76,55],[112,85],[20,76]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i%3===0?5:3.5} fill={i%3===0?"#14d8a0":i%3===1?"#fbbf24":"#38bdf8"} stroke="#063c30" strokeWidth="2"/> )}</svg><div className="network-foot"><span>256 NODES ACTIVE</span><span><CircleDot size={10}/> <Activity size={10}/></span></div></section>
    </div>
  </div>;
}
