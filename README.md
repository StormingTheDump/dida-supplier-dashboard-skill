# DIDA Supplier Dashboard Skill

This repository contains a reusable Codex skill and a static frontend demo for a DIDA-branded supplier analytics dashboard, including Marketplace finance status and order-log modules.

## Contents

- `skills/dida-supplier-dashboard/SKILL.md` - the merged skill with brand tokens, layout rules, component patterns, page modules, interactions, data shape, and QA checklist.
- `skills/dida-supplier-dashboard/assets/` - DIDA logo assets bundled with the skill.
- `demo/index.html` - a self-contained Chrome-style dashboard demo inspired by the LiteAPI supplier dashboard screenshots.
- `demo/assets/` - logo assets used by the demo.
- `docs/dida-supplier-dashboard-summary.md` - Chinese summary of components, functions, and modules.

## Demo Pages

- Overview
- Performance
- API Performance
- Errors
- Inventory
- Marketplace Configuration
- Marketplace Analytics
- Cost Analysis
- Finance Status
- Order Logs
- Bookings
- Custom Reports placeholder

## Local Preview

Run a static server from the demo folder:

```powershell
cd demo
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173/
```

## Brand Notes

The demo follows the DIDA brand manual:

- Primary navy: `#000947`
- Primary red: `#EA0345`
- Primary sky blue: `#3AB5E6`
- Secondary green, blue, purple, orange, and gray accents
- Poppins as the main English typeface, with Harmony Sans SC style fallback for Chinese contexts

## Verification

The demo was checked locally with:

- HTTP server response: `200`
- Skill unresolved markers: `0`
- Demo page sections: `12`
- Demo chart targets: `22`
- Browser DOM navigation across the main dashboard modules
