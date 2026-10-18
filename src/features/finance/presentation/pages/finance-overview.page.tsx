import {
  ModuleOverview,
  type ModuleOverviewConfig,
} from "@/shared/composites/module-overview"

const config: ModuleOverviewConfig = {
  title: "Finance overview",
  description:
    "Cash position, movement, settlements, and receivables across your organization.",
  metrics: [
    {
      label: "Available balance",
      value: "₦2,485,620",
      detail: "Across 3 active accounts",
    },
    {
      label: "Money in",
      value: "₦1,248,500",
      detail: "12.4% above last month",
    },
    { label: "Money out", value: "₦684,300", detail: "4.2% above last month" },
    {
      label: "Pending settlements",
      value: "₦215,000",
      detail: "3 settlements awaiting payout",
    },
  ],
  chartTitle: "Cash movement",
  chartDescription: "Inflow trend for the current month",
  chartLabel: "Inflow",
  chartData: [
    { period: "W1", value: 280 },
    { period: "W2", value: 340 },
    { period: "W3", value: 295 },
    { period: "W4", value: 420 },
  ],
  tableTitle: "Finance activity",
  tableDescription: "Latest settlements, transfers, and collections",
  rows: [
    {
      primary: "Settlement SET-84152",
      secondary: "Atlas Pay · Today",
      value: "₦215,000",
      status: "On track",
    },
    {
      primary: "Customer collection",
      secondary: "Invoice INV-1092 · Today",
      value: "₦82,400",
      status: "Action needed",
    },
  ],
  attention: [
    {
      title: "3 settlements pending",
      description: "Expected payout by tomorrow.",
      status: "Action needed",
    },
    {
      title: "Receivables are current",
      description: "Only two invoices are overdue.",
      status: "On track",
    },
  ],
}
export function FinanceOverviewPage() {
  return <ModuleOverview config={config} />
}
