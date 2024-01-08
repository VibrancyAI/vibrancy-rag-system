import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "RAG Chat",
      href: "/dashboard/chat",
      icon: "post",
    },
    {
      title: "Prompts",
      href: "/dashboard/posts",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
    {
      title: "Documentation",
      href: "/docs",
      icon: "settings",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
}
