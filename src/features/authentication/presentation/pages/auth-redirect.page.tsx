import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { authStore } from "@/features/authentication"
import { AUTH_WEB_URL, MERCHANT_ROUTES } from "@/constants"
import { SplashScreen } from "@/shared/composites"

interface AuthRedirectPageProps {
  mode: "login" | "register"
}

export function AuthRedirectPage({ mode }: AuthRedirectPageProps) {
  const isHydrated = authStore((state) => state.isHydrated)
  const isAuthenticated = authStore((state) => state.isAuthenticated())

  useEffect(() => {
    if (!isHydrated || isAuthenticated) return

    const returnTo = `${window.location.origin}/#/auth/callback`
    const targetUrl = `${AUTH_WEB_URL}/${mode}?return_to=${encodeURIComponent(returnTo)}`
    window.location.href = targetUrl
  }, [isHydrated, isAuthenticated, mode])

  if (!isHydrated) {
    return <SplashScreen message="Initializing session..." />
  }

  if (isAuthenticated) {
    return <Navigate to={MERCHANT_ROUTES.DASHBOARD} replace />
  }

  return (
    <SplashScreen
      message={`Redirecting to Atlas Auth ${mode === "register" ? "registration" : "sign in"}...`}
    />
  )
}
