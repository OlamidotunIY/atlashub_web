import {
  ModuleOverview,
  type ModuleOverviewConfig,
} from "@/shared/composites/module-overview"

const config: ModuleOverviewConfig = {
  title: "Compliance overview",
  description:
    "Verification status, required reviews, and organization compliance history.",
  metrics: [
    {
      label: "Organization status",
      value: "Verified",
      detail: "All primary checks complete",
    },
    { label: "Reviews pending", value: "0", detail: "No action required" },
    {
      label: "Documents current",
      value: "8",
      detail: "No documents expiring soon",
    },
    { label: "Risk level", value: "Low", detail: "Last assessed 12 Oct" },
  ],
  chartTitle: "Compliance readiness",
  chartDescription: "Completed checks across the current review period",
  chartLabel: "Checks completed",
  chartData: [
    { period: "W1", value: 5 },
    { period: "W2", value: 6 },
    { period: "W3", value: 8 },
    { period: "W4", value: 8 },
  ],
  tableTitle: "Compliance activity",
  tableDescription: "Recent reviews, documents, and verification events",
  rows: [
    {
      primary: "Business verification",
      secondary: "Organization profile · Reviewed 12 Oct",
      value: "Verified",
      status: "On track",
    },
    {
      primary: "Tax document",
      secondary: "Next review due in 90 days",
      value: "Current",
      status: "On track",
    },
  ],
  attention: [
    {
      title: "No compliance actions required",
      description: "Your organization is clear to continue operating.",
      status: "On track",
    },
    {
      title: "Next scheduled review",
      description: "The next routine review is due in 90 days.",
      status: "On track",
    },
  ],
}
export function ComplianceOverviewPage() {
  return <ModuleOverview config={config} />
}
