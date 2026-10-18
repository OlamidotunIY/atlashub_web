import {
  ModuleOverview,
  type ModuleOverviewConfig,
} from "@/shared/composites/module-overview"

const config: ModuleOverviewConfig = {
  title: "People overview",
  description:
    "Workforce, attendance, leave, and payroll health for your organization.",
  metrics: [
    { label: "Employees", value: "38", detail: "3 new this month" },
    { label: "Attendance", value: "91%", detail: "34 checked in today" },
    { label: "On leave", value: "3", detail: "2 requests awaiting review" },
    { label: "Next payroll", value: "₦642,000", detail: "Closes in 6 days" },
  ],
  chartTitle: "Attendance trend",
  chartDescription: "Daily employee attendance this month",
  chartLabel: "Attendance",
  chartData: [
    { period: "W1", value: 88 },
    { period: "W2", value: 92 },
    { period: "W3", value: 90 },
    { period: "W4", value: 91 },
  ],
  tableTitle: "People activity",
  tableDescription: "Current workforce tasks and approvals",
  rows: [
    {
      primary: "October payroll",
      secondary: "38 employees included",
      value: "₦642,000",
      status: "Action needed",
    },
    {
      primary: "Leave requests",
      secondary: "2 manager reviews pending",
      value: "2 requests",
      status: "Action needed",
    },
  ],
  attention: [
    {
      title: "Payroll review closes in 6 days",
      description: "Review adjustments before the payroll cut-off.",
      status: "Action needed",
    },
    {
      title: "Attendance is on target",
      description: "Above your 90% attendance target.",
      status: "On track",
    },
  ],
}
export function PeopleOverviewPage() {
  return <ModuleOverview config={config} />
}
