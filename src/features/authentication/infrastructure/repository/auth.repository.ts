import {
  AuthAccount,
  type IAuthRepository,
  TokenPair,
  type AuthAccountProps,
} from "@/domains/auth"
import type {
  LoginRequest,
  RefreshTokenRequest,
  SwitchOrganizationRequest,
  VerifyEmailRequest,
} from "@/shared/api/generated"
import { authApi } from "../rest/auth.api"

export class AuthRepository implements IAuthRepository {
  async login(credentials: LoginRequest): Promise<TokenPair> {
    const response = await authApi.login(credentials)
    return TokenPair.fromJson({
      accessToken: response.accessToken as string,
      refreshToken: response.refreshToken as string,
      accessExpiresAt: Number(response.accessTokenExpiresAt),
      refreshExpiresAt: Number(response.refreshTokenExpiresAt),
    })
  }

  async verifyEmail(payload: VerifyEmailRequest): Promise<void> {
    await authApi.verifyEmail(payload)
  }

  async resendVerification(email: string): Promise<void> {
    await authApi.resendVerification({ email })
  }

  async refreshToken(req: RefreshTokenRequest): Promise<TokenPair> {
    const dto = await authApi.refreshToken(req)
    return TokenPair.fromJson({
      accessToken: dto.accessToken as string,
      refreshToken: dto.refreshToken as string,
      accessExpiresAt: Number(dto.accessTokenExpiresAt),
      refreshExpiresAt: Number(dto.refreshTokenExpiresAt),
    })
  }

  async switchOrganization(req: SwitchOrganizationRequest): Promise<TokenPair> {
    const response = await authApi.switchOrganization(req)
    return TokenPair.fromJson({
      accessToken: response.accessToken as string,
      refreshToken: response.refreshToken as string,
      accessExpiresAt: Number(response.accessTokenExpiresAt),
      refreshExpiresAt: Number(response.refreshTokenExpiresAt),
    })
  }

  async logout(): Promise<void> {
    await authApi.logout()
  }

  async logoutAll(): Promise<void> {
    await authApi.logoutAll()
  }

  async getMe(): Promise<AuthAccount> {
    const dto = await authApi.getMe()
    return AuthAccount.fromJson(dto as AuthAccountProps)
  }
}

/** Singleton for use throughout the feature */
export const authRepository = new AuthRepository()
