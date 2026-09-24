import type { ApiResponse } from "@/shared"
import { getGlobalApiClient } from "@/shared/api"
import type { RegisterRequest, RegisterResponse } from "@/shared/api/generated"

const getApi = () => getGlobalApiClient()

export const userApi = {
  createUser: (req: RegisterRequest): Promise<RegisterResponse> =>
    getApi()
      .post<ApiResponse<RegisterResponse>>("/users", req)
      .then((r) => r.data.data),

  // listUsers: (params: ListUsersRequestDto): Promise<UserDto[]> =>
  //   getApi()
  //     .get<ApiResponse<UserDto[]>>("/users", { params })
  //     .then((r) => r.data.data),
}
