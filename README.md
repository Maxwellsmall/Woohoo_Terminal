# Woohoo Terminal

A responsive, read-only market dashboard for the Woohoo token contract
`0x9244708F469199C2e1bC613d31e615E33Bf87777`.

## Run locally

```sh
npm install
npm run dev
```

Validate changes with:

```sh
npm run build
npm run lint
```

## Market data

- Token and trading-pair details come from the public Dexscreener token-pairs
  endpoint. Valid pairs are filtered to the specified contract as the base
  token, deduplicated by network and pair address, sorted by reported liquidity,
  and selectable from the header Settings panel. The token-intelligence panel
  shows pair creation and pooled-token details, USD/native prices, valuation
  and liquidity, plus selectable 5-minute, 1-hour, 6-hour, and 24-hour market
  activity.
- The Settings panel controls the active pair/network, chart-volume visibility,
  and dark, light, or system theme. Theme and chart-volume preferences are saved
  in the browser. The wallet control explains that wallet access is disabled.
- Market data refreshes every 45 seconds. The selected pair is preserved across
  refreshes when it remains available; otherwise, the highest-liquidity pair is
  selected. A failed refresh retains the last successful data and marks it as
  potentially stale.
- Historical OHLCV chart data comes from GeckoTerminal for the selected pair.
  Candle requests follow the selected timeframe and are cleared immediately
  when the pair changes. Network IDs without a configured GeckoTerminal mapping
  show an unsupported-network message. The chart supports 75%–400% zoom and
  scrolling in both directions; changing the pair or timeframe resets its view.
- Recent pool trades come from GeckoTerminal's documented
  `GET /networks/{network}/pools/{pool_address}/trades` endpoint. The activity
  feed polls every 30 seconds, retains recent records while updating, and is
  reset when the selected pair changes. Each trade shows its date, side, USD
  value, token and quote amounts, token USD price, trader, and transaction link.
  GeckoTerminal's public endpoint does not require an API key; provider rate
  limits may temporarily interrupt updates.
- Missing API values are displayed as unavailable. Market capitalization and
  fully diluted valuation are shown separately and are never substituted for
  one another.

## Data limitations

- The GeckoTerminal trades endpoint returns recent pool trades (up to 300 in
  its default 24-hour window), not a complete or websocket-based transaction
  history. Updates are polling-based, not instantaneous. Explorer links are
  provided only for networks with a configured explorer URL.
- Activity rows use GeckoTerminal trade records, so they may not match
  Dexscreener's transaction indexing or ordering exactly.
- Portfolio balances, positions, rewards, and network statistics are not
  connected. Pair analytics contains only reported market data.
- Contract verification, ownership status, and liquidity-lock status remain
  unknown; Dexscreener data alone cannot verify them.
- Wallet connection and financial transactions are intentionally not
  implemented. The dashboard is read-only.

The public data providers may rate-limit requests or omit individual fields.
The interface reports these conditions rather than filling gaps with sample
values.
