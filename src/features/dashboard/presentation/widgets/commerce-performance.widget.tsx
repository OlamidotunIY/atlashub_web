import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui"
import { ArrowRightIcon, TrendUpIcon } from "@phosphor-icons/react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"

const commerceChartConfig = {
  orders: { label: "Orders", color: "var(--primary)" },
  fulfilled: { label: "Fulfilled", color: "var(--chart-2)" },
} satisfies ChartConfig

const commerceData = [
  { week: "W1", orders: 46, fulfilled: 39 },
  { week: "W2", orders: 58, fulfilled: 51 },
  { week: "W3", orders: 71, fulfilled: 64 },
  { week: "W4", orders: 73, fulfilled: 68 },
]

export function CommercePerformanceCard({
  onViewCommerce,
}: {
  onViewCommerce: () => void
}) {
  return (
    <Card className="h-full max-h-[360px] w-full rounded-3xl py-5 shadow-xs">
      <CardContent className="flex h-full flex-col px-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Commerce performance</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Order volume and fulfilment
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewCommerce}
            className="h-7 rounded-lg px-1.5 text-xs text-primary"
          >
            Orders <ArrowRightIcon className="size-3.5" weight="bold" />
          </Button>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div>
            <p className="text-lg font-semibold">248</p>
            <p className="text-xs text-muted-foreground">Orders</p>
          </div>
          <div>
            <p className="text-lg font-semibold">93.5%</p>
            <p className="text-xs text-muted-foreground">Fulfilled</p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-lg font-semibold text-emerald-600">
              <TrendUpIcon className="size-3.5" weight="bold" />
              18%
            </p>
            <p className="text-xs text-muted-foreground">Growth</p>
          </div>
        </div>
        <ChartContainer
          config={commerceChartConfig}
          className="mt-auto aspect-auto h-[170px] w-full flex-1"
        >
          <BarChart
            accessibilityLayer
            data={commerceData}
            margin={{ top: 8, right: 0, left: -24, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} width={28} />
            <ChartTooltip
              cursor={{ fill: "var(--muted)" }}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="orders"
              fill="var(--color-orders)"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="fulfilled"
              fill="var(--color-fulfilled)"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
