import {
  Bell,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Headphones,
  User
} from "lucide-react";
import didaIcon from "@/assets/Icon-DIDA_red.svg";
import didaLogo from "@/assets/logo-DIDA_positive.svg";
import { useAppState } from "@/app/app-state";
import { feedOptions, navSections } from "@/app/navigation";
import { routes } from "@/app/routes";

export function AppShell() {
  const {
    activePage,
    setActivePage,
    collapsed,
    setCollapsed,
    selectedFeed,
    setSelectedFeed,
    showPreviousPeriod,
    setShowPreviousPeriod,
    dateRangeLabel
  } = useAppState();
  const ActivePage = routes[activePage];

  return (
    <div className={`app${collapsed ? " collapsed" : ""}`}>
      <aside className="sidebar" aria-label="DIDA navigation">
        <div className="brand">
          <img src={collapsed ? didaIcon : didaLogo} alt="DIDA" />
        </div>
        <div className="account">
          <img src={didaIcon} alt="" />
          <span>Dida</span>
        </div>
        <nav className="nav">
          {navSections.map((section) => (
            <div className="nav-section" key={section.title}>
              <p className="section-title">{section.title}</p>
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    type="button"
                    className={`nav-item${activePage === item.id ? " active" : ""}`}
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="icon" />
                    <span className="nav-label">{item.label}</span>
                    {item.badge ? (
                      <span className={`pill${item.badgeTone === "active" ? " active-pill" : ""}`}>{item.badge}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
        <button
          type="button"
          className="button icon-only collapse"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="icon" /> : <ChevronLeft className="icon" />}
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <label className="filter-control">
              <Filter className="icon" />
              <select value={selectedFeed} onChange={(event) => setSelectedFeed(event.target.value)} aria-label="Feed filter">
                {feedOptions.map((feed) => (
                  <option key={feed} value={feed}>
                    {feed}
                  </option>
                ))}
              </select>
              <ChevronDown className="icon" />
            </label>
          </div>
          <div className="topbar-right">
            <span className="toggle-label">Show previous period</span>
            <button
              type="button"
              className={`toggle${showPreviousPeriod ? " on" : ""}`}
              aria-pressed={showPreviousPeriod}
              aria-label="Toggle previous period"
              onClick={() => setShowPreviousPeriod(!showPreviousPeriod)}
            />
            <button type="button" className="filter-control">
              <Calendar className="icon" />
              {dateRangeLabel}
            </button>
            <button type="button" className="icon-button" aria-label="Notifications">
              <Bell className="icon" />
              <span className="badge">1</span>
            </button>
            <button type="button" className="icon-button" aria-label="Account">
              <User className="icon" />
            </button>
          </div>
        </header>

        <section className="page">
          <ActivePage selectedFeed={selectedFeed} showPreviousPeriod={showPreviousPeriod} />
        </section>
      </main>

      <button type="button" className="support" aria-label="Support">
        <Headphones className="icon" />
      </button>
    </div>
  );
}

