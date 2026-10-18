import {
  ArrowRightIcon,
  CheckCircleIcon,
  PackageIcon,
  ReceiptIcon,
  ShieldCheckIcon,
  TruckIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"

export type BusinessModule =
  "commerce" | "people" | "logistics" | "accounting" | "compliance"

const snapshotItems = [
  {
    module: "commerce",
    label: "Commerce",
    value: "248 orders",
    detail: "18 awaiting fulfilment",
    icon: ReceiptIcon,
    tone: "text-primary",
  },
  {
    module: "people",
    label: "People",
    value: "24 working",
    detail: "Payroll closes in 6 days",
    icon: UsersThreeIcon,
    tone: "text-violet-600",
  },
  {
    module: "logistics",
    label: "Logistics",
    value: "14 in transit",
    detail: "2 stock transfers en route",
    icon: TruckIcon,
    tone: "text-sky-600",
  },
  {
    module: "accounting",
    label: "Accounting",
    value: "₦82,400 due",
    detail: "2 invoices are overdue",
    icon: PackageIcon,
    tone: "text-amber-600",
  },
  {
    module: "compliance",
    label: "Compliance",
    value: "Up to date",
    detail: "No actions required",
    icon: ShieldCheckIcon,
    tone: "text-emerald-600",
  },
] as const

export function BusinessSnapshotCard({
  onModuleSelect,
}: {
  onModuleSelect: (module: BusinessModule) => void
}) {
  return (
    <Card className="h-full max-h-[340px] rounded-3xl py-5 shadow-xs">
      <CardContent className="px-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Business health</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Your teams and operations at a glance
            </p>
          </div>
          <CheckCircleIcon
            className="size-4 shrink-0 text-emerald-600"
            weight="bold"
          />
        </div>
        <ul className="mt-3 divide-y divide-border/70">
          {snapshotItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.module}>
                <Button
                  variant="ghost"
                  onClick={() => onModuleSelect(item.module)}
                  className="h-auto w-full justify-start rounded-xl px-0 py-2 text-left hover:bg-transparent"
                >
                  <span
                    className={`flex size-7 items-center justify-center rounded-lg bg-muted ${item.tone}`}
                  >
                    <Icon className="size-3.5" weight="bold" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium">{item.label}</span>
                      <span className="text-xs font-semibold text-foreground">
                        {item.value}
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate text-xs font-normal text-muted-foreground">
                      {item.detail}
                    </span>
                  </span>
                  <ArrowRightIcon
                    className="size-3.5 text-muted-foreground"
                    weight="bold"
                  />
                </Button>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
