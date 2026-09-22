import {
  AuthAccount,
  TokenPair,
  type AuthAccountProps,
  type AuthResult,
  type IAuthRepository,
  type TokenPairProps,
} from "@/domains/auth"
import { authApi } from "../rest/auth.api"
import type { LoginRequest, LoginResponse } from "@/shared/api/generated"

export class AuthRepository implements IAuthRepository {
  async login(credentials: LoginRequest): Promise<TokenPair> {
    const response = await authApi.login(credentials)
    return {
      accessToken: response.accessToken as string,
      accessExpiresAt: response.accessTokenExpiresAt as string,
      refreshExpiresAt: response.refreshTokenExpiresAt as string,
      refreshToken: response.refreshToken as string,
    }
  }

  async resendSetupToken(identifier: string): Promise<void> {
    await authApi.resendSetupToken({ identifier })
  }

  async verifyEmail(payload: {
    identifier: string
    code: string
    type: string
  }): Promise<VerificationResponseDto> {
    return authApi.verifyEmail(payload as CompleteVerificationRequestDto)
  }

  async refreshToken(token: string): Promise<TokenPair> {
    const dto = await authApi.refreshToken({ refreshToken: token })
    return TokenPair.fromJson(dto as TokenPairProps)
  }

  async logout(jti: string): Promise<void> {
    await authApi.logout({ jti })
  }

  async getAuthAccount(): Promise<AuthAccount> {
    const dto = await authApi.getAuthAccount()
    return AuthAccount.fromJson(dto as AuthAccountProps)
  }
}

/** Singleton for use throughout the feature */
export const authRepository = new AuthRepository()
