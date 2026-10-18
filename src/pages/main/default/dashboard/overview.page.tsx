import { useNavigate } from "react-router-dom"
import { DashboardOverview } from "@/features/dashboard"
import { MERCHANT_ROUTES } from "@/constants"

export function OverviewPage() {
  const navigate = useNavigate()
  const moduleRoutes = {
    commerce: MERCHANT_ROUTES.COMMERCE,
    people: MERCHANT_ROUTES.HR,
    logistics: MERCHANT_ROUTES.LOGISTICS,
    accounting: MERCHANT_ROUTES.ACCOUNTING,
    compliance: MERCHANT_ROUTES.COMPLIANCE,
  } as const

  return (
    <DashboardOverview
      onCreateTransaction={() => navigate(MERCHANT_ROUTES.FINANCE_TRANSACTIONS)}
      onViewTransactions={() => navigate(MERCHANT_ROUTES.FINANCE_TRANSACTIONS)}
      onViewApprovals={() => navigate(MERCHANT_ROUTES.APPROVALS)}
      onModuleSelect={(module) => navigate(moduleRoutes[module])}
    />
  )
}
