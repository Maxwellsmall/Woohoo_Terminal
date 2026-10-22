import { useMemo, useState } from "react";
import { Activity, Layers3 } from "lucide-react";
import PanelHeading from "../../components/layout/PanelHeading";
import { useMarketCandles } from "./useMarketCandles";
import type { Timeframe } from "../../services/market.service";

const candles = [
  { o: 36, c: 49, h: 58, l: 28, v: 18 },
  { o: 48, c: 66, h: 70, l: 41, v: 23 },
  { o: 66, c: 63, h: 76, l: 59, v: 16 },
  { o: 63, c: 82, h: 86, l: 59, v: 26 },
  { o: 82, c: 99, h: 106, l: 78, v: 32 },
  { o: 99, c: 83, h: 112, l: 78, v: 28 },
  { o: 83, c: 91, h: 96, l: 75, v: 24 },
];
const timeframes = ["1m", "5m", "15m", "1H", "4H", "1D"];
export default function MarketChart() {
  const [timeframe, setTimeframe] = useState<Timeframe>("15m");
  const { loading, error } = useMarketCandles(timeframe);
  const [mode, setMode] = useState<"Candles" | "Line" | "Depth">("Candles");
  const [showVolume, setShowVolume] = useState(true);
  const chart = useMemo(
    () => candles.map((c, i) => ({ ...c, x: 45 + i * 115 })),
    [],
  );
  return (
    <div className="market-content">
      <PanelHeading
        title="WHH/USD"
        description="WOOHOO AMM v2"
        action={
          <span className="chart-change">
            $2.18 <b>+12.40%</b>
          </span>
        }
      />
      <div className="chart-toolbar">
        <div className="timeframes">
          {timeframes.map((t) => (
            <button
              key={t}
              className={timeframe === t ? "active" : ""}
              onClick={() => setTimeframe(t as Timeframe)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="chart-modes">
          {(["Candles", "Line", "Depth"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={mode === m ? "active" : ""}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="ohlc-strip">
        <span>
          O: <b>$2.16</b>
        </span>
        <span>
          H: <b className="positive">$2.19</b>
        </span>
        <span>
          L: <b className="negative">$2.14</b>
        </span>
        <span>
          C: <b>$2.18</b>
        </span>
        <span>
          VOL: <b>540K WHH</b>
        </span>
        <span className="chart-live">
          <Activity size={10} /> LIVE MOCK DATA
        </span>
      </div>
      <div
        className="chart-stage"
        role="img"
        aria-label={`Illustrative ${mode.toLowerCase()} price chart for WHH/USD at ${timeframe}`}
      >
        <div className="chart-price-labels">
          <span>$2.20</span>
          <span>$2.18</span>
          <span>$2.15</span>
          <span>$2.10</span>
        </div>
        <svg
          viewBox="0 0 850 300"
          preserveAspectRatio="none"
          className="price-svg"
        >
          {[35, 90, 145, 200, 255].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="850"
              y2={y}
              className="chart-gridline"
            />
          ))}
          {mode === "Candles" &&
            chart.map((c, i) => {
              const up = c.c >= c.o;
              const top = Math.min(c.o, c.c);
              const height = Math.max(5, Math.abs(c.c - c.o));
              return (
                <g key={i}>
                  <line
                    x1={c.x}
                    y1={300 - c.h * 2.35}
                    x2={c.x}
                    y2={300 - c.l * 2.35}
                    className={up ? "wick-up" : "wick-down"}
                  />
                  <rect
                    x={c.x - 31}
                    y={300 - (top + height) * 2.35}
                    width="62"
                    height={height * 2.35}
                    className={up ? "candle-up" : "candle-down"}
                    rx="1"
                  />
                </g>
              );
            })}
          {mode === "Line" && (
            <polyline
              points={chart.map((c) => `${c.x},${300 - c.c * 2.35}`).join(" ")}
              className="chart-line"
            />
          )}
          {mode === "Depth" && (
            <>
              <path
                d="M0 280 L0 250 L90 236 L180 225 L270 202 L360 190 L450 165 L540 130 L630 110 L720 65 L850 45 L850 280 Z"
                className="depth-area buy"
              />
              <path
                d="M0 280 L0 80 L100 115 L200 145 L300 170 L400 200 L500 215 L600 240 L700 250 L850 260 L850 280 Z"
                className="depth-area sell"
              />
            </>
          )}
          {showVolume &&
            mode !== "Depth" &&
            chart.map((c, i) => (
              <rect
                key={`v${i}`}
                x={c.x - 30}
                y={293 - c.v * 0.75}
                width="60"
                height={c.v * 0.75}
                className={c.c >= c.o ? "volume-up" : "volume-down"}
              />
            ))}
          {loading && (
            <div role="status" className="p-4 text-sm">
              Loading market data...
            </div>
          )}

          {error && (
            <div role="alert" className="p-4 text-sm text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && candles.length === 0 && (
            <div className="p-4 text-sm">No market data available.</div>
          )}
        </svg>
        <div className="chart-time-labels">
          <span>13:00</span>
          <span>13:15</span>
          <span>13:30</span>
          <span>13:45</span>
          <span>14:00</span>
          <span>14:15</span>
          <span>14:30</span>
        </div>
      </div>
      <div className="chart-bottom">
        <span>
          <i className="legend-green" /> WHH/USD
        </span>
        <button onClick={() => setShowVolume(!showVolume)}>
          <Layers3 size={11} /> Volume {showVolume ? "ON" : "OFF"}
        </button>
        <span className="mock-note">
          Illustrative market data · not connected to an exchange
        </span>
      </div>
    </div>
  );
}
