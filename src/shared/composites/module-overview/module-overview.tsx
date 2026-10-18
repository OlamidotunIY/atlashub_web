import { createColumnHelper } from "@tanstack/react-table"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui"
import { Card, CardContent } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import {
  DataTable,
  type DataTableFeatures,
} from "@/shared/composites/data-table"

export interface ModuleOverviewMetric {
  label: string
  value: string
  detail: string
}
export interface ModuleOverviewRow {
  primary: string
  secondary: string
  value: string
  status: string
}
export interface ModuleOverviewConfig {
  title: string
  description: string
  metrics: ModuleOverviewMetric[]
  chartTitle: string
  chartDescription: string
  chartLabel: string
  chartData: Array<{ period: string; value: number }>
  tableTitle: string
  tableDescription: string
  rows: ModuleOverviewRow[]
  attention: Array<{
    title: string
    description: string
    status: "Action needed" | "On track"
  }>
}

const columnHelper = createColumnHelper<DataTableFeatures, ModuleOverviewRow>()
const overviewColumns = columnHelper.columns([
  columnHelper.accessor("primary", {
    header: "Item",
    enableHiding: false,
    cell: ({ row }) => (
      <div>
        <p className="text-xs font-medium">{row.original.primary}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {row.original.secondary}
        </p>
      </div>
    ),
  }),
  columnHelper.accessor("value", {
    header: () => <div className="text-right">Value</div>,
    cell: ({ getValue }) => (
      <div className="text-right text-xs font-semibold">{getValue()}</div>
    ),
  }),
  columnHelper.accessor("status", {
    header: () => <div className="text-right">Status</div>,
    cell: ({ getValue }) => (
      <div className="text-right">
        <Badge
          variant={getValue() === "Action needed" ? "destructive" : "secondary"}
        >
          {getValue()}
        </Badge>
      </div>
    ),
  }),
])

export function ModuleOverview({ config }: { config: ModuleOverviewConfig }) {
  const chartConfig = {
    value: { label: config.chartLabel, color: "var(--primary)" },
  } satisfies ChartConfig
  return (
    <div className="flex w-full flex-col gap-6 pb-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          {config.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {config.description}
        </p>
      </header>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {config.metrics.map((metric) => (
          <Card
            key={metric.label}
            className="w-full rounded-3xl py-5 shadow-xs"
          >
            <CardContent className="px-5">
              <p className="text-xs font-medium text-muted-foreground">
                {metric.label}
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight">
                {metric.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {metric.detail}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="grid grid-cols-1 gap-6 xl:auto-rows-fr xl:grid-cols-5">
        <Card className="h-full max-h-[380px] w-full rounded-3xl py-5 shadow-xs xl:col-span-3">
          <CardContent className="flex h-full flex-col px-5">
            <div>
              <p className="text-sm font-semibold">{config.chartTitle}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {config.chartDescription}
              </p>
            </div>
            <ChartContainer
              config={chartConfig}
              className="mt-5 aspect-auto h-[240px] w-full flex-1"
            >
              <AreaChart
                accessibilityLayer
                data={config.chartData}
                margin={{ top: 8, right: 4, left: -24, bottom: 0 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="period"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} width={28} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Area
                  dataKey="value"
                  type="natural"
                  fill="var(--color-value)"
                  fillOpacity={0.18}
                  stroke="var(--color-value)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="h-full max-h-[380px] w-full rounded-3xl py-5 shadow-xs xl:col-span-2">
          <CardContent className="px-5">
            <p className="text-sm font-semibold">Needs attention</p>
            <p className="mt-1 text-xs text-muted-foreground">
              The next actions for this module
            </p>
            <ul className="mt-4 divide-y divide-border/70">
              {config.attention.map((item) => (
                <li key={item.title} className="py-3 first:pt-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium">{item.title}</p>
                    <Badge
                      variant={
                        item.status === "Action needed"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
      <section>
        <Card className="w-full rounded-3xl py-5 shadow-xs">
          <CardContent className="px-5">
            <div>
              <p className="text-sm font-semibold">{config.tableTitle}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {config.tableDescription}
              </p>
            </div>
            <DataTable
              columns={overviewColumns}
              data={config.rows}
              searchKey="primary"
              searchPlaceholder="Search"
              enableColumnVisibility={false}
              className="mt-4"
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
