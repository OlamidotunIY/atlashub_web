import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui"
import { TrendUpIcon } from "@phosphor-icons/react"
import { Card, CardContent } from "@/shared/ui/card"

export const CASH_FLOW_PERIODS = [
  {
    value: "this-month",
    label: "This month",
    total: "₦1,248,500",
    change: "12.4% from last month",
    bars: [42, 58, 46, 75, 61, 88, 70, 92, 68, 80, 60, 84],
  },
  {
    value: "last-30-days",
    label: "Last 30 days",
    total: "₦1,106,300",
    change: "8.1% from the preceding 30 days",
    bars: [48, 35, 62, 55, 78, 66, 72, 58, 81, 69, 75, 63],
  },
  {
    value: "last-quarter",
    label: "Last 3 months",
    total: "₦3,584,900",
    change: "16.8% from the previous quarter",
    bars: [38, 52, 47, 64, 70, 59, 76, 83, 71, 89, 78, 92],
  },
] as const

export type CashFlowPeriod = (typeof CASH_FLOW_PERIODS)[number]["value"]

interface CashFlowCardProps {
  period: CashFlowPeriod
  onPeriodChange: (period: CashFlowPeriod) => void
}

export function CashFlowCard({ period, onPeriodChange }: CashFlowCardProps) {
  const selectedPeriod =
    CASH_FLOW_PERIODS.find((item) => item.value === period) ??
    CASH_FLOW_PERIODS[0]

  return (
    <Card className="h-full max-h-[360px] rounded-3xl py-5 shadow-xs">
      <CardContent className="flex h-full flex-col px-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Cash flow</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Money in and out
            </p>
          </div>
          <Select
            value={period}
            onValueChange={(value) => onPeriodChange(value as CashFlowPeriod)}
          >
            <SelectTrigger size="sm" className="rounded-xl text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {CASH_FLOW_PERIODS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-2xl font-semibold tracking-tight">
              {selectedPeriod.total}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
              <TrendUpIcon className="size-3.5" weight="bold" />
              {selectedPeriod.change}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <i className="size-2 rounded-full bg-primary" />
              Inflow
            </span>
            <span className="flex items-center gap-1.5">
              <i className="size-2 rounded-full bg-muted-foreground/35" />
              Outflow
            </span>
          </div>
        </div>

        <div className="mt-auto flex h-32 items-end gap-1.5 border-b border-border/70 pt-5">
          {selectedPeriod.bars.map((height, index) => (
            <div key={index} className="flex h-full flex-1 items-end gap-0.5">
              <span
                className="w-1/2 rounded-t-sm bg-primary/85"
                style={{ height: `${height}%` }}
              />
              <span
                className="w-1/2 rounded-t-sm bg-muted-foreground/25"
                style={{ height: `${Math.max(18, height - 24)}%` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
          <span>Start</span>
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Week 3</span>
          <span>Today</span>
        </div>
      </CardContent>
    </Card>
  )
}
