import type { User } from "../entities/user.entity";


export interface IUserRepository {
  getUserById(id: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  // updateUser(id: string, user: Partial<User>): Promise<User>;
}