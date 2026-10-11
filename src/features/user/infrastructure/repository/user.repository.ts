import { type IUserRepository, User } from "@/domains/user"
import { userApi } from "../rest/user.api"

export class UserRepository implements IUserRepository {
  async getUserById(_id: string): Promise<User | null> {
    return null;
  }

  async createUser(user: User): Promise<User> {
    await userApi.createUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: '',
      country: user.country,
      businessName: '',
      registrationType: 'SOLE_PROPRIETORSHIP',
      industry: 'PHYSICAL_GOODS',
    })
    return user
  }
}

export const userRepository = new UserRepository()
