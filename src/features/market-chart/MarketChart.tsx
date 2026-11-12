import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { Layers3, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import PanelHeading from "../../components/layout/PanelHeading";
import { useMarketCandles } from "./useMarketCandles";
import { useSelectedToken } from "../../app/TokenContext";
import { usePreferences } from "../../app/PreferencesContext";
import type { Timeframe } from "../../services/market.service";

const timeframes: Timeframe[] = ["1m", "5m", "15m", "1h", "4h", "1d"];

type ChartMode = "Candles" | "Line";
type CrosshairPosition = {
  x: number;
  y: number;
  timeX: number;
  price: string;
  time: string;
};

const WIDTH = 850;
const HEIGHT = 300;
const PRICE_TOP = 12;
const PRICE_BOTTOM = 235;
const MIN_ZOOM = 0.75;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;

function formatPrice(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "Unavailable";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 5,
  }).format(value);
}

function formatVolume(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatTime(timestamp: number, timeframe: Timeframe): string {
  const date = new Date(timestamp * 1000);

  if (timeframe === "1d") {
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  }

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MarketChart() {
  const [timeframe, setTimeframe] = useState<Timeframe>("15m");
  const [mode, setMode] = useState<ChartMode>("Candles");
  const [zoomState, setZoomState] = useState({ key: "", value: 1 });
  const [crosshair, setCrosshair] = useState<CrosshairPosition | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const priceSvgRef = useRef<SVGSVGElement>(null);

  const { selectedToken } = useSelectedToken();
  const { showVolume, setShowVolume } = usePreferences();
  const { candles, loading, error } = useMarketCandles(timeframe);
  const tokenKey = `${selectedToken?.network ?? ""}:${selectedToken?.pairAddress ?? ""}`;
  const chartKey = `${tokenKey}:${timeframe}`;
  const zoom = zoomState.key === chartKey ? zoomState.value : 1;

  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0, top: 0 });
  }, [chartKey]);

  const chart = useMemo(() => {
    if (candles.length === 0) return [];

    const prices = candles.flatMap((c) => [c.high, c.low]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || maxPrice * 0.02 || 1;
    const padding = priceRange * 0.1;

    const chartMin = minPrice - padding;
    const chartMax = maxPrice + padding;
    const range = chartMax - chartMin || 1;

    const maxVolume = Math.max(...candles.map((c) => c.volume), 1);
    const step = WIDTH / candles.length;

    return candles.map((candle, index) => {
      const x = step * index + step / 2;

      const y = (price: number) =>
        PRICE_BOTTOM -
        ((price - chartMin) / range) * (PRICE_BOTTOM - PRICE_TOP);

      return {
        ...candle,
        x,
        yOpen: y(candle.open),
        yHigh: y(candle.high),
        yLow: y(candle.low),
        yClose: y(candle.close),
        volumeHeight: (candle.volume / maxVolume) * 30,
        candleWidth: Math.max(2, Math.min(24, step * 0.65)),
      };
    });
  }, [candles]);

  const latest = candles[candles.length - 1];

  const prices = candles.flatMap((c) => [c.high, c.low]);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const priceRange = maxPrice - minPrice || maxPrice * 0.02 || 1;
  const chartMin = minPrice - priceRange * 0.1;
  const chartMax = maxPrice + priceRange * 0.1;
  const chartRange = chartMax - chartMin || 1;
  const timeAxisTicks =
    candles.length > 0
      ? [0, 0.25, 0.5, 0.75, 1].map((position) => {
          const index = Math.min(
            candles.length - 1,
            Math.floor(position * (candles.length - 1)),
          );

          return {
            position: chart[index].x,
            time: formatTime(candles[index].time, timeframe),
          };
        })
      : [];

  const handleChartPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || candles.length === 0) return;

    const stageBounds = stageRef.current?.getBoundingClientRect();
    const svgBounds = priceSvgRef.current?.getBoundingClientRect();
    if (!stageBounds || !svgBounds || svgBounds.width === 0 || svgBounds.height === 0) {
      return;
    }

    const chartX = Math.max(
      0,
      Math.min(((event.clientX - svgBounds.left) / svgBounds.width) * WIDTH, WIDTH),
    );
    const chartY = Math.max(
      PRICE_TOP,
      Math.min(((event.clientY - svgBounds.top) / svgBounds.height) * HEIGHT, PRICE_BOTTOM),
    );
    const candleIndex = Math.min(
      candles.length - 1,
      Math.floor((chartX / WIDTH) * candles.length),
    );
    const price = chartMin +
      ((PRICE_BOTTOM - chartY) / (PRICE_BOTTOM - PRICE_TOP)) * chartRange;
    const stageX = Math.max(
      0,
      Math.min(event.clientX - stageBounds.left, stageBounds.width),
    );
    const stageY = Math.max(
      8,
      Math.min(event.clientY - stageBounds.top, stageBounds.height - 8),
    );

    setCrosshair({
      x: stageX,
      y: stageY,
      timeX: Math.max(38, Math.min(stageX, stageBounds.width - 38)),
      price: formatPrice(price),
      time: formatTime(candles[candleIndex].time, timeframe),
    });
  };

  const priceLabels = [0, 1, 2, 3].map(
    (index) => chartMax - (chartRange * index) / 3,
  );

  const linePoints = chart.map((c) => `${c.x},${c.yClose}`).join(" ");

  const change = selectedToken?.metrics.priceChange24h;
  const tokenName = selectedToken
    ? `${selectedToken.symbol}/${selectedToken.quoteSymbol ?? "USD"}`
    : "Market chart";

  return (
    <div className="market-content">
      <PanelHeading
        title={tokenName}
        description={`${selectedToken?.name ?? "Select a token"} · ${selectedToken?.dexId ?? "DEX"}`}
        compact
        action={
          <span className="chart-change">
            {selectedToken?.metrics.priceUsd != null
              ? formatPrice(selectedToken.metrics.priceUsd)
              : "—"}
            {change != null && (
              <b className={change >= 0 ? "positive" : "negative"}>
                {change >= 0 ? "+" : ""}
                {change.toFixed(2)}%
              </b>
            )}
          </span>
        }
      />

      <div className="chart-toolbar">
        <div className="timeframes">
          {timeframes.map((t) => (
            <button
              key={t}
              className={timeframe === t ? "active" : ""}
              onClick={() => setTimeframe(t)}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="chart-modes">
          {(["Candles", "Line"] as const).map((m) => (
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
        {latest ? (
          <>
            <span>
              O: <b>{formatPrice(latest.open)}</b>
            </span>
            <span>
              H: <b className="positive">{formatPrice(latest.high)}</b>
            </span>
            <span>
              L: <b className="negative">{formatPrice(latest.low)}</b>
            </span>
            <span>
              C: <b>{formatPrice(latest.close)}</b>
            </span>
            <span>
              VOL: <b>${formatVolume(latest.volume)}</b>
            </span>
          </>
        ) : (
          <span>Waiting for market data</span>
        )}

        <span className="chart-live">
        DEXSCREENER PAIR SNAPSHOT
        </span>
      </div>

      <div
        className="chart-stage"
        ref={stageRef}
        role="group"
        aria-label={`${mode} chart for ${tokenName} at ${timeframe}`}
        onPointerMove={handleChartPointerMove}
        onPointerLeave={() => setCrosshair(null)}
        onPointerOut={(event) => {
          const nextTarget = event.relatedTarget;
          if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
            setCrosshair(null);
          }
        }}
      >
        <div
          className="chart-scroll"
          ref={scrollRef}
          aria-label="Scrollable chart plot"
          tabIndex={0}
        >
          <div
            className="chart-scroll-content"
            style={{
              width: `${WIDTH * zoom}px`,
              height: `${HEIGHT * zoom}px`,
            }}
          >
            {candles.length > 0 && (
              <div className="chart-price-labels">
                {priceLabels.map((price, index) => (
                  <span key={index}>{formatPrice(price)}</span>
                ))}
              </div>
            )}

            <svg
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              preserveAspectRatio="none"
              className="price-svg"
              ref={priceSvgRef}
            >
          {[35, 90, 145, 200, 255].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2={WIDTH}
              y2={y}
              className="chart-gridline"
            />
          ))}

          {mode === "Candles" &&
            chart.map((c, index) => {
              const up = c.close >= c.open;
              const top = Math.min(c.yOpen, c.yClose);
              const height = Math.max(1, Math.abs(c.yClose - c.yOpen));

              return (
                <g key={index}>
                  <line
                    x1={c.x}
                    y1={c.yHigh}
                    x2={c.x}
                    y2={c.yLow}
                    className={up ? "wick-up" : "wick-down"}
                  />
                  <rect
                    x={c.x - c.candleWidth / 2}
                    y={top}
                    width={c.candleWidth}
                    height={height}
                    className={up ? "candle-up" : "candle-down"}
                    rx="1"
                  />
                </g>
              );
            })}

          {mode === "Line" && chart.length > 0 && (
            <polyline points={linePoints} className="chart-line" />
          )}

            </svg>

            {showVolume && (
              <svg
                viewBox={`0 0 ${WIDTH} 30`}
                preserveAspectRatio="none"
                className="chart-volume-svg"
                aria-hidden="true"
              >
                {chart.map((c, index) => (
                  <rect
                    key={`volume-${index}`}
                    x={c.x - c.candleWidth / 2}
                    y={30 - c.volumeHeight}
                    width={c.candleWidth}
                    height={c.volumeHeight}
                    className={c.close >= c.open ? "volume-up" : "volume-down"}
                  />
                ))}
              </svg>
            )}

            {!loading && !error && candles.length > 0 && (
              <div className="chart-time-labels">
                {timeAxisTicks.map((tick, index) => (
                  <span
                    key={`${tick.position}-${index}`}
                    style={{ left: `${(tick.position / WIDTH) * 100}%` }}
                  >
                    {tick.time}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {crosshair && (
          <div className="chart-crosshair" aria-hidden="true">
            <span
              className="chart-crosshair-line chart-crosshair-vertical"
              style={{ left: crosshair.x }}
            />
            <span
              className="chart-crosshair-line chart-crosshair-horizontal"
              style={{ top: crosshair.y }}
            />
            <span
              className="chart-crosshair-price"
              style={{ top: crosshair.y }}
            >
              {crosshair.price}
            </span>
            <span
              className="chart-crosshair-time"
              style={{ left: crosshair.timeX }}
            >
              {crosshair.time}
            </span>
          </div>
        )}

        {loading && (
          <div role="status" className="chart-state">
            Loading historical market data...
          </div>
        )}

        {!loading && error && (
          <div role="alert" className="chart-state error">
            {error}
          </div>
        )}

      </div>

      <div className="chart-bottom">
        <div className="chart-bottom-pair">
          <span>
            <i className="legend-green" /> {tokenName}
          </span>
          <button onClick={() => setShowVolume(!showVolume)}>
            <Layers3 size={11} /> Volume {showVolume ? "ON" : "OFF"}
          </button>
        </div>

        <div className="chart-zoom-controls" aria-label="Chart zoom controls">
          <button
            type="button"
            aria-label="Zoom out"
            title="Zoom out"
            disabled={zoom <= MIN_ZOOM}
            onClick={() =>
              setZoomState({
                key: chartKey,
                value: Math.max(MIN_ZOOM, zoom - ZOOM_STEP),
              })
            }
          >
            <ZoomOut size={12} />
          </button>
          <span className="chart-zoom-level" aria-live="polite">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            aria-label="Zoom in"
            title="Zoom in"
            disabled={zoom >= MAX_ZOOM}
            onClick={() =>
              setZoomState({
                key: chartKey,
                value: Math.min(MAX_ZOOM, zoom + ZOOM_STEP),
              })
            }
          >
            <ZoomIn size={12} />
          </button>
          <button
            type="button"
            aria-label="Reset chart zoom and scroll"
            title="Reset chart zoom and scroll"
            onClick={() => {
              setZoomState({ key: chartKey, value: 1 });
              scrollRef.current?.scrollTo({ left: 0, top: 0 });
            }}
          >
            <RotateCcw size={11} />
          </button>
        </div>
        <span className="chart-live">
          HISTORICAL OHLCV · GECKOTERMINAL
        </span>
      </div>
    </div>
  );
}
