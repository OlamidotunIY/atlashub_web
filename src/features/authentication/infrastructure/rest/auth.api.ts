import type { ApiResponse } from "@/shared"
import { getGlobalApiClient } from "@/shared/api"
import type {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  UserProfileResult,
  VerifyEmailRequest,
} from "@/shared/api/generated"

const getApi = () => getGlobalApiClient()

export const authApi = {
  login: (req: LoginRequest): Promise<LoginResponse> =>
    getApi()
      .post<ApiResponse<LoginResponse>>("/api/v1/login", req)
      .then((r) => r.data.data),

  verifyEmail: (req: VerifyEmailRequest): Promise<void> =>
    getApi()
      .post<ApiResponse<void>>("/api/v1/email/verify", req)
      .then(() => undefined),

  resendVerification: (req: { email: string }): Promise<void> =>
    getApi()
      .post<ApiResponse<void>>("/api/v1/email/resend-verification", req)
      .then(() => undefined),

  refreshToken: (req: RefreshTokenRequest): Promise<RefreshTokenResponse> =>
    getApi()
      .post<ApiResponse<RefreshTokenResponse>>("/api/v1/refresh", req)
      .then((r) => r.data.data),

  logout: (req: LogoutRequest): Promise<void> =>
    getApi()
      .post<ApiResponse<void>>("/api/v1/logout", req)
      .then(() => undefined),

  logoutAll: (): Promise<void> =>
    getApi()
      .post<ApiResponse<void>>("/api/v1/logout-all")
      .then(() => undefined),

  getMe: (): Promise<UserProfileResult> =>
    getApi()
      .get<ApiResponse<UserProfileResult>>("/api/v1/me")
      .then((r) => r.data.data),
}
