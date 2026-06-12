# Partner Insight Hub React Frontend Design

Date: 2026-06-12

## Goal

Create a new engineered frontend prototype from the latest static demo at `demo/index.html`.
The new frontend will live in `frontend/` and use React, Vite, and TypeScript.

The product should feel like the current DIDA supplier dashboard, not a visual redesign. The work keeps the DIDA logo, brand colors, dashboard density, module set, and supplier analytics content. "Google style" means Google Cloud Console-style interaction discipline: clean app shell, predictable controls, restrained spacing, clear focus states, robust tables, and responsive charts.

## Non-Negotiable Constraints

- Preserve the existing DIDA dashboard feel and information architecture.
- Preserve the DIDA logo in the app shell. Do not remove or replace it.
- Preserve the latest static HTML demo as a reference. Do not overwrite `demo/index.html`.
- Build a new project directory at `frontend/`.
- Keep modules low-coupled and high-cohesion. Feature modules must not depend on each other.
- Charts must stay inside their card boundaries. Labels, legends, tooltips, and plotted data must not overflow, clip awkwardly, or overlap adjacent UI.
- Tables must remain scan-friendly on desktop and horizontally scroll on smaller screens.
- First version uses local mock data and does not require a backend.

## Recommended Direction

Use the approved "Google Cloud Console workbench" direction:

- Persistent left navigation with grouped sections.
- Sticky topbar for global filters and account actions.
- Dense but calm cards, tables, charts, and operational controls.
- Google-style interaction polish: hover, focus, selected, disabled, empty, loading, and error states.
- DIDA brand colors remain the brand layer. Google blue is used only as a restrained interaction accent where appropriate.

## Project Structure

```text
frontend/
  package.json
  index.html
  vite.config.ts
  tsconfig.json
  src/
    main.tsx
    app/
      App.tsx
      AppShell.tsx
      navigation.ts
      routes.ts
      app-state.tsx
    assets/
      logo-DIDA_positive.svg
      Icon-DIDA_red.svg
    data/
      chart-series.ts
      marketplace.ts
      finance.ts
      order-logs.ts
      bookings.ts
      formatters.ts
    shared/
      components/
        Button.tsx
        Card.tsx
        ChartCard.tsx
        DataTable.tsx
        Drawer.tsx
        FilterControl.tsx
        MetricCard.tsx
        PageHeader.tsx
        StatusPill.tsx
      charts/
        BaseChart.tsx
        chart-theme.ts
      hooks/
        useCsvExport.ts
        useDebouncedValue.ts
      types/
        table.ts
    features/
      overview/
      performance/
      api-performance/
      errors/
      inventory/
      marketplace-configuration/
      marketplace-analytics/
      cost-analysis/
      finance-status/
      order-logs/
      bookings/
      reports/
    styles/
      tokens.css
      globals.css
      layout.css
```

Each feature folder owns its page component and any private child components. Shared components only depend on shared types, styles, and data passed through props.

## Architecture

The app is a client-side prototype with a single React tree.

`AppShell` owns the persistent layout: sidebar, topbar, support action, and active page outlet. Navigation state can be a lightweight route state rather than a full router in the first version, but page registration should be centralized in `routes.ts` so future browser-history routing can reuse the same page map.

Global app state covers:

- Active page.
- Sidebar collapsed state.
- Selected feed.
- Date range label.
- Previous-period toggle.

Feature modules receive only the state they need through props or small hooks. They do not import other feature modules.

## Shared Component Boundaries

- `MetricCard`: KPI title, value, delta, icon, tone, and caption.
- `ChartCard`: title, optional actions, fixed chart area, footer, empty/error states.
- `BaseChart`: ECharts lifecycle, resize handling, common theme, and containment defaults.
- `DataTable`: columns, rows, search/filter hooks, horizontal overflow, row action slot.
- `FilterControl`: Google-style select/search/date/toggle surfaces.
- `Drawer`: order-log and detail inspection panel.
- `StatusPill`: semantic status display for success, warning, danger, neutral, and info.
- `Button`: icon-first actions with consistent height, hover, focus, and disabled states.

Shared components cannot contain DIDA-specific business copy. Business labels and data stay in feature modules or `data/`.

## Feature Modules

### Overview

Migrates the static overview into componentized forecast cards, TTV chart, KPI cards, and insight rail. Existing content and values remain recognizable.

### Performance

Provides KPI strip, global filters, bookings over time chart, feed legend, and feed performance table.

### API Performance

Provides technical impact cards, quality-over-time chart with background bands, error-rate charts, and request volume metrics.

### Errors

Provides 48-hour notice, search/filter controls, TTV loss chart, and error log table. Search filters local mock rows.

### Inventory

Provides mapped properties, available hotels, sold hotels, download actions, and three inventory charts.

### Marketplace Configuration

Provides forecast cards, progress display, feed settings, tolerance slider, segment overrides, and FAQ content.

### Marketplace Analytics

Provides marketplace booking/TTV metrics, effective discount, marketplace cost, win-rate impact, timeline chart, analysis cards, and discount distribution.

### Cost Analysis

Provides filters and cost distribution charts by refundability, lead time, and hotel chain.

### Finance Status

Provides credit limit, available credit, used credit, expiry, account status, utilization progress, settlement calendar, and unsettled bill table.

### Order Logs

Provides order-level table and a detail drawer. The drawer shows price-check and booking event timelines for the selected order.

### Bookings

Provides bookings table and CSV export action. The table must remain horizontally scrollable on narrow widths.

### Reports

Keeps the existing "Soon" reports module content but wraps it in the new page shell and shared card style.

## Data Flow

Mock data lives under `src/data/`.

Feature modules import their own data directly from `data/` during the prototype phase. Derived display values should use formatter helpers rather than inline formatting spread across components.

CSV export uses the current table rows and column definitions. Export can be implemented as a local browser download.

## Chart Strategy

Use ECharts through a thin `BaseChart` wrapper.

Global chart defaults:

- `grid.containLabel: true`.
- Fixed chart container min-height per chart type.
- `resize` on container and window changes.
- Legend layout constrained inside the chart card.
- Axis labels with rotate, interval, hideOverlap, or truncation where needed.
- Tooltip confined to the chart area where possible.
- Empty and error states rendered inside the chart card, not over the layout.

Each feature exposes chart option factories near the page that owns them. The option factories receive data and global filter state, and return plain ECharts options.

## Visual System

The visual system uses DIDA variables as the brand layer:

- Navy, red, sky blue, green, blue, purple, orange, gray.
- White surfaces, light gray borders, subtle shadow, 8px card radius.
- Poppins with Chinese-friendly fallback stack.

Google-style refinements:

- Tighter topbar controls.
- Clear active navigation state.
- Consistent focus rings.
- Subtle hover states.
- Dense table row rhythm.
- Controlled spacing scale.
- No decorative hero, no marketing layout, no ornamental gradients.

## Responsive Behavior

Desktop is the primary target.

Responsive requirements:

- Sidebar collapses to icon mode.
- Topbar wraps or compresses controls without text overlap.
- Main content uses responsive grids with stable min widths.
- Tables use horizontal scroll rather than squeezing columns into unreadable widths.
- Chart cards keep fixed internal chart heights so labels and legends do not push or overlap content.

## Error, Loading, And Empty States

The prototype should include component-level states even with mock data:

- Empty table state.
- Empty chart state.
- Disabled export state when no rows exist.
- Drawer fallback if no order is selected.
- Graceful handling for missing or malformed mock rows.

## Verification Plan

Run:

```powershell
npm install
npm run typecheck
npm run build
```

Then start the Vite dev server and inspect the app in the browser.

Manual QA checklist:

- DIDA logo is visible and not distorted.
- The visual style still reads as the existing DIDA supplier dashboard.
- Sidebar navigation switches all modules.
- Sidebar collapse does not hide the logo awkwardly or break navigation.
- Topbar controls fit without overlap.
- Charts stay inside cards on desktop and mobile widths.
- Chart labels, legends, tooltips, and data marks do not overlap important content.
- Tables are readable on desktop and horizontally scroll on smaller widths.
- Order Logs drawer opens, changes with row selection, and closes cleanly.
- Finance Status progress and status pills are scannable.
- Build output succeeds.

## Out Of Scope For First Version

- Backend API integration.
- Authentication.
- Real date picker implementation.
- Persisted user settings.
- Full routing with browser history.
- Full design-system package extraction.
- Replacing all mock values with live supplier data.
