import { useMemo } from "react"
import { ArrowRightIcon, WarningCircleIcon } from "@phosphor-icons/react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { DataTable } from "@/shared/composites/data-table"
import {
  inventoryUrgencyColumns,
  type InventoryUrgencyRow,
} from "./columns"

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
