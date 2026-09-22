import { useState } from "react"
import { AccountUnverifiedError, AuthStep, TokenPair } from "@/domains/auth"
import {
  authFlowUseCase,
  authStore,
  useChangeTemporaryPassword,
  useLogin,
  useResendSetupToken,
  useSetupPassword,
  useVerifyEmail,
  useVerifyMfa,
} from "./index.js"

interface AuthFlowData {
  identifier?: string
  preAuthToken?: string
  setupToken?: string
}

/**
 * The primary orchestration hook for the auth flow.
 * Composes the AuthFlowUseCase with TanStack mutations.
 * All business logic lives in the use case — this hook only wires
 * React state (step, error) to the use case outcomes.
 */
export function useAuthFlow() {
  const [step, setStep] = useState<AuthStep>(AuthStep.IDLE)
  const [error, setError] = useState<Error | null>(null)
  const [authData, setAuthData] = useState<AuthFlowData>({})

  const { mutateAsync: login } = useLogin()
  const { mutateAsync: verifyMfa } = useVerifyMfa()
  const { mutateAsync: changePassword } = useChangeTemporaryPassword()
  const { mutateAsync: setupPassword } = useSetupPassword()
  const { mutateAsync: verifyEmail } = useVerifyEmail()
  const { mutateAsync: resendToken } = useResendSetupToken()

  const { setTokens } = authStore()

  const applyTokens = (tokens: TokenPair) => {
    setTokens(tokens.accessToken, tokens.refreshToken, tokens.accessExpiresAt)
  }

  const submitLogin = async (
    credentials: { identifier: string; password: string },
    fallbackRoute?: string
  ): Promise<string | undefined> => {
    setStep(AuthStep.LOADING)
    setError(null)
    try {
      const result = await login(credentials)

      if (result.type === "success" && result.tokens) applyTokens(result.tokens)
      if (result.type === "requires_2fa")
        setAuthData({ preAuthToken: result.preAuthToken })
      if (result.type === "requires_password_change")
        setAuthData({ identifier: result.identifier })

      const nextStep = authFlowUseCase.handleAuthResult(result)
      setStep(nextStep)
      return authFlowUseCase.getTargetRoute(nextStep, fallbackRoute)
    } catch (err) {
      if (err instanceof AccountUnverifiedError) {
        setAuthData({ identifier: credentials.identifier })
        setStep(AuthStep.REQUIRES_VERIFICATION)
        return authFlowUseCase.getTargetRoute(
          AuthStep.REQUIRES_VERIFICATION,
          fallbackRoute
        )
      }
      setError(err instanceof Error ? err : new Error(String(err)))
      setStep(AuthStep.ERROR)
    }
  }

  const submitMfa = async (
    code: string,
    fallbackRoute?: string
  ): Promise<string | undefined> => {
    if (!authData.preAuthToken) return
    setStep(AuthStep.LOADING)
    setError(null)
    try {
      const tokens = await verifyMfa({
        preAuthToken: authData.preAuthToken,
        code,
      })
      applyTokens(tokens)
      setStep(AuthStep.SUCCESS)
      return authFlowUseCase.getTargetRoute(AuthStep.SUCCESS, fallbackRoute)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
      setStep(AuthStep.ERROR)
    }
  }

  const submitPasswordChange = async (
    payload: { identifier: string; oldPassword: string; newPassword: string },
    fallbackRoute?: string
  ): Promise<string | undefined> => {
    setStep(AuthStep.LOADING)
    setError(null)
    try {
      const result = await changePassword(payload)
      if (result.type === "success" && result.tokens) applyTokens(result.tokens)
      if (result.type === "requires_2fa")
        setAuthData({ preAuthToken: result.preAuthToken })
      const nextStep = authFlowUseCase.handleAuthResult(result)
      setStep(nextStep)
      return authFlowUseCase.getTargetRoute(nextStep, fallbackRoute)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
      setStep(AuthStep.ERROR)
    }
  }

  const submitPasswordSetup = async (
    payload: { setupToken: string; newPassword: string },
    fallbackRoute?: string
  ): Promise<string | undefined> => {
    setStep(AuthStep.LOADING)
    setError(null)
    try {
      const result = await setupPassword(payload)
      if (result.type === "success" && result.tokens) applyTokens(result.tokens)
      const nextStep = authFlowUseCase.handleAuthResult(result)
      setStep(nextStep)
      return authFlowUseCase.getTargetRoute(nextStep, fallbackRoute)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
      setStep(AuthStep.ERROR)
    }
  }

  const submitEmailVerification = async (
    payload: { identifier: string; code: string; type: string },
    fallbackRoute?: string
  ): Promise<string | undefined> => {
    setStep(AuthStep.LOADING)
    setError(null)
    try {
      const response = await verifyEmail(payload)
      if (response.nextAction === "SETUP_PASSWORD" && response.sessionToken) {
        setAuthData({ setupToken: response.sessionToken })
        // Temporarily store the setup token as the access token so the
        // /auth/setup-password endpoint can authenticate the request.
        setTokens(response.sessionToken, "", "")
        setStep(AuthStep.REQUIRES_PASSWORD_SETUP)
        return authFlowUseCase.getTargetRoute(
          AuthStep.REQUIRES_PASSWORD_SETUP,
          fallbackRoute
        )
      }
      setStep(AuthStep.IDLE)
      return fallbackRoute
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
      setStep(AuthStep.ERROR)
    }
  }

  const resendSetupEmail = async (identifier: string): Promise<void> => {
    setError(null)
    try {
      await resendToken(identifier)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
    }
  }

  const initializeSetupFlow = (setupToken: string) => {
    setAuthData({ setupToken })
    setStep(AuthStep.REQUIRES_PASSWORD_SETUP)
  }

  return {
    step,
    error,
    authData,
    setStep,
    submitLogin,
    submitMfa,
    submitPasswordChange,
    submitPasswordSetup,
    submitEmailVerification,
    resendSetupEmail,
    initializeSetupFlow,
  }
}
