import {
  Activity,
  BarChart3,
  CalendarDays,
  FileText,
  Home,
  ListTree,
  Percent,
  ScrollText,
  SquareCheckBig,
  Store,
  TrendingUp,
  WalletCards
} from "lucide-react";
import type { ComponentType } from "react";
import type { PageId } from "@/app/app-state";

export type NavItem = {
  id: PageId;
  label: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string;
  badgeTone?: "active" | "soon";
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const navSections: NavSection[] = [
  {
    title: "BUSINESS",
    items: [
      { id: "overview", label: "Overview", icon: Home },
      { id: "performance", label: "Performance", icon: BarChart3 },
      { id: "reports", label: "Custom Reports", icon: FileText, badge: "Soon", badgeTone: "soon" }
    ]
  },
  {
    title: "INTEGRATION",
    items: [
      { id: "api", label: "API Performance", icon: Activity },
      { id: "errors", label: "Errors", icon: ScrollText },
      { id: "inventory", label: "Inventory", icon: SquareCheckBig }
    ]
  },
  {
    title: "MARKETPLACE",
    items: [
      { id: "configuration", label: "Configuration", icon: Store, badge: "Active", badgeTone: "active" },
      { id: "analytics", label: "Analytics", icon: TrendingUp },
      { id: "cost", label: "Cost analysis", icon: Percent },
      { id: "finance", label: "Finance Status", icon: WalletCards },
      { id: "order-logs", label: "Order Logs", icon: ListTree },
      { id: "bookings", label: "Bookings", icon: CalendarDays }
    ]
  }
];

export const feedOptions = [
  "All feeds",
  "HUB_Dida_B2B",
  "HUB_Dida_CUG",
  "HUB_Dida_Snap feeds",
  "HUB_Dida_NonTravel_BankOnly",
  "HUB_Dida_CUG_Only_AGODA_Client"
];

