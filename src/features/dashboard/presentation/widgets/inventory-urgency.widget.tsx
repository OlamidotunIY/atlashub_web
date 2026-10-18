import { useMemo } from "react"
import { ArrowRightIcon, WarningCircleIcon } from "@phosphor-icons/react"
import { createColumnHelper } from "@tanstack/react-table"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Card, CardContent } from "@/shared/ui/card"
import {
  DataTable,
  type DataTableFeatures,
} from "@/shared/composites/data-table"

type Urgency = "Out of stock" | "Critical"
interface InventoryUrgencyRow {
  product: string
  sku: string
  outlet: string
  available: number
  reorderLevel: number
  urgency: Urgency
}

const urgencyRows: InventoryUrgencyRow[] = [
  {
    product: "Oat Milk 1L",
    sku: "BEV-OAT-001",
    outlet: "Lekki Outlet",
    available: 0,
    reorderLevel: 12,
    urgency: "Out of stock",
  },
  {
    product: "Classic T-Shirt",
    sku: "APP-TSH-004",
    outlet: "Ikeja Outlet",
    available: 2,
    reorderLevel: 18,
    urgency: "Critical",
  },
  {
    product: "Wireless Earbuds",
    sku: "ELE-AUD-012",
    outlet: "Abuja Central Outlet",
    available: 1,
    reorderLevel: 8,
    urgency: "Critical",
  },
  {
    product: "Organic Rice 5kg",
    sku: "GRC-RIC-007",
    outlet: "Main Warehouse",
    available: 0,
    reorderLevel: 20,
    urgency: "Out of stock",
  },
]

const columnHelper = createColumnHelper<
  DataTableFeatures,
  InventoryUrgencyRow
>()
const inventoryUrgencyColumns = columnHelper.columns([
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

export function InventoryUrgencyCard({
  onViewInventory,
}: {
  onViewInventory: () => void
}) {
  const data = useMemo(() => urgencyRows, [])
  return (
    <Card className="w-full rounded-3xl py-5 shadow-xs">
      <CardContent className="flex min-h-0 flex-col px-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <WarningCircleIcon
              className="mt-0.5 size-4 text-destructive"
              weight="fill"
            />
            <div>
              <p className="text-sm font-semibold">Inventory urgency</p>
              <p className="mt-1 text-xs text-muted-foreground">
                4 products need attention across 3 outlets and 1 warehouse
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewInventory}
            className="h-7 rounded-lg px-1.5 text-xs text-primary"
          >
            Inventory <ArrowRightIcon className="size-3.5" weight="bold" />
          </Button>
        </div>
        <DataTable
          columns={inventoryUrgencyColumns}
          data={data}
          searchKey="product"
          searchPlaceholder="Search inventory"
          enableColumnVisibility={false}
          className="mt-4"
        />
      </CardContent>
    </Card>
  )
}
