---
name: dida-supplier-dashboard
description: Use when creating or adapting a DIDA-branded Chrome-style supplier analytics dashboard inspired by LiteAPI supplier pages, including overview, performance, API performance, errors, inventory, marketplace configuration, analytics, cost analysis, finance status, order logs, and bookings modules.
---

# DIDA Supplier Dashboard

## Purpose

Build a DIDA-branded supplier analytics dashboard with a clean Chrome-like SaaS shell: fixed top bar, left navigation, white cards, light borders, compact controls, dense charts, and operational data tables.

Use the bundled assets:

- `assets/logo-DIDA_positive.svg`
- `assets/Icon-DIDA_red.svg`

## Brand Tokens

```css
:root {
  --dida-navy: #000947;
  --dida-red: #ea0345;
  --dida-sky: #3ab5e6;
  --dida-green: #92c020;
  --dida-blue: #3b75ba;
  --dida-purple: #604696;
  --dida-orange: #f08905;
  --dida-gray: #93979a;
  --bg: #f7f8fb;
  --surface: #ffffff;
  --line: #dfe5ef;
  --line-soft: #edf1f7;
  --text: #000947;
  --muted: #63708a;
  --active-bg: #eef1ff;
  --chart-primary: #4f5fb8;
  --chart-grid: #e7ebf2;
  --radius: 8px;
  --shadow-card: 0 1px 2px rgba(0, 9, 71, 0.06);
  font-family: "Poppins", "Harmony Sans SC", "Inter", system-ui, sans-serif;
}
```

## App Shell

```html
<div class="app-shell">
  <aside class="sidebar">brand, account switcher, section nav, collapse button</aside>
  <main class="main">
    <header class="topbar">feed filter, previous-period toggle, date picker, notification, user</header>
    <section class="page">route content</section>
  </main>
  <button class="support-fab">headset icon</button>
</div>
```

Rules:

- Sidebar width: 248-260px; content max width about 1360px.
- Topbar is sticky, 64-68px tall, white, bottom border.
- Cards use 1px border, 8px radius, subtle shadow, no nested card-on-card.
- Main page spacing: 24px desktop, 16px tablet/mobile.
- Keep text compact; dashboard cards should scan quickly.

## Navigation Model

```js
const navSections = [
  { title: "BUSINESS", items: ["Overview", "Performance", "Custom Reports"] },
  { title: "INTEGRATION", items: ["API Performance", "Errors", "Inventory"] },
  { title: "MARKETPLACE", items: ["Configuration", "Analytics", "Cost analysis", "Finance Status", "Order Logs", "Bookings"] }
];
```

Each nav item has an icon, label, active state, and optional pill (`Soon`, `Active`). The active row uses `--active-bg` and DIDA blue/navy text.

## Shared Components

```js
function MetricCard({ title, value, delta, icon, tone = "blue", description }) {
  return { title, value, delta, icon, tone, description };
}

function ChartCard({ title, subtitle, children, footer }) {
  return { title, subtitle, children, footer };
}

function FilterSelect({ label, value, options, icon }) {
  return { label, value, options, icon };
}

function InsightCard({ title, priority, category, body, impact, actions }) {
  return { title, priority, category, body, impact, actions };
}

function DataTable({ columns, rows, actions }) {
  return { columns, rows, actions };
}
```

Implementation notes:

- Use SVG or canvas charts for static demos; use Recharts in React implementations.
- Use lucide-style icons or simple inline SVGs.
- Use real button semantics for controls, not decorative divs.
- Use `tabular-nums` for large metrics and table numerics.

## Overview Page

```js
const overviewModules = [
  "Quarterly forecast cards",
  "TTV over time line chart",
  "Win Rate mini chart",
  "Total Bookings mini chart",
  "Avg Booking Value sparkline",
  "Room Nights sparkline",
  "Pre-Book Error Rate sparkline",
  "Booking Error Rate sparkline",
  "Right-side Key Insights rail"
];
```

Layout:

- Desktop: 9-column analytics area + 3-column insights rail.
- Forecast card spans the main analytics area.
- TTV chart is full-width, followed by two-column metric charts.
- Insights rail uses pale purple background, purple border, priority pills, and quick actions.

## Performance Page

```js
const performanceMetrics = [
  { title: "Total Bookings", value: "10,599" },
  { title: "Total Revenue (TTV)", value: "$3,532,888" },
  { title: "Avg Booking Value", value: "$333" },
  { title: "Room Nights", value: "21,907" },
  { title: "Win Rate", value: "2.7%" }
];

const performanceFilters = ["All chains", "All lead times", "All refundability"];
```

Modules:

- KPI strip.
- Stacked bookings over time by feed.
- TTV over time.
- Win rate chart plus feed contribution table.
- CSV export button.

## API Performance Page

```js
const apiPerformanceModules = [
  "Technical Errors Impact on TTV alert",
  "Technical Performance Quality Over Time",
  "Pre-Book Error Rate card",
  "Booking Error Rate card",
  "Total Pre-Books card",
  "Total Bookings card",
  "Pre-Book Error Rate Over Time",
  "Booking Error Rate Over Time"
];
```

Use background quality bands:

- Great `90-100`: pale green.
- Good `70-90`: light green.
- Fair `50-70`: pale yellow.
- Degraded `0-50`: pale red.

## Errors Page

```js
const errorFilters = [
  "Action",
  "Error Type",
  "Source",
  "Supplier Message",
  "Lead time",
  "Search in logs"
];

const errorColumns = [
  "Date",
  "Source",
  "Action",
  "Error Type",
  "Supplier Message",
  "Errors",
  "Lead time (days)",
  "Hotel ID",
  "Rate Code",
  "Actions"
];
```

Modules:

- Warning banner: logs limited to last 48 hours.
- Filter row and search button.
- Estimated TTV loss chart.
- Error logs table with View action.
- Optional detail modal for request/response payloads.

## Inventory Page

```js
const inventoryMetrics = [
  "Avg Mapped Properties",
  "Avg Available Hotels",
  "Hotels Sold"
];

const inventoryDownloads = [
  "Download Mapped Hotels",
  "Download Available Hotels",
  "Download Sold Hotels"
];
```

Modules:

- Three KPI cards with download buttons.
- Three line charts: mapped properties, available hotels, sold hotels.

## Marketplace Configuration Page

```js
const marketplaceSettings = {
  feedList: ["HUB_Dida_B2B", "HUB_Dida_B2C", "HUB_Dida_CUG"],
  controls: ["Price tolerance", "Non-refundable", "0-1 day lead time"],
  actions: ["Add hotel chain override", "Add demand customer override", "Save settings"]
};
```

Modules:

- Quarterly forecasts.
- Quarter progress card.
- Marketplace settings feed list.
- Segment overrides with toggles and sliders.
- Previous quarter summary.
- FAQ accordion.

## Marketplace Analytics Page

```js
const marketplaceAnalyticsModules = [
  "Marketplace Bookings",
  "Marketplace TTV",
  "Avg. Effective Discount",
  "Marketplace cost",
  "Win Rate impact",
  "Quarterly forecast",
  "Performance timeline",
  "Performance analysis",
  "Price tolerance distribution"
];
```

Use solid line/area for baseline bookings or TTV and dashed overlay for incremental marketplace-adjusted performance.

## Cost Analysis Page

```js
const costAnalysisModules = [
  "Marketplace TTV and effective discount",
  "By refundable type",
  "By lead time",
  "By hotel chain"
];
```

Filters:

- All chains.
- All lead times.
- All refundability.

Charts:

- Combined bar + line chart for TTV and discount.
- Bar charts for refundable type and lead time.
- Horizontal bar chart for top hotel chains.

## Finance Status Page

```js
const financeStatusModules = [
  "Credit Limit",
  "Available Credit",
  "Used Credit",
  "Credit Expiry",
  "Account Status",
  "Credit utilization progress",
  "Settlement calendar",
  "Unsettled bill details"
];

const unsettledBillColumns = [
  "Bill ID",
  "Billing period",
  "Due date",
  "Type",
  "Bookings",
  "Amount",
  "Status",
  "Aging",
  "Owner",
  "Actions"
];
```

Use this page for customer credit exposure, credit-line expiry dates, open invoice status, unbilled booking exposure, settlement calendar items, and finance risk thresholds.

## Order Logs Page

```js
const orderLogColumns = [
  "Order No.",
  "Hotel",
  "Feed",
  "Price-check",
  "Booking",
  "Trace IDs",
  "Last event",
  "Actions"
];

const orderLogDetail = {
  priceCheckLogs: ["Valuation request sent", "Provider returned net price", "Price-check passed"],
  bookingLogs: ["Booking request created", "Supplier confirmation received", "Order completed"]
};
```

Layout:

- Follow the Bookings page's dense table style.
- Group rows by order number, not by provider booking id.
- Show both valuation/price-check state and booking state in the same row.
- Provide a side detail panel or expandable row with timestamped price-check and booking events.

## Bookings Page

```js
const bookingColumns = [
  "ID",
  "Hotel ID",
  "Hotel Name",
  "Feed",
  "Price",
  "Adjustment %",
  "Adj. amount",
  "Check-in",
  "Booking date"
];
```

Modules:

- Page heading.
- Export to CSV button.
- Wide table with compact rows.
- Keep horizontal overflow available for smaller screens.

## Interaction Requirements

```js
const interactions = {
  feedFilter: "filter all page metrics by selected feed",
  previousPeriod: "toggle current vs previous-period comparison",
  dateRange: "display May 11, 2026 - Jun 10, 2026",
  exportCsv: "download current table or report data",
  navClick: "switch page module without losing shell state",
  chartLegend: "toggle feed visibility",
  searchLogs: "filter error log table by query",
  settingsSliders: "update draft marketplace tolerance values",
  financeStatus: "review credit exposure, expiry, and unsettled bills",
  orderLogs: "inspect valuation and booking logs by order number"
};
```

Static demos may simulate interactions by swapping visible panels and showing disabled or mock states.

## Data Shape

```js
const dashboardData = {
  dateRange: ["2026-05-11", "2026-06-10"],
  feeds: ["HUB_Dida_B2B", "HUB_Dida_B2C", "HUB_Dida_CUG", "HUB_Dida_Snap feeds"],
  overview: { ttv: 3532888, winRate: 0.027, bookings: 10599, roomNights: 21907 },
  technical: { preBookErrorRate: 0.0735, bookingErrorRate: 0.0572, lostTtv: 615900 },
  inventory: { mapped: 295748, available: 189226, sold: 0 },
  marketplace: { bookings: 3905, ttv: 1080544, discount: 0.005, cost: 17534 },
  finance: { creditLimit: 2500000, usedCredit: 1687550, availableCredit: 812450, expiry: "2026-07-31" },
  orderLogs: [{ orderNo: "DIDA-20260610-88421", priceCheck: "Passed", booking: "Confirmed" }]
};
```

## Responsive Behavior

```css
@media (max-width: 1100px) {
  .sidebar { width: 76px; }
  .nav-label, .section-title, .account-name { display: none; }
  .content-grid, .metric-grid { grid-template-columns: 1fr; }
}

@media (max-width: 760px) {
  .app-shell { display: block; }
  .sidebar { position: static; width: 100%; }
  .topbar { position: sticky; top: 0; }
  .page { padding: 16px; }
}
```

## Visual QA Checklist

```text
[ ] DIDA logo is visible and not distorted.
[ ] Primary colors match #000947, #EA0345, #3AB5E6.
[ ] Cards have consistent radius, borders, and spacing.
[ ] Sidebar active state matches the current module.
[ ] Charts have readable axes, legends, and no clipped labels.
[ ] Tables stay readable at desktop width and overflow horizontally on mobile.
[ ] Buttons and filters have clear hover/focus states.
[ ] No text overlaps or spills out of cards.
```
