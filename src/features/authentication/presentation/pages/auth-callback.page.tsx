import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { authStore } from "@/features/authentication"
import { AUTH_WEB_URL, MERCHANT_ROUTES } from "@/constants"
import { SplashScreen } from "@/shared/composites"
import { Button } from "@/shared/ui"

export function AuthCallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    // 1. Check router searchParams (query in hash or browser URL)
    let token = searchParams.get("token")
    let refreshToken = searchParams.get("refresh_token")

    // 2. Check window.location.search (outer URL query before hash)
    if (!token && typeof window !== "undefined") {
      const windowParams = new URLSearchParams(window.location.search)
      token = windowParams.get("token")
      if (!refreshToken) {
        refreshToken = windowParams.get("refresh_token")
      }
    }

    // 3. Check hash query fragment if present
    if (!token && typeof window !== "undefined" && window.location.hash.includes("?")) {
      const hashQuery = window.location.hash.split("?")[1]
      const hashParams = new URLSearchParams(hashQuery)
      token = hashParams.get("token")
      if (!refreshToken) {
        refreshToken = hashParams.get("refresh_token")
      }
    }

    if (!token) {
      setErrorMessage("No authentication token was received from Atlas Auth.")
      return
    }

    try {
      authStore.getState().setTokens(token, refreshToken || "")
      // Navigate to dashboard. AuthGuard will evaluate active organizations and redirect to onboarding if zero orgs.
      navigate(MERCHANT_ROUTES.DASHBOARD, { replace: true })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to initialize authentication session"
      setErrorMessage(message)
    }
  }, [navigate, searchParams])

  if (errorMessage) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md space-y-4 rounded-xl border border-destructive/30 bg-destructive/5 p-6">
          <h2 className="text-lg font-semibold text-destructive">Authentication Handoff Failed</h2>
          <p className="text-sm text-muted-foreground">{errorMessage}</p>
          <Button
            onClick={() => {
              const returnTo = `${window.location.origin}/#/auth/callback`
              window.location.href = `${AUTH_WEB_URL}/login?return_to=${encodeURIComponent(returnTo)}`
            }}
          >
            Return to Atlas Auth
          </Button>
        </div>
      </div>
    )
  }

  return <SplashScreen message="Finalizing authentication..." />
}
