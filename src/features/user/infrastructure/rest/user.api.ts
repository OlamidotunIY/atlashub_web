import type { ApiResponse } from "@/shared"
import { getGlobalApiClient } from "@/shared/api"
import type {
  CreateUserRequest,
  CreateUserResult,
  ListUsersRequestDto,
  UserDto,
} from "@/shared/api/generated"

const getApi = () => getGlobalApiClient()

export const userApi = {
  createUser: (req: CreateUserRequest): Promise<CreateUserResult> =>
    getApi()
      .post<ApiResponse<CreateUserResult>>("/users", req)
      .then((r) => r.data.data),

  listUsers: (params: ListUsersRequestDto): Promise<UserDto[]> =>
    getApi()
      .get<ApiResponse<UserDto[]>>("/users", { params })
      .then((r) => r.data.data),

  getUserById: (userId: string): Promise<UserDto> =>
    getApi()
      .get<ApiResponse<UserDto>>(`/users/${userId}`)
      .then((r) => r.data.data),
}
