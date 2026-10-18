import {
  ModuleOverview,
  type ModuleOverviewConfig,
} from "@/shared/composites/module-overview"

const config: ModuleOverviewConfig = {
  title: "Logistics overview",
  description:
    "Shipment delivery, warehouses, stock transfers, returns, and shipping incentives.",
  metrics: [
    {
      label: "In transit",
      value: "14",
      detail: "Across internal fleet and 3PL",
    },
    {
      label: "Delivery success",
      value: "78%",
      detail: "Current delivery performance",
    },
    {
      label: "Stock transfers",
      value: "2",
      detail: "Moving between locations",
    },
    { label: "Returns", value: "3", detail: "Awaiting warehouse inspection" },
  ],
  chartTitle: "Delivery throughput",
  chartDescription: "Delivered shipments by week",
  chartLabel: "Delivered",
  chartData: [
    { period: "W1", value: 34 },
    { period: "W2", value: 49 },
    { period: "W3", value: 62 },
    { period: "W4", value: 78 },
  ],
  tableTitle: "Movement queue",
  tableDescription:
    "Shipments, transfers, and returns currently needing review",
  rows: [
    {
      primary: "ATL-2026-4M8K",
      secondary: "Inter-state shipment · At destination hub",
      value: "In transit",
      status: "On track",
    },
    {
      primary: "Transfer STR-1008",
      secondary: "Main Warehouse → Lekki Outlet",
      value: "Awaiting receipt",
      status: "Action needed",
    },
  ],
  attention: [
    {
      title: "3 returns await inspection",
      description: "Confirm received goods before refund release.",
      status: "Action needed",
    },
    {
      title: "Delivery window is healthy",
      description: "Average delivery is 1.8 days.",
      status: "On track",
    },
  ],
}
export function LogisticsOverviewPage() {
  return <ModuleOverview config={config} />
}
