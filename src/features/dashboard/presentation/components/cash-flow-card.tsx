import { CaretDownIcon, TrendUpIcon } from "@phosphor-icons/react"
import { Button } from "@/shared/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"

const cashFlowBars = [42, 58, 46, 75, 61, 88, 70, 92, 68, 80, 60, 84]

export function CashFlowCard() {
  return (
    <Card className="rounded-3xl py-5 shadow-xs">
      <CardHeader className="px-5">
        <div>
          <CardTitle className="text-sm font-semibold">Cash flow</CardTitle>
          <CardDescription className="mt-1 text-xs">
            Money in and out this month
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" className="h-8 rounded-xl text-xs">
          This month
          <CaretDownIcon className="size-3" weight="bold" />
        </Button>
      </CardHeader>
      <CardContent className="px-5 pt-6">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-2xl font-semibold tracking-tight">₦1,248,500</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
              <TrendUpIcon className="size-3.5" weight="bold" />
              12.4% from last month
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
        <div className="flex h-36 items-end gap-1.5 border-b border-border/70 pb-0">
          {cashFlowBars.map((height, index) => (
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
          <span>01 Oct</span>
          <span>08 Oct</span>
          <span>15 Oct</span>
          <span>22 Oct</span>
          <span>Today</span>
        </div>
      </CardContent>
    </Card>
  )
}
