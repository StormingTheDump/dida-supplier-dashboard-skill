import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

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

type AppState = {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  selectedFeed: string;
  setSelectedFeed: (feed: string) => void;
  showPreviousPeriod: boolean;
  setShowPreviousPeriod: (value: boolean) => void;
  dateRangeLabel: string;
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<PageId>("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState("All feeds");
  const [showPreviousPeriod, setShowPreviousPeriod] = useState(false);

  const value = useMemo<AppState>(
    () => ({
      activePage,
      setActivePage,
      collapsed,
      setCollapsed,
      selectedFeed,
      setSelectedFeed,
      showPreviousPeriod,
      setShowPreviousPeriod,
      dateRangeLabel: "May 11, 2026 - Jun 10, 2026"
    }),
    [activePage, collapsed, selectedFeed, showPreviousPeriod]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return context;
}

