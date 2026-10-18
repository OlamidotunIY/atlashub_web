import {
  ModuleOverview,
  type ModuleOverviewConfig,
} from "@/shared/composites/module-overview"

const config: ModuleOverviewConfig = {
  title: "Commerce overview",
  description:
    "Orders, customers, fulfilment, and inventory performance across your outlets.",
  metrics: [
    { label: "Orders", value: "248", detail: "18 awaiting fulfilment" },
    { label: "Sales", value: "₦1,248,500", detail: "18% growth this month" },
    { label: "Customers", value: "1,284", detail: "86 new this month" },
    {
      label: "Fulfilment rate",
      value: "93.5%",
      detail: "Above your 90% target",
    },
  ],
  chartTitle: "Order volume",
  chartDescription: "Completed order trend for the current month",
  chartLabel: "Orders",
  chartData: [
    { period: "W1", value: 46 },
    { period: "W2", value: 58 },
    { period: "W3", value: 71 },
    { period: "W4", value: 73 },
  ],
  tableTitle: "Fulfilment queue",
  tableDescription: "Orders requiring action from your team",
  rows: [
    {
      primary: "ORD-10982",
      secondary: "Lekki Outlet · Paid",
      value: "₦128,000",
      status: "Action needed",
    },
    {
      primary: "ORD-10979",
      secondary: "Ikeja Outlet · Ready to dispatch",
      value: "₦86,500",
      status: "On track",
    },
  ],
  attention: [
    {
      title: "18 orders await fulfilment",
      description: "Assign picking and delivery before the next cut-off.",
      status: "Action needed",
    },
    {
      title: "Customer growth is healthy",
      description: "86 new customers joined this month.",
      status: "On track",
    },
  ],
}
export function CommerceOverviewPage() {
  return <ModuleOverview config={config} />
}
