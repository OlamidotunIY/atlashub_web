import type { ApiResponse } from "@/shared"
import { getGlobalApiClient } from "@/shared/api"
import type { RegisterRequest } from "@/shared/api/generated"

const getApi = () => getGlobalApiClient()

export const userApi = {
  createUser: (req: RegisterRequest): Promise<void> =>
    getApi()
      .post<ApiResponse<void>>("/api/v1/register", req)
      .then((r) => r.data.data),

  // listUsers: (params: ListUsersRequestDto): Promise<UserDto[]> =>
  //   getApi()
  //     .get<ApiResponse<UserDto[]>>("/users", { params })
  //     .then((r) => r.data.data),
}
