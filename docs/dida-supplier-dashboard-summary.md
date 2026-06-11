# DIDA Supplier Dashboard 组件与模块摘要

## 目标

把 LiteAPI supplier dashboard 的信息架构、组件结构和交互方式整理为一个 DIDA 品牌版前端规范，并提供一个静态网页 demo 用于快速预览。

## 品牌系统

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
}
```

字体使用 Poppins 作为主字体，中文环境参考 Harmony Sans SC。

## App Shell

```html
<aside class="sidebar">品牌、账号、分组导航、折叠按钮</aside>
<header class="topbar">Feed 筛选、上期对比、日期范围、通知、用户</header>
<main class="page">当前模块内容</main>
<button class="support">客服入口</button>
```

布局原则：

- 左侧固定导航，顶部固定工具条。
- 中间内容区使用白色卡片、浅灰边框、8px 圆角。
- 图表和表格保持高信息密度，避免营销式大 Hero。

## 共享组件

```js
MetricCard({ title, value, delta, icon, tone, description })
ChartCard({ title, subtitle, children, footer })
FilterSelect({ label, value, options, icon })
InsightCard({ title, priority, category, body, impact, actions })
DataTable({ columns, rows, actions })
```

## 页面模块

### Overview

```js
[
  "Quarterly forecast",
  "TTV over time",
  "Win Rate",
  "Total Bookings",
  "Avg Booking Value",
  "Room Nights",
  "Pre-Book Error Rate",
  "Booking Error Rate",
  "Key Insights"
]
```

### Performance

```js
[
  "Total Bookings",
  "Total Revenue (TTV)",
  "Avg Booking Value",
  "Room Nights",
  "Win Rate",
  "Bookings Over Time",
  "Win Rate by feed"
]
```

### API Performance

```js
[
  "Technical Errors Impact on TTV",
  "Technical Performance Quality Over Time",
  "Pre-Book Error Rate",
  "Booking Error Rate",
  "Total Pre-Books",
  "Total Bookings"
]
```

### Errors

```js
[
  "48-hour warning banner",
  "Action filter",
  "Error Type filter",
  "Source filter",
  "Lead time filter",
  "Search logs",
  "Estimated TTV loss chart",
  "Error logs table"
]
```

### Inventory

```js
[
  "Avg Mapped Properties",
  "Avg Available Hotels",
  "Hotels Sold",
  "Download Mapped Hotels",
  "Download Available Hotels",
  "Download Sold Hotels",
  "Mapped Properties Over Time",
  "Available Hotels Over Time",
  "Sold Hotels Over Time"
]
```

### Marketplace Configuration

```js
[
  "Quarterly forecasts",
  "Quarter progress",
  "Marketplace settings",
  "Feed list",
  "Price tolerance slider",
  "Segment overrides",
  "FAQ"
]
```

### Marketplace Analytics

```js
[
  "Marketplace Bookings",
  "Marketplace TTV",
  "Avg. Effective Discount",
  "Marketplace cost",
  "Win Rate impact",
  "Performance timeline",
  "Performance analysis",
  "Price tolerance distribution"
]
```

### Cost Analysis

```js
[
  "All chains filter",
  "All lead times filter",
  "All refundability filter",
  "Marketplace TTV and effective discount",
  "By refundable type",
  "By lead time",
  "By hotel chain"
]
```

### Bookings

```js
[
  "Export to CSV",
  "Booking table",
  "ID",
  "Hotel ID",
  "Hotel Name",
  "Feed",
  "Price",
  "Adjustment %",
  "Adj. amount",
  "Check-in",
  "Booking date"
]
```

## 交互规则

```js
const interactions = {
  feedFilter: "按 feed 过滤当前页面指标",
  previousPeriod: "切换当前周期与上一周期对比",
  dateRange: "显示 May 11, 2026 - Jun 10, 2026",
  exportCsv: "导出当前报表或表格",
  navClick: "切换页面模块",
  chartLegend: "显示或隐藏 feed",
  searchLogs: "搜索错误日志",
  settingsSliders: "更新 Marketplace 草稿预算"
};
```

## Demo 说明

`demo/index.html` 是单文件静态 demo，不依赖构建工具。图表使用内置 SVG 生成，适合快速预览视觉结构和模块关系。
