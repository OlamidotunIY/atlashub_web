import {
  ModuleOverview,
  type ModuleOverviewConfig,
} from "@/shared/composites/module-overview"

const config: ModuleOverviewConfig = {
  title: "Insights overview",
  description:
    "A cross-business view of performance, trends, and report readiness.",
  metrics: [
    {
      label: "Revenue growth",
      value: "18%",
      detail: "Against the previous month",
    },
    { label: "Gross margin", value: "42.8%", detail: "Above your 40% target" },
    {
      label: "Customer retention",
      value: "76%",
      detail: "Rolling 90-day rate",
    },
    {
      label: "Reports ready",
      value: "12",
      detail: "For this reporting period",
    },
  ],
  chartTitle: "Business growth",
  chartDescription: "Revenue trend across the last four reporting periods",
  chartLabel: "Revenue",
  chartData: [
    { period: "Jul", value: 820 },
    { period: "Aug", value: 960 },
    { period: "Sep", value: 1040 },
    { period: "Oct", value: 1248 },
  ],
  tableTitle: "Report activity",
  tableDescription: "Recent reports and indicators for your business",
  rows: [
    {
      primary: "Monthly performance",
      secondary: "October · Generated today",
      value: "Ready",
      status: "On track",
    },
    {
      primary: "Cash-flow forecast",
      secondary: "Next 90 days · Refresh required",
      value: "Due today",
      status: "Action needed",
    },
  ],
  attention: [
    {
      title: "Forecast needs a refresh",
      description: "Update planned spend to keep the 90-day forecast accurate.",
      status: "Action needed",
    },
    {
      title: "Revenue momentum is positive",
      description: "Growth has increased for four consecutive months.",
      status: "On track",
    },
  ],
}
export function InsightsOverviewPage() {
  return <ModuleOverview config={config} />
}
