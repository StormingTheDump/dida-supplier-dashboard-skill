# DIDA Supplier Dashboard 组件与模块摘要

## 目标

将 LiteAPI supplier dashboard 截图中的信息架构、布局组件和交互模式，整理为一个 DIDA 品牌版的前端 skill，并提供一个单文件静态 demo 用于快速预览。

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
  --bg: #f7f8fb;
  --surface: #ffffff;
  --line: #dfe5ef;
  --text: #000947;
}
```

字体使用 Poppins 作为主字体，中文环境建议回退到 Harmony Sans SC、Microsoft YaHei 或系统无衬线字体。整体视觉为 Chrome 风格的 SaaS 仪表盘：白底、浅边框、轻阴影、紧凑控件、高信息密度。

## App Shell

```html
<div class="app-shell">
  <aside class="sidebar">Logo、账号、分组导航、收起按钮</aside>
  <main class="main">
    <header class="topbar">Feed 筛选、上期对比、日期范围、通知、用户入口</header>
    <section class="page">当前模块内容</section>
  </main>
  <button class="support-fab">客服入口</button>
</div>
```

布局规则：

- 左侧固定导航，宽度约 248-260px。
- 顶部工具栏固定，高度约 64-68px。
- 主内容区最大宽度约 1360px，页面间距保持 24px。
- 卡片统一使用 1px 浅边框、8px 圆角、轻微阴影。
- 图表和表格以运营扫描效率为优先，不使用营销式大 Hero。

## 导航结构

```js
const navSections = [
  { title: "BUSINESS", items: ["Overview", "Performance", "Custom Reports"] },
  { title: "INTEGRATION", items: ["API Performance", "Errors", "Inventory"] },
  {
    title: "MARKETPLACE",
    items: ["Configuration", "Analytics", "Cost analysis", "Finance Status", "Order Logs", "Bookings"]
  }
];
```

Marketplace 下新增：

- `Finance Status`：额度、授信到期、账单和结算风险。
- `Order Logs`：按订单号查看验价和下单日志。

## 共享组件

```js
MetricCard({ title, value, delta, icon, tone, description });
ChartCard({ title, subtitle, children, footer });
FilterSelect({ label, value, options, icon });
InsightCard({ title, priority, category, body, impact, actions });
DataTable({ columns, rows, actions });
StatusPill({ label, tone });
ProgressBar({ value, max, tone });
```

组件规则：

- KPI 数字使用 `tabular-nums`，便于纵向比较。
- 操作按钮使用图标加文字，导出、搜索、查看日志等命令保持清晰。
- 表格行高紧凑但保留足够点击区。
- 静态 demo 可用 SVG 模拟图表；React 版本建议使用 Recharts。

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

主区域使用预测卡片、折线图和小型指标卡，右侧为洞察建议栏。

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

包含链路、提前期、退款类型筛选；核心图表为按 feed 堆叠的 bookings over time。

### API Performance

```js
[
  "Technical Errors Impact on TTV",
  "Technical Performance Quality Over Time",
  "Pre-Book Error Rate",
  "Booking Error Rate",
  "Total Pre-Books",
  "Total Bookings",
  "Pre-Book Error Rate Over Time",
  "Booking Error Rate Over Time"
]
```

技术质量图使用背景质量带：Great、Good、Fair、Degraded。

### Errors

```js
const errorFilters = ["Action", "Error Type", "Source", "Supplier Message", "Lead time", "Search in logs"];
const errorColumns = ["Date", "Source", "Action", "Error Type", "Supplier Message", "Errors", "Lead time", "Hotel ID", "Rate Code", "Actions"];
```

页面包含 48 小时限制提示、筛选行、TTV loss 图表、错误日志表和查看详情入口。

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

适合监控 mapped hotels、available hotels 和 sold hotels 的变化。

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

用于配置 feed、预算、price tolerance 和分段 override。

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

用实线展示基础表现，用虚线展示 marketplace incremental performance。

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

用于分析 marketplace 成本、有效折扣和不同维度下的成本分布。

### Finance Status

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

该模块用于展示客户额度状况、额度使用率、额度到期日期、未结账单、未出账 booking exposure、账期提醒和风险阈值。建议使用进度条表达额度占用，并用 warning/danger pill 标记临近到期或逾期状态。

### Order Logs

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

该模块排版参考 Bookings：左侧是订单级别密集表格，主键为订单号；右侧或展开区展示 timestamped logs。每行同时展示验价状态和下单状态，便于定位价格变化、无房、供应商 pending、确认成功等流程节点。

### Bookings

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

用于展示订单列表，支持 CSV 导出。小屏下表格允许横向滚动。

## 交互规则

```js
const interactions = {
  feedFilter: "按 feed 过滤当前页面指标",
  previousPeriod: "切换当前周期与上一周期对比",
  dateRange: "显示 May 11, 2026 - Jun 10, 2026",
  exportCsv: "导出当前报表或表格",
  navClick: "切换页面模块并保持 shell 状态",
  chartLegend: "显示或隐藏某个 feed",
  searchLogs: "搜索错误日志或订单日志",
  settingsSliders: "更新 Marketplace 预算和 tolerance 草稿",
  financeStatus: "查看额度、到期日和未结账单",
  orderLogs: "按订单号查看验价与下单日志"
};
```

静态 demo 中，导航和表格渲染是真交互；筛选、导出、搜索可作为视觉和结构占位。

## Demo 说明

```text
demo/index.html
```

这是一个无需构建工具的单文件静态 demo。图表使用内置 SVG 生成，适合快速预览布局、品牌色和模块关系。若迁移到工程化前端，可将页面拆分为 Shell、Nav、Topbar、MetricCard、ChartCard、DataTable、FinanceStatusPage、OrderLogsPage 等组件。

## 视觉 QA 清单

```text
[ ] DIDA logo 清晰且不变形。
[ ] 主色匹配 #000947、#EA0345、#3AB5E6。
[ ] Marketplace 导航包含 Finance Status 和 Order Logs。
[ ] Finance Status 的额度、到期、账单表格信息层级清晰。
[ ] Order Logs 的订单号、验价状态、下单状态和 trace 信息可快速扫描。
[ ] 表格在桌面宽度可读，小屏允许横向滚动。
[ ] 图表坐标、图例、标签没有被裁切。
[ ] 页面没有文字重叠或溢出卡片。
```
