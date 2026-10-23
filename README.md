# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

## Integration update (UI implementation)

The active app entry point is `src/main.tsx`, which renders `src/app/App.tsx`. The JSX entry points (`src/main.jsx`, `src/App.jsx`) are legacy code and are not used by Vite because `index.html` points to `main.tsx`.

The terminal layout now uses a three-column desktop workspace: activity stream on the left, market chart plus positions/network analysis in the center, and token intelligence on the right. The market chart and activity filters use illustrative local demo data. They are not connected to a live exchange, wallet, or blockchain API; connect trusted services before presenting the figures as live data.

Run `npm ci`, then `npm run build` and `npm run dev` to validate locally. Resolve any TypeScript or lint errors before merging into `main`.


## Responsive layout

The application has one active entry point: `src/main.tsx`, which renders `src/app/App.tsx`.
The former JSX entry point and unused Vite starter files have been removed to avoid competing application roots.

The responsive layout uses CSS viewport breakpoints rather than device detection. Browser zoom changes the CSS viewport width, so the same rules adapt at high zoom (where the page behaves like a narrow viewport) and low zoom (where the desktop layout is retained). Test representative widths from 320px through 1920px; zoom percentage alone is not a stable test metric because it depends on monitor resolution and browser UI.

- Desktop: activity stream, market/analytics center, token intelligence.
- Tablet: activity stream beside market/analytics, token intelligence below.
- Mobile/narrow viewport: all major panels stack vertically.
- Mock market and activity data are illustrative and are not live exchange/blockchain data.

Build and run:

```bash
npm ci
npm run build
npm run dev
```
