import type { ApiResponse } from "@/shared"
import { getGlobalApiClient } from "@/shared/api"
import type { LoginRequest, LoginResponse, LogoutRequest, RefreshTokenRequest, RefreshTokenResponse, UserProfileResult, VerifyEmailRequest, VerifyEmailResponse } from "@/shared/api/generated"

// --- API client ---

const getApi = () => getGlobalApiClient()

export const authApi = {
  login: (req: LoginRequest): Promise<LoginResponse> =>
    getApi()
      .post<ApiResponse<LoginResponse>>("/login", req)
      .then((r) => r.data.data),

  verifyEmail: (
    req: VerifyEmailRequest
  ): Promise<VerifyEmailResponse> =>
    getApi()
      .post<ApiResponse<VerifyEmailResponse>>("/verify-email", req)
      .then((r) => r.data.data),

  refreshToken: (req: RefreshTokenRequest): Promise<RefreshTokenResponse> =>
    getApi()
      .post<ApiResponse<RefreshTokenResponse>>("/auth/refresh", req)
      .then((r) => r.data.data),

  logout: (req: LogoutRequest): Promise<void> =>
    getApi()
      .post<ApiResponse<void>>("/auth/logout", req)
      .then(() => undefined),

  getAuthAccount: (): Promise<UserProfileResult> =>
    getApi()
      .get<ApiResponse<UserProfileResult>>("/me")
      .then((r) => r.data.data),
}
