import {
  ArrowRightIcon,
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"

const activity = [
  {
    name: "Adebola Stores",
    type: "Payment received",
    amount: "+ ₦128,000",
    time: "Today, 10:42",
    incoming: true,
  },
  {
    name: "Cloud infrastructure",
    type: "Subscription payment",
    amount: "− ₦42,500",
    time: "Today, 09:15",
    incoming: false,
  },
  {
    name: "Tunde Ibrahim",
    type: "Transfer received",
    amount: "+ ₦75,000",
    time: "Yesterday",
    incoming: true,
  },
] as const

export function RecentActivityCard({ onViewAll }: { onViewAll: () => void }) {
  return (
    <Card className="rounded-3xl py-5 shadow-xs">
      <CardHeader className="px-5">
        <CardTitle className="text-sm font-semibold">Recent activity</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          className="h-7 rounded-lg px-1.5 text-xs text-primary"
        >
          Transactions <ArrowRightIcon className="size-3.5" weight="bold" />
        </Button>
      </CardHeader>
      <CardContent className="px-5 pt-3">
        <ul className="divide-y divide-border/70">
          {activity.map((item) => {
            const Icon = item.incoming ? ArrowDownLeftIcon : ArrowUpRightIcon
            return (
              <li
                key={`${item.name}-${item.time}`}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <span
                  className={
                    item.incoming
                      ? "flex size-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600"
                      : "flex size-8 items-center justify-center rounded-xl bg-muted text-muted-foreground"
                  }
                >
                  <Icon className="size-4" weight="bold" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium">{item.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.type} · {item.time}
                  </p>
                </div>
                <p
                  className={
                    item.incoming
                      ? "text-xs font-semibold text-emerald-600"
                      : "text-xs font-semibold"
                  }
                >
                  {item.amount}
                </p>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
