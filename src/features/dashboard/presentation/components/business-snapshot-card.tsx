import {
  ArrowRightIcon,
  PackageIcon,
  ReceiptIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"

const snapshotItems = [
  {
    label: "Orders this month",
    value: "248",
    detail: "18 awaiting fulfilment",
    progress: 72,
    icon: ReceiptIcon,
    color: "bg-primary",
  },
  {
    label: "Inventory health",
    value: "96%",
    detail: "4 products need restocking",
    progress: 96,
    icon: PackageIcon,
    color: "bg-emerald-500",
  },
  {
    label: "Active customers",
    value: "1,284",
    detail: "86 new this month",
    progress: 64,
    icon: UsersThreeIcon,
    color: "bg-violet-500",
  },
] as const

export function BusinessSnapshotCard({
  onViewOperations,
}: {
  onViewOperations: () => void
}) {
  return (
    <Card className="rounded-3xl py-5 shadow-xs">
      <CardHeader className="px-5">
        <div>
          <CardTitle className="text-sm font-semibold">
            Business snapshot
          </CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Your operational performance this month
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewOperations}
          className="h-7 rounded-lg px-1.5 text-xs text-primary"
        >
          Operations <ArrowRightIcon className="size-3.5" weight="bold" />
        </Button>
      </CardHeader>
      <CardContent className="px-5 pt-3">
        <ul className="divide-y divide-border/70">
          {snapshotItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.label} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <Icon className="size-4" weight="bold" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium">{item.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                  <p className="text-sm font-semibold tracking-tight">
                    {item.value}
                  </p>
                </div>
                <div className="mt-2 ml-11 h-1 overflow-hidden rounded-full bg-muted">
                  <span
                    className={`block h-full rounded-full ${item.color}`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
