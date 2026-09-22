import { MERCHANT_ROUTES } from "@/constants";
import { AuthStep, type AuthResult } from "@/domains/auth";

/**
 * Maps each AuthStep to the route the user should be navigated to.
 * Driven entirely by the backend's response — no hardcoded strings in the hooks.
 */
export const AUTH_STEP_ROUTES: Partial<Record<AuthStep, string>> = {
  [AuthStep.REQUIRES_2FA]:              MERCHANT_ROUTES.TWO_FACTOR_AUTH,
  [AuthStep.REQUIRES_VERIFICATION]:     MERCHANT_ROUTES.VERIFY_EMAIL,
  [AuthStep.REQUIRES_PASSWORD_SETUP]:   MERCHANT_ROUTES.SETUP_PASSWORD,
  [AuthStep.REQUIRES_ORG_SETUP]:        MERCHANT_ROUTES.ONBOARDING_ORGANIZATION,
  [AuthStep.SUCCESS]:                   MERCHANT_ROUTES.DASHBOARD,
};

export class AuthFlowUseCase {
  /**
   * Reads the backend's AuthResult discriminators and maps them to an AuthStep.
   * This is the single source of truth for interpreting backend auth responses.
   *
   * - requiresTwoFactor  → REQUIRES_2FA
   * - requiresPasswordChange → REQUIRES_PASSWORD_SETUP
   * - onboardingStatus === 'NO_ORG' → REQUIRES_ORG_SETUP
   * - otherwise → SUCCESS
   */
  handleAuthResult(result: AuthResult): AuthStep {
    if (result.type === 'requires_2fa') {
      return AuthStep.REQUIRES_2FA;
    }
    if (result.type === 'requires_password_change') {
      return AuthStep.REQUIRES_PASSWORD_SETUP;
    }
    if (result.type === 'success') {
      if (result.onboardingStatus === 'NO_ORG') {
        return AuthStep.REQUIRES_ORG_SETUP;
      }
      return AuthStep.SUCCESS;
    }
    return AuthStep.IDLE;
  }

  /**
   * Resolves the target route for a given auth step.
   * Falls back to the provided fallbackRoute if no mapped route exists.
   */
  getTargetRoute(step: AuthStep, fallbackRoute?: string): string | undefined {
    return AUTH_STEP_ROUTES[step] ?? fallbackRoute;
  }
}

export const authFlowUseCase = new AuthFlowUseCase();

