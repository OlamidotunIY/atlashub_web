import type { ApiResponse } from "@/shared"
import { getGlobalApiClient } from "@/shared/api"
import type {
  LoginRequest,
  LoginWebResponse,
  RefreshTokenRequest,
  RefreshTokenWebResponse,
  SwitchOrganizationRequest,
  UserProfileResponse,
  VerifyEmailRequest,
} from "@/shared/api/generated"

const getApi = () => getGlobalApiClient()

export const authApi = {
  login: (req: LoginRequest): Promise<LoginWebResponse> =>
    getApi()
      .post<ApiResponse<LoginWebResponse>>("/api/v1/login", req)
      .then((r) => r.data.data),

  verifyEmail: (req: VerifyEmailRequest): Promise<void> =>
    getApi()
      .post<ApiResponse<void>>("/api/v1/email/verify", req)
      .then(() => undefined),

  resendVerification: (req: { email: string }): Promise<void> =>
    getApi()
      .post<ApiResponse<void>>("/api/v1/email/resend-verification", req)
      .then(() => undefined),

  refreshToken: (req: RefreshTokenRequest): Promise<RefreshTokenWebResponse> =>
    getApi()
      .post<ApiResponse<RefreshTokenWebResponse>>("/api/v1/refresh", req)
      .then((r) => r.data.data),

  switchOrganization: (req: SwitchOrganizationRequest): Promise<RefreshTokenWebResponse> =>
    getApi()
      .post<ApiResponse<RefreshTokenWebResponse>>('/api/v1/organizations/switch', req)
      .then((r) => r.data.data),

  logout: (): Promise<void> =>
    getApi()
      .post<ApiResponse<void>>("/api/v1/logout")
      .then(() => undefined),

  logoutAll: (): Promise<void> =>
    getApi()
      .post<ApiResponse<void>>("/api/v1/logout-all")
      .then(() => undefined),

  getMe: (): Promise<UserProfileResponse> =>
    getApi()
      .get<ApiResponse<UserProfileResponse>>("/api/v1/me")
      .then((r) => r.data.data),
}
