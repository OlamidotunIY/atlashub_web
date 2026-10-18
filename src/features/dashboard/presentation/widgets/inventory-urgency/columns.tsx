import { createColumnHelper } from "@tanstack/react-table"
import { Badge } from "@/shared/ui/badge"
import type { DataTableFeatures } from "@/shared/composites/data-table"

type Urgency = "Out of stock" | "Critical"

export interface InventoryUrgencyRow {
  product: string
  sku: string
  outlet: string
  available: number
  reorderLevel: number
  urgency: Urgency
}

const columnHelper = createColumnHelper<
  DataTableFeatures,
  InventoryUrgencyRow
>()

export const inventoryUrgencyColumns = columnHelper.columns([
  columnHelper.accessor("product", {
    header: "Product",
    enableHiding: false,
    cell: ({ row }) => (
      <div>
        <p className="text-xs font-medium">{row.original.product}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {row.original.sku}
        </p>
      </div>
    ),
  }),
  columnHelper.accessor("outlet", {
    header: "Outlet / warehouse",
    cell: ({ getValue }) => <span className="text-xs">{getValue()}</span>,
  }),
  columnHelper.accessor("available", {
    header: () => <div className="text-right">Available</div>,
    cell: ({ getValue }) => (
      <div className="text-right text-xs font-semibold text-destructive">
        {getValue()}
      </div>
    ),
  }),
  columnHelper.accessor("reorderLevel", {
    header: () => <div className="text-right">Reorder at</div>,
    cell: ({ getValue }) => (
      <div className="text-right text-xs text-muted-foreground">
        {getValue()}
      </div>
    ),
  }),
  columnHelper.accessor("urgency", {
    header: "Urgency",
    cell: ({ getValue }) => <Badge variant="destructive">{getValue()}</Badge>,
  }),
])
