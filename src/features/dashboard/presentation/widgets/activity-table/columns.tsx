import { createColumnHelper } from "@tanstack/react-table"
import { Badge } from "@/shared/ui/badge"
import type { DataTableFeatures } from "@/shared/composites/data-table"

type ActivityStatus = "Pending" | "In progress" | "Complete" | "Action needed"

export interface ActivityRow {
  module: string
  event: string
  reference: string
  value: string
  status: ActivityStatus
}

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

export const activityColumns = columnHelper.columns([
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
