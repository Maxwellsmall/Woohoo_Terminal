# Woohoo World Web3 Terminal

A collaborative project to build a Web3 trading terminal inspired by the
supplied design. The interface includes a market chart, live activity
feed, token analytics, security information, and positions/network
analytics.

This README explains how the team should organize the work, use Git and
GitHub, and integrate features while working remotely.

## Table of Contents

-   [Project Goals](#project-goals)
-   [Team Responsibilities](#team-responsibilities)
-   [Technology Stack](#technology-stack)
-   [Project Structure](#project-structure)
-   [Getting Started](#getting-started)
-   [Branching and Git Workflow](#branching-and-git-workflow)
-   [Pull Request and Review Process](#pull-request-and-review-process)
-   [Shared Code and Component
    Contracts](#shared-code-and-component-contracts)
-   [Remote Collaboration](#remote-collaboration)
-   [Milestones](#milestones)
-   [Team Rules](#team-rules)
-   [Kickoff Checklist](#kickoff-checklist)

## Project Goals

Build a responsive, dark-themed Web3 terminal with these main areas:

-   **Market chart:** trading pair, price chart, timeframe controls, and
    volume.
-   **Activity feed:** recent swaps, votes, mints, and other activity,
    with filters.
-   **Token intelligence:** token price, liquidity, volume, market
    capitalization, wallet/contract details, and security indicators.
-   **Positions and network analytics:** positions table,
    consensus/network information, and related metrics.
-   **Application shell:** navigation, responsive layout, reusable UI
    components, and integration of all features.

Build the interface with mock data first. Connect real data sources only
after the layout and shared data contracts are agreed upon. A visual
dashboard is not automatically a secure or fully functional trading
system; wallet connections, on-chain verification, and transaction
execution should be treated as separate work with their own security
review.

## Team Responsibilities

Each developer owns their feature area and should primarily work within
the assigned folders.

### Developer 1: Trading Chart and Market Data

**Branch:** `feature/market-chart`

Responsibilities:

-   Build the market pair header and price summary where appropriate.
-   Implement the candlestick chart.
-   Add timeframe controls, such as 1m, 5m, 15m, 1h, and other supported
    intervals.
-   Add chart display modes such as Candles, Line, and Depth if
    supported by the chosen charting library and data.
-   Display price labels and volume bars.
-   Handle loading, empty, and error states.
-   Define and implement the market-data service in coordination with
    the team.

Primary folder: `src/features/market-chart/`

### Developer 2: Activity Feed and Portfolio Analytics

**Branch:** `feature/activity-analytics`

Responsibilities:

-   Build the activity feed.
-   Support activity categories such as swaps, votes, and mints.
-   Add filters for All, Mints, Votes, and Swaps.
-   Format timestamps, transaction descriptions, and amounts.
-   Build the positions and network analytics sections.
-   Add consensus or network information where data is available.
-   Handle loading, empty, and error states.

Primary folders:

-   `src/features/activity-feed/`
-   `src/features/analytics/`

### Developer 3: Token Intelligence, Application Shell, and Integration

**Branch:** `feature/token-layout`

Responsibilities:

-   Build the global terminal header and navigation.
-   Create the overall responsive page layout.
-   Build token overview and metric cards.
-   Display liquidity, 24-hour volume, fully diluted valuation (FDV),
    and market capitalization when data is available.
-   Build wallet and contract address cards.
-   Display token security checks only when supported by reliable data.
-   Add an external market-data link, such as a Dexscreener link, when
    applicable.
-   Integrate the feature components into the main application.
-   Coordinate shared interfaces and resolve integration issues with the
    team.

Primary folders:

-   `src/components/layout/`
-   `src/features/token-intelligence/`
-   `src/app/`

Developer 3 coordinates integration but is not the sole decision-maker.
Shared architecture and interfaces should be agreed upon by all three
developers.

## Technology Stack

Recommended starting stack:

  -----------------------------------------------------------------------
  Area                    Technology              Purpose
  ----------------------- ----------------------- -----------------------
  Frontend                React + TypeScript +    Application and
                          Vite                    component development

  Styling                 Tailwind CSS            Responsive layout and
                                                  consistent styling

  Charts                  TradingView Lightweight Candlestick and market
                          Charts                  charts

  Icons                   Lucide React            Interface icons

  Data fetching           TanStack Query          Fetching, caching, and
                                                  refreshing data

  Real-time data          WebSockets, if          Live prices and
                          supported by the        activity
                          provider                

  Backend (if needed)     Node.js + Express       API endpoints and data
                                                  normalization

  Version control         Git + GitHub            Shared source code and
                                                  reviews

  Deployment              Vercel or another       Preview and production
                          agreed platform         deployment

  Task tracking           GitHub Issues/Projects  Ownership and progress
                          or Trello               tracking

  Communication           Discord or WhatsApp     Day-to-day coordination
  -----------------------------------------------------------------------

The stack is a recommendation. Agree on any changes together before
introducing additional dependencies.

## Project Structure

Use a feature-oriented structure so each developer can work
independently:

``` text
woohoo-world-terminal/
â”œâ”€â”€ public/
â”‚   â””â”€â”€ assets/
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ app/
â”‚   â”‚   â”œâ”€â”€ App.tsx
â”‚   â”‚   â””â”€â”€ providers.tsx
â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ layout/
â”‚   â”‚   â”‚   â”œâ”€â”€ TerminalHeader.tsx
â”‚   â”‚   â”‚   â””â”€â”€ TerminalLayout.tsx
â”‚   â”‚   â””â”€â”€ ui/
â”‚   â”œâ”€â”€ features/
â”‚   â”‚   â”œâ”€â”€ market-chart/
â”‚   â”‚   â”‚   â”œâ”€â”€ MarketChart.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ TimeframeSelector.tsx
â”‚   â”‚   â”‚   â””â”€â”€ market.types.ts
â”‚   â”‚   â”œâ”€â”€ activity-feed/
â”‚   â”‚   â”‚   â”œâ”€â”€ ActivityFeed.tsx
â”‚   â”‚   â”‚   â””â”€â”€ activity.types.ts
â”‚   â”‚   â”œâ”€â”€ token-intelligence/
â”‚   â”‚   â”‚   â”œâ”€â”€ TokenOverview.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ TokenMetrics.tsx
â”‚   â”‚   â”‚   â””â”€â”€ SecurityPanel.tsx
â”‚   â”‚   â””â”€â”€ analytics/
â”‚   â”‚       â”œâ”€â”€ PositionsTable.tsx
â”‚   â”‚       â””â”€â”€ NetworkAnalytics.tsx
â”‚   â”œâ”€â”€ services/
â”‚   â”‚   â”œâ”€â”€ market.service.ts
â”‚   â”‚   â””â”€â”€ activity.service.ts
â”‚   â”œâ”€â”€ types/
â”‚   â”‚   â””â”€â”€ index.ts
â”‚   â”œâ”€â”€ data/
â”‚   â”‚   â””â”€â”€ mock-data.ts
â”‚   â”œâ”€â”€ styles/
â”‚   â”‚   â””â”€â”€ globals.css
â”‚   â””â”€â”€ main.tsx
â”œâ”€â”€ .env.example
â”œâ”€â”€ .gitignore
â”œâ”€â”€ package.json
â”œâ”€â”€ README.md
â””â”€â”€ tsconfig.json
```

This is the target structure, not a requirement to create every file
immediately. Add or adjust files as the implementation evolves, but
discuss structural changes that affect other developers.

## Getting Started

### 1. Install prerequisites

Install:

-   Git
-   Node.js (use a current LTS version)
-   npm, which is included with Node.js
-   A code editor such as Visual Studio Code

### 2. Clone the repository

After the repository has been created on GitHub:

``` bash
git clone https://github.com/YOUR_ORG_OR_USERNAME/woohoo-world-terminal.git
cd woohoo-world-terminal
```

Replace `YOUR_ORG_OR_USERNAME` with the actual GitHub organization or
username.

### 3. Install dependencies

``` bash
npm install
```

### 4. Start the development server

``` bash
npm run dev
```

Use the local URL printed by Vite in your terminal. If the repository
uses different scripts, follow the scripts defined in `package.json`.

### 5. Verify the project

Before starting feature work, make sure the application runs locally and
the initial layout renders without errors.

## Branching and Git Workflow

We use **one shared GitHub repository**, one stable `main` branch, and a
separate feature branch for each developer.

### Branches

  ------------------------------------------------------------------------------
  Branch                         Owner                   Scope
  ------------------------------ ----------------------- -----------------------
  `main`                         All team members        Integrated, stable
                                                         application

  `feature/market-chart`         Developer 1             Chart and market data

  `feature/activity-analytics`   Developer 2             Activity feed and
                                                         analytics

  `feature/token-layout`         Developer 3             Token intelligence,
                                                         layout, and integration
  ------------------------------------------------------------------------------

Create additional short-lived branches for substantial fixes or features
when needed. Avoid doing unrelated work in the same branch.

### Initial setup

The repository maintainer should create the repository, add the starter
application, and invite the other developers as collaborators. Each
developer then clones the same repository.

Create your assigned branch:

``` bash
git switch main
git pull origin main
git switch -c feature/market-chart
git push -u origin feature/market-chart
```

Use your own branch name in place of `feature/market-chart`.

If the branch already exists on GitHub, check it out instead of creating
it:

``` bash
git fetch origin
git switch --track origin/feature/market-chart
```

### Daily workflow

1.  Check your current branch and working tree.
2.  Fetch the latest remote changes.
3.  Incorporate recent `main` changes into your feature branch before
    beginning a new task, when appropriate.
4.  Implement one focused task.
5.  Run the relevant checks locally.
6.  Commit your changes with a clear message.
7.  Push your feature branch.
8.  Open or update a pull request when the work is ready for review.

Useful commands:

``` bash
git status
git branch --show-current
git fetch origin
git merge origin/main
```

Only merge `origin/main` after checking your working tree. Commit or
safely stash unfinished work first. Resolve conflicts locally and run
the tests/build before pushing.

### Commit and push

Stage only the files relevant to your task:

``` bash
git add src/features/market-chart
git commit -m "feat(chart): add candlestick chart"
git push
```

Examples of clear commit messages:

``` text
feat(chart): add timeframe selector
feat(activity): add activity filters
feat(token): add liquidity metrics
fix(chart): handle empty candle data
style(layout): improve mobile responsiveness
docs: update setup instructions
```

`git push` uploads your branch. It does **not** merge it into `main`.

### Never work directly on `main`

Do not commit directly to `main`. Do not force-push shared branches.
Keep `main` in a working, integrated state and merge feature work
through pull requests.

## Pull Request and Review Process

Every completed feature should be merged through a GitHub pull request.

1.  Push the feature branch to GitHub.
2.  Open a pull request with `main` as the base branch.
3.  Explain what changed, why it changed, and how to test it.
4.  Request review from at least one teammate.
5.  Address feedback and resolve review conversations.
6.  Run the project checks and confirm the build passes.
7.  Merge the pull request using the agreed merge strategy.
8.  Fetch the latest `main` and incorporate it into your own branch
    before continuing.

Protect `main` with pull-request reviews and automated checks if the
repository plan and configuration support them. For changes to shared
interfaces, app configuration, or the overall layout, consult all three
developers before merging.

### Pull request checklist

-   [ ] The change matches the task.
-   [ ] The app builds and runs.
-   [ ] Relevant tests or manual checks have passed.
-   [ ] Loading, empty, and error states are handled where relevant.
-   [ ] No API keys, passwords, or private credentials were committed.
-   [ ] Shared interfaces and styles remain consistent.
-   [ ] Screenshots are included for significant UI changes.
-   [ ] The pull request description explains how to test the change.

## Shared Code and Component Contracts

Agree on shared types and component interfaces before the feature work
becomes extensive. Use mock data that follows these contracts so each
feature can be developed without waiting for the live API.

Illustrative starting types:

``` ts
export type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type Activity = {
  id: string;
  type: "SWAP" | "VOTE" | "MINT";
  timestamp: number;
  description: string;
  amount?: number;
};

export type ActivityFilter =
  | "ALL"
  | "MINTS"
  | "VOTES"
  | "SWAPS";
```

Illustrative component contracts:

``` tsx
type MarketChartProps = {
  pair: string;
  timeframe: string;
  candles: Candle[];
};

type ActivityFeedProps = {
  activities: Activity[];
  activeFilter: ActivityFilter;
  onFilterChange: (filter: ActivityFilter) => void;
};

type TokenOverviewProps = {
  symbol: string;
  price: number;
  priceChange24h: number;
};
```

These are examples, not final API specifications. Agree on field names,
units, timestamp formats, optional values, and error handling before
implementing integrations. Store shared types in the appropriate feature
type files or agreed shared type files. Avoid defining conflicting
versions of the same data type in multiple places.

### File ownership

  --------------------------------------------------------------------------
  Area                                   Primary owner
  -------------------------------------- -----------------------------------
  `src/features/market-chart/**`         Developer 1

  `src/features/activity-feed/**`        Developer 2

  `src/features/analytics/**`            Developer 2

  `src/features/token-intelligence/**`   Developer 3

  `src/components/layout/**`             Developer 3

  `src/app/App.tsx` and app              Developer 3, with team agreement
  configuration                          

  Shared types and data contracts        All three developers agree
  --------------------------------------------------------------------------

The primary owner is responsible for coordinating changes, not for
blocking reasonable collaboration. Ask before modifying another person's
area. Keep shared files such as `App.tsx`, global styles,
`package.json`, and shared configuration changes coordinated to reduce
merge conflicts.

## Remote Collaboration

Because the team is working from different locations, keep communication
lightweight but consistent.

### Tools

-   **GitHub:** source code, pull requests, issues, and code reviews.
-   **GitHub Projects or Trello:** task tracking.
-   **Discord or WhatsApp:** questions, short updates, and quick
    coordination.
-   **A short video call:** once or twice a week to review progress and
    unblock work.

### Task board

Use three basic columns:

-   **To Do**
-   **In Progress**
-   **Done**

Each task should have one owner, a clear expected outcome, and a pull
request link when implementation begins.

### Daily async update

Each developer posts:

-   **Done:** what was completed.
-   **Next:** what they plan to do next.
-   **Blocked:** what is preventing progress, if anything.

Example:

> **Done:** Chart renders mock OHLC data.
>
> **Next:** Add timeframe switching and volume bars.
>
> **Blocked:** Need agreement on the market-data timestamp format.

Record important technical decisions in the README or a `docs/`
directory so developers who miss a call can catch up.

## Milestones

A suggested initial schedule is below. Adjust it based on team
availability, experience, and data-provider requirements.

### Milestone 1: Foundation

-   Create the repository and starter application.
-   Agree on styling, layout, and dependencies.
-   Create shared layout and feature placeholders.
-   Agree on data contracts and mock data.
-   Verify that all developers can run the app.

### Milestone 2: Independent development

-   Developer 1 builds the chart and timeframe controls.
-   Developer 2 builds the activity feed and analytics.
-   Developer 3 builds token intelligence and the application shell.
-   All features use mock data and handle basic UI states.

### Milestone 3: Integration

-   Review and merge pull requests.
-   Assemble the complete terminal.
-   Fix layout, shared-state, and data-contract issues.
-   Test all panels together with consistent mock data.

### Milestone 4: Polish and release 

-   Integrate real market and transaction data where available.
-   Test loading, empty, and error states.
-   Check responsive layouts and browser behavior.
-   Deploy a preview and fix final issues.

The schedule is an estimate, not a deadline guarantee. Keep the
interface working and integrated throughout development rather than
postponing all integration until the end.

## Team Rules

1.  One repository, one protected `main` branch, and separate feature
    branches.
2.  No direct commits to `main`.
3.  Every feature has a clear owner and agreed scope.
4.  Use shared TypeScript interfaces and consistent mock data.
5.  Coordinate changes to shared files before making them.
6.  Keep commits focused and pull requests reasonably small.
7.  Review code respectfully and explain requested changes clearly.
8.  Run the relevant checks before requesting a merge.
9.  Never commit secrets. Keep local environment files out of Git and
    provide placeholders in `.env.example`.
10. Communicate blockers early and document important decisions.
11. Do not claim token security, liquidity, or on-chain status without a
    reliable source and a clear definition of what was checked.
12. Treat wallet connectivity and transaction execution as
    security-sensitive features requiring separate design, testing, and
    review.

## Kickoff Checklist

-   [ ] Create the GitHub repository and invite all developers.
-   [ ] Add the initial React, TypeScript, and Vite application.
-   [ ] Agree on the styling system and charting library.
-   [ ] Create the three feature branches.
-   [ ] Establish the initial layout and placeholder components.
-   [ ] Agree on shared types and mock data.
-   [ ] Create GitHub Issues and assign owners.
-   [ ] Verify that all three developers can run the application
    locally.
-   [ ] Open the first pull request and test the review process.
-   [ ] Begin parallel feature development.

## Definition of Done

A task is done when:

-   Its agreed functionality is implemented.
-   It follows the shared interfaces and project conventions.
-   It has been tested locally, including relevant edge cases.
-   It does not introduce known build or runtime errors.
-   Its pull request has been reviewed and merged.
-   Any important setup or usage change is documented.

**The team's guiding principle:** build independently, communicate
early, and integrate continuously. The goal is one coherent terminal,
not three separate implementations stitched together at the last minute.