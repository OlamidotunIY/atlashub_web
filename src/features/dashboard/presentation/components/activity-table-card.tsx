import { ArrowRightIcon } from "@phosphor-icons/react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

const activityRows = [
  {
    module: "Finance",
    event: "Settlement initiated",
    reference: "SET-84152",
    value: "₦215,000",
    status: "Pending",
    tone: "secondary",
  },
  {
    module: "Logistics",
    event: "Shipment arrived at destination hub",
    reference: "ATL-2026-4M8K",
    value: "14 in transit",
    status: "In progress",
    tone: "outline",
  },
  {
    module: "Commerce",
    event: "Order paid and ready to fulfil",
    reference: "ORD-10982",
    value: "₦128,000",
    status: "Complete",
    tone: "secondary",
  },
  {
    module: "People",
    event: "Payroll review closes",
    reference: "October payroll",
    value: "6 days left",
    status: "Action needed",
    tone: "destructive",
  },
] as const

export function ActivityTableCard({ onViewAll }: { onViewAll: () => void }) {
  return (
    <Card className="h-full max-h-[340px] w-full rounded-3xl py-5 shadow-xs">
      <CardContent className="px-5">
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
        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityRows.map((row) => (
                <TableRow key={row.reference}>
                  <TableCell className="py-3 text-xs font-medium">
                    {row.module}
                  </TableCell>
                  <TableCell className="py-3">
                    <p className="text-xs font-medium">{row.event}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {row.value}
                    </p>
                  </TableCell>
                  <TableCell className="py-3 text-xs text-muted-foreground">
                    {row.reference}
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <Badge variant={row.tone}>{row.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
