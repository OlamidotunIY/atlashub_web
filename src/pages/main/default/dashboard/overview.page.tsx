import { useNavigate } from "react-router-dom"
import { DashboardOverview } from "@/features/dashboard"
import { MERCHANT_ROUTES } from "@/constants"

export function OverviewPage() {
  const navigate = useNavigate()

  return (
    <DashboardOverview
      onCreateTransaction={() => navigate(MERCHANT_ROUTES.FINANCE_TRANSACTIONS)}
      onViewTransactions={() => navigate(MERCHANT_ROUTES.FINANCE_TRANSACTIONS)}
      onViewApprovals={() => navigate(MERCHANT_ROUTES.APPROVALS)}
      onViewOperations={() => navigate(MERCHANT_ROUTES.OPERATIONS)}
    />
  )
}
