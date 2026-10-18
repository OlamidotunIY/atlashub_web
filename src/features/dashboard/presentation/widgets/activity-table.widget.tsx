import { useMemo } from "react"
import { ArrowRightIcon } from "@phosphor-icons/react"
import { createColumnHelper } from "@tanstack/react-table"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Card, CardContent } from "@/shared/ui/card"
import {
  DataTable,
  type DataTableFeatures,
} from "@/shared/composites/data-table"

type ActivityStatus = "Pending" | "In progress" | "Complete" | "Action needed"
interface ActivityRow {
  module: string
  event: string
  reference: string
  value: string
  status: ActivityStatus
}

const activityRows: ActivityRow[] = [
  {
    module: "Finance",
    event: "Settlement initiated",
    reference: "SET-84152",
    value: "₦215,000",
    status: "Pending",
  },
  {
    module: "Logistics",
    event: "Shipment arrived at destination hub",
    reference: "ATL-2026-4M8K",
    value: "14 in transit",
    status: "In progress",
  },
  {
    module: "Commerce",
    event: "Order paid and ready to fulfil",
    reference: "ORD-10982",
    value: "₦128,000",
    status: "Complete",
  },
  {
    module: "People",
    event: "Payroll review closes",
    reference: "October payroll",
    value: "6 days left",
    status: "Action needed",
  },
]

const statusVariant: Record<
  ActivityStatus,
  "secondary" | "outline" | "destructive"
> = {
  Pending: "secondary",
  "In progress": "outline",
  Complete: "secondary",
  "Action needed": "destructive",
}
const columnHelper = createColumnHelper<DataTableFeatures, ActivityRow>()
const activityColumns = columnHelper.columns([
  columnHelper.accessor("module", {
    header: "Module",
    enableHiding: false,
    cell: ({ getValue }) => (
      <span className="text-xs font-medium">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("event", {
    header: "Activity",
    enableHiding: false,
    cell: ({ row }) => (
      <div>
        <p className="text-xs font-medium">{row.original.event}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {row.original.value}
        </p>
      </div>
    ),
  }),
  columnHelper.accessor("reference", {
    header: "Reference",
    cell: ({ getValue }) => (
      <span className="text-xs text-muted-foreground">{getValue()}</span>
    ),
  }),
  columnHelper.accessor("status", {
    header: () => <div className="text-right">Status</div>,
    cell: ({ getValue }) => (
      <div className="text-right">
        <Badge variant={statusVariant[getValue()]}>{getValue()}</Badge>
      </div>
    ),
  }),
])

export function ActivityTableCard({ onViewAll }: { onViewAll: () => void }) {
  const data = useMemo(() => activityRows, [])
  return (
    <Card className="h-full max-h-[340px] w-full rounded-3xl py-5 shadow-xs">
      <CardContent className="flex h-full min-h-0 flex-col px-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Business activity</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Recent events across your enabled modules
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAll}
            className="h-7 rounded-lg px-1.5 text-xs text-primary"
          >
            View all <ArrowRightIcon className="size-3.5" weight="bold" />
          </Button>
        </div>
        <DataTable
          columns={activityColumns}
          data={data}
          searchKey="event"
          searchPlaceholder="Search activity"
          enableColumnVisibility={false}
          className="mt-4 min-h-0 flex-1 overflow-hidden"
        />
      </CardContent>
    </Card>
  )
}
