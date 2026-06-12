# Frontend React Google Style Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new `frontend/` React + Vite + TypeScript dashboard prototype that preserves the current DIDA supplier dashboard while adding componentized interaction and Google Cloud Console-style polish.

**Architecture:** The app is a client-side prototype with a persistent app shell and feature-owned page modules. Shared components provide cards, charts, tables, filters, status pills, drawers, and CSV export without importing business modules. Feature modules import mock data and chart option factories, keeping each module independent.

**Tech Stack:** React 18, Vite, TypeScript, ECharts, lucide-react, CSS modules by convention through global design-system classes.

---

## File Map

- Create `frontend/package.json`: scripts and runtime dependencies.
- Create `frontend/index.html`: Vite mount point.
- Create `frontend/tsconfig.json`, `frontend/tsconfig.node.json`, `frontend/vite.config.ts`: TypeScript and Vite configuration.
- Create `frontend/src/main.tsx`: React bootstrap.
- Create `frontend/src/app/*`: app shell, state, navigation, routes.
- Create `frontend/src/styles/*`: DIDA tokens, Google-style global controls, layout CSS.
- Copy DIDA logo assets into `frontend/src/assets/`.
- Create `frontend/src/data/*`: typed mock data and formatters.
- Create `frontend/src/shared/components/*`: reusable UI primitives.
- Create `frontend/src/shared/charts/*`: ECharts wrapper and theme defaults.
- Create `frontend/src/shared/hooks/*`: CSV export and debounced search helpers.
- Create `frontend/src/shared/types/*`: table and status types.
- Create `frontend/src/features/*`: one folder per dashboard module.

## Task 1: Scaffold Vite React Project

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/index.html`
- Create: `frontend/tsconfig.json`
- Create: `frontend/tsconfig.node.json`
- Create: `frontend/vite.config.ts`
- Create: `frontend/src/main.tsx`

- [ ] **Step 1: Create project metadata and scripts**

Use this dependency baseline:

```json
{
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "tsc -b && vite build",
    "typecheck": "tsc -b --noEmit",
    "preview": "vite preview --host 127.0.0.1"
  },
  "dependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "latest",
    "typescript": "latest",
    "react": "latest",
    "react-dom": "latest",
    "echarts": "latest",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "@types/react": "latest",
    "@types/react-dom": "latest"
  }
}
```

- [ ] **Step 2: Add Vite and TypeScript config**

Use strict TypeScript, JSX with `react-jsx`, and a `@` alias pointing to `src`.

- [ ] **Step 3: Add the initial React mount**

`main.tsx` imports global styles and renders `<App />` into `#root`.

- [ ] **Step 4: Run install**

Run: `npm install`

Expected: dependencies install and `frontend/package-lock.json` is created.

## Task 2: Add App Shell, Navigation, Assets, And Global State

**Files:**
- Create: `frontend/src/app/App.tsx`
- Create: `frontend/src/app/AppShell.tsx`
- Create: `frontend/src/app/app-state.tsx`
- Create: `frontend/src/app/navigation.ts`
- Create: `frontend/src/app/routes.tsx`
- Create: `frontend/src/styles/tokens.css`
- Create: `frontend/src/styles/globals.css`
- Create: `frontend/src/styles/layout.css`
- Create: `frontend/src/assets/logo-DIDA_positive.svg`
- Create: `frontend/src/assets/Icon-DIDA_red.svg`

- [ ] **Step 1: Copy DIDA assets**

Copy the existing SVG assets from `demo/assets/` or `skills/dida-supplier-dashboard/assets/` into `frontend/src/assets/`. The sidebar must render `logo-DIDA_positive.svg` visibly.

- [ ] **Step 2: Create app state**

Define:

```ts
export type PageId =
  | "overview"
  | "performance"
  | "reports"
  | "api"
  | "errors"
  | "inventory"
  | "configuration"
  | "analytics"
  | "cost"
  | "finance"
  | "order-logs"
  | "bookings";
```

Expose `activePage`, `setActivePage`, `collapsed`, `setCollapsed`, `selectedFeed`, `setSelectedFeed`, and `showPreviousPeriod`.

- [ ] **Step 3: Create grouped navigation**

Use the same groups as the static demo:

```ts
BUSINESS: Overview, Performance, Custom Reports
INTEGRATION: API Performance, Errors, Inventory
MARKETPLACE: Configuration, Analytics, Cost analysis, Finance Status, Order Logs, Bookings
```

- [ ] **Step 4: Create AppShell**

Render sidebar, DIDA logo, account chip, grouped nav buttons, collapse button, sticky topbar, and active page outlet.

- [ ] **Step 5: Add responsive CSS**

Use DIDA tokens and Google Cloud Console-style surfaces. Ensure cards use 8px radius, topbar does not overlap controls, and collapsed sidebar keeps a recognizable logo/icon.

## Task 3: Build Shared UI Components

**Files:**
- Create: `frontend/src/shared/components/Button.tsx`
- Create: `frontend/src/shared/components/Card.tsx`
- Create: `frontend/src/shared/components/ChartCard.tsx`
- Create: `frontend/src/shared/components/DataTable.tsx`
- Create: `frontend/src/shared/components/Drawer.tsx`
- Create: `frontend/src/shared/components/FilterControl.tsx`
- Create: `frontend/src/shared/components/MetricCard.tsx`
- Create: `frontend/src/shared/components/PageHeader.tsx`
- Create: `frontend/src/shared/components/StatusPill.tsx`
- Create: `frontend/src/shared/types/table.ts`

- [ ] **Step 1: Implement Button**

Support `variant`, `size`, icon children, disabled state, and native button props.

- [ ] **Step 2: Implement Card, ChartCard, MetricCard, PageHeader, and StatusPill**

Keep business labels out of shared components. Use props for title, value, tone, caption, actions, and children.

- [ ] **Step 3: Implement DataTable**

Use typed columns:

```ts
export type TableColumn<T> = {
  key: keyof T | string;
  header: string;
  align?: "left" | "right" | "center";
  width?: string;
  render?: (row: T) => React.ReactNode;
};
```

The table wrapper must use horizontal overflow and fixed row rhythm.

- [ ] **Step 4: Implement Drawer**

Drawer supports open/close, title, subtitle, and children. It must not unmount the full app shell.

## Task 4: Build Chart Foundation

**Files:**
- Create: `frontend/src/shared/charts/BaseChart.tsx`
- Create: `frontend/src/shared/charts/chart-theme.ts`

- [ ] **Step 1: Implement BaseChart**

Create and dispose an ECharts instance with `useEffect`, call `setOption`, and resize on container/window changes.

- [ ] **Step 2: Enforce chart containment**

Merge every option with:

```ts
grid: { left: 8, right: 16, top: 32, bottom: 28, containLabel: true }
tooltip: { confine: true }
legend: { type: "scroll" }
```

- [ ] **Step 3: Add a non-overflowing chart container**

Use fixed min heights by CSS class, `overflow: hidden` at the card body, and `ResizeObserver` when available.

## Task 5: Add Mock Data And Formatters

**Files:**
- Create: `frontend/src/data/chart-series.ts`
- Create: `frontend/src/data/dashboard.ts`
- Create: `frontend/src/data/finance.ts`
- Create: `frontend/src/data/order-logs.ts`
- Create: `frontend/src/data/bookings.ts`
- Create: `frontend/src/data/formatters.ts`
- Create: `frontend/src/shared/hooks/useCsvExport.ts`
- Create: `frontend/src/shared/hooks/useDebouncedValue.ts`

- [ ] **Step 1: Move chart labels and series from `demo/index.html`**

Keep values recognizable, using the existing May 11 to Jun 10 period and current KPI values.

- [ ] **Step 2: Add typed finance, order log, and booking rows**

Rows must include the columns visible in the static demo.

- [ ] **Step 3: Add formatters**

Provide currency, percent, integer, and date-ish label helpers. Avoid inline number formatting in page components.

- [ ] **Step 4: Add CSV export**

Create a browser download from current rows and column headers.

## Task 6: Implement Feature Pages

**Files:**
- Create: `frontend/src/features/overview/OverviewPage.tsx`
- Create: `frontend/src/features/performance/PerformancePage.tsx`
- Create: `frontend/src/features/api-performance/ApiPerformancePage.tsx`
- Create: `frontend/src/features/errors/ErrorsPage.tsx`
- Create: `frontend/src/features/inventory/InventoryPage.tsx`
- Create: `frontend/src/features/marketplace-configuration/MarketplaceConfigurationPage.tsx`
- Create: `frontend/src/features/marketplace-analytics/MarketplaceAnalyticsPage.tsx`
- Create: `frontend/src/features/cost-analysis/CostAnalysisPage.tsx`
- Create: `frontend/src/features/finance-status/FinanceStatusPage.tsx`
- Create: `frontend/src/features/order-logs/OrderLogsPage.tsx`
- Create: `frontend/src/features/bookings/BookingsPage.tsx`
- Create: `frontend/src/features/reports/ReportsPage.tsx`

- [ ] **Step 1: Implement Overview**

Use forecast cards, TTV chart, KPI cards, and insight rail with existing labels and values.

- [ ] **Step 2: Implement Performance, API, Errors, and Inventory**

Use shared filter controls, chart cards, metric cards, and tables. Keep each feature folder independent.

- [ ] **Step 3: Implement Marketplace pages**

Add configuration controls, tolerance slider, analytics cards, and cost distribution charts.

- [ ] **Step 4: Implement Finance Status**

Render credit status metrics, utilization progress, settlement schedule, and unsettled bill table.

- [ ] **Step 5: Implement Order Logs**

Render a table and detail drawer. Selecting "View logs" opens the selected order timeline.

- [ ] **Step 6: Implement Bookings and Reports**

Bookings renders searchable rows and CSV export. Reports keeps existing Soon messaging in the new shell.

## Task 7: Wire Routes And Interactions

**Files:**
- Modify: `frontend/src/app/routes.tsx`
- Modify: `frontend/src/app/AppShell.tsx`
- Modify: feature pages that receive global state.

- [ ] **Step 1: Register all pages**

Every nav item must map to exactly one page component.

- [ ] **Step 2: Wire topbar controls**

Feed select updates `selectedFeed`, previous-period toggle updates `showPreviousPeriod`, and date range remains visible.

- [ ] **Step 3: Wire local filters**

Search inputs filter table rows. Sliders update visible values or summaries.

## Task 8: Verification And Visual QA

**Files:**
- Modify only if verification reveals issues.

- [ ] **Step 1: Typecheck**

Run: `npm run typecheck`

Expected: no TypeScript errors.

- [ ] **Step 2: Build**

Run: `npm run build`

Expected: Vite build completes and outputs `frontend/dist/`.

- [ ] **Step 3: Browser QA**

Run: `npm run dev -- --port 4174`

Open: `http://127.0.0.1:4174/`

Check:

- DIDA logo is visible and not distorted.
- Visual style still reads as current DIDA supplier dashboard.
- All nav pages switch.
- Sidebar collapse works.
- Charts do not overflow cards.
- Chart labels, legends, and content do not overlap.
- Tables scroll horizontally on narrow widths.
- Order logs drawer opens and closes.

- [ ] **Step 4: Fix any QA issues**

Make targeted CSS or option-factory fixes, then rerun `npm run typecheck` and `npm run build`.

## Self-Review

Spec coverage:

- New `frontend/` project: Task 1.
- Low-coupling feature modules: Tasks 2, 3, 6, and 7.
- DIDA style and logo preservation: Tasks 2 and 8.
- Google Cloud Console interaction polish: Tasks 2, 3, and 7.
- Chart boundary and overlap control: Tasks 4 and 8.
- Data tables and CSV behavior: Tasks 3, 5, 6, and 8.
- Finance Status and Order Logs interaction: Task 6.

Placeholder scan: no TBD/TODO placeholders are intentional plan content.

Type consistency: `PageId`, table columns, chart wrappers, and app state names are defined before use.

