import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui"
import { ArrowRightIcon, TruckIcon } from "@phosphor-icons/react"
import { Cell, Pie, PieChart } from "recharts"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"

const logisticsChartConfig = {
  delivered: { label: "Delivered", color: "var(--primary)" },
  inTransit: { label: "In transit", color: "var(--chart-2)" },
  exception: { label: "Exception", color: "var(--chart-4)" },
} satisfies ChartConfig

const logisticsData = [
  { name: "delivered", value: 78, fill: "var(--color-delivered)" },
  { name: "inTransit", value: 14, fill: "var(--color-inTransit)" },
  { name: "exception", value: 8, fill: "var(--color-exception)" },
]

export function LogisticsPerformanceCard({
  onViewLogistics,
}: {
  onViewLogistics: () => void
}) {
  return (
    <Card className="h-full max-h-[360px] w-full rounded-3xl py-5 shadow-xs">
      <CardContent className="flex h-full flex-col px-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Delivery performance</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Shipments, transfers, and returns
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewLogistics}
            className="h-7 rounded-lg px-1.5 text-xs text-primary"
          >
            Logistics <ArrowRightIcon className="size-3.5" weight="bold" />
          </Button>
        </div>
        <div className="mt-4 flex flex-1 items-center gap-5">
          <ChartContainer
            config={logisticsChartConfig}
            className="aspect-square h-36 w-36 shrink-0"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel nameKey="name" />}
              />
              <Pie
                data={logisticsData}
                dataKey="value"
                nameKey="name"
                innerRadius={42}
                outerRadius={60}
                strokeWidth={5}
              >
                {logisticsData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-muted-foreground">
                <i className="size-2 rounded-full bg-primary" />
                Delivered
              </span>
              <span className="font-semibold">78%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-muted-foreground">
                <i className="size-2 rounded-full bg-chart-2" />
                In transit
              </span>
              <span className="font-semibold">14</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-muted-foreground">
                <i className="size-2 rounded-full bg-chart-4" />
                Exceptions
              </span>
              <span className="font-semibold">8</span>
            </div>
            <div className="border-t border-border pt-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">2</span> stock
              transfers en route ·{" "}
              <span className="font-medium text-foreground">3</span> returns
              awaiting inspection
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
          <TruckIcon className="size-3.5 text-primary" weight="bold" />
          Average delivery window:{" "}
          <span className="font-medium text-foreground">1.8 days</span>
        </div>
      </CardContent>
    </Card>
  )
}
