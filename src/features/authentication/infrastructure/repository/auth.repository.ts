import {
  AuthAccount,
  type IAuthRepository,
  TokenPair,
  type AuthAccountProps,
  type TokenPairProps,
} from "@/domains/auth"
import type {
  LoginRequest,
  LogoutRequest,
  RefreshTokenRequest,
  VerifyEmailRequest,
} from "@/shared/api/generated"
import { authApi } from "../rest/auth.api"

export class AuthRepository implements IAuthRepository {
  async login(credentials: LoginRequest): Promise<TokenPair> {
    const response = await authApi.login(credentials)
    return TokenPair.fromJson({
      accessToken: response.data?.accessToken as string,
      accessExpiresAt: response.data?.accessTokenExpiresAt as string,
      refreshExpiresAt: response.data?.refreshTokenExpiresAt as string,
      refreshToken: response.data?.refreshToken as string,
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
    return TokenPair.fromJson(dto as TokenPairProps)
  }

  async logout(req: LogoutRequest): Promise<void> {
    await authApi.logout(req)
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
