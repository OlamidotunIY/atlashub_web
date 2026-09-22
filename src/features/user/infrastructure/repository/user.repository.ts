import { type Country, type IUserRepository, User } from "@/domains/user"
import type { UserDto } from "@/shared/api/generated"
import { userApi } from "../rest/user.api"

export class UserRepository implements IUserRepository {
  private mapDtoToUser(dto: UserDto): User {
    return new User(
      String(dto.id),
      dto.email ?? "",
      dto.firstName ?? "",
      dto.lastName ?? "",
      dto.phone ?? "",
      dto.country as Country,
      dto.createdAt ?? "",
      dto.createdAt ?? ""
    )
  }

  async getUserById(id: string): Promise<User | null> {
    const dto = await userApi.getUserById(id)
    return this.mapDtoToUser(dto)
  }

  async createUser(user: User): Promise<User> {
    await userApi.createUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phoneNumber,
      country: user.country,
    })
    // Re-fetch the created user — API only returns the ID
    return user
  }
}

export const userRepository = new UserRepository()
