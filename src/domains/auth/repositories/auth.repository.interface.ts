import type { RefreshTokenRequest, SwitchEnvironmentRequest, SwitchOrganizationRequest, VerifyEmailRequest } from "@/shared/api/generated"
import type { TokenPair } from "../entities/token-pair.entity.js"
import type { AuthAccount } from "../entities/auth-account.entity.js"

export interface IAuthRepository {
  login(credentials: { email: string; password: string; deviceFingerprint: string }): Promise<TokenPair>
  verifyEmail(payload: VerifyEmailRequest): Promise<void>
  resendVerification(email: string): Promise<void>
  refreshToken(req: RefreshTokenRequest): Promise<TokenPair>
  switchOrganization(req: SwitchOrganizationRequest): Promise<TokenPair>
  switchEnvironment(req: SwitchEnvironmentRequest): Promise<TokenPair>
  logout(): Promise<void>
  logoutAll(): Promise<void>
  getMe(): Promise<AuthAccount>
}
