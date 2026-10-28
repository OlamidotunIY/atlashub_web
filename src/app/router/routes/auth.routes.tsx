import { MERCHANT_ROUTES } from "@/constants"
import { AuthCallbackPage, AuthRedirectPage } from "@/features/authentication"
import { InvitePage } from "@/features/organization"
import type { RouteObject } from "react-router-dom"

export const authRoutes: RouteObject[] = [
  { path: MERCHANT_ROUTES.LOGIN, element: <AuthRedirectPage mode="login" /> },
  { path: MERCHANT_ROUTES.REGISTRATION, element: <AuthRedirectPage mode="register" /> },
  { path: MERCHANT_ROUTES.AUTH_CALLBACK, element: <AuthCallbackPage /> },
  { path: "/invite/:token", element: <InvitePage /> },
]
