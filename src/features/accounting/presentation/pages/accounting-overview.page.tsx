import {
  ModuleOverview,
  type ModuleOverviewConfig,
} from "@/shared/composites/module-overview"

const config: ModuleOverviewConfig = {
  title: "Accounting overview",
  description:
    "Books, receivables, payables, expenses, and ledger activity for your organization.",
  metrics: [
    { label: "Receivables", value: "₦82,400", detail: "2 overdue invoices" },
    { label: "Payables", value: "₦124,600", detail: "Due within 7 days" },
    { label: "Expenses", value: "₦684,300", detail: "Current month spend" },
    { label: "Book status", value: "Current", detail: "Last reconciled today" },
  ],
  chartTitle: "Net operating position",
  chartDescription: "Monthly operating balance after expenses",
  chartLabel: "Net position",
  chartData: [
    { period: "Jul", value: 210 },
    { period: "Aug", value: 286 },
    { period: "Sep", value: 244 },
    { period: "Oct", value: 316 },
  ],
  tableTitle: "Accounting activity",
  tableDescription: "Invoices, expenses, and journal items that need review",
  rows: [
    {
      primary: "Invoice INV-1092",
      secondary: "Adebola Stores · 14 days overdue",
      value: "₦42,400",
      status: "Action needed",
    },
    {
      primary: "Expense EXP-482",
      secondary: "Cloud infrastructure · Posted",
      value: "₦42,500",
      status: "On track",
    },
  ],
  attention: [
    {
      title: "2 invoices are overdue",
      description: "Follow up on ₦82,400 in outstanding receivables.",
      status: "Action needed",
    },
    {
      title: "Books are up to date",
      description: "No unreconciled ledger entries.",
      status: "On track",
    },
  ],
}
export function AccountingOverviewPage() {
  return <ModuleOverview config={config} />
}
