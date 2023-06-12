import { User } from '@application/domain/user/user.entity';
import { UserRepository } from '@application/repositories/user/user.repository';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async find(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<User> {
    const userWithEmail = this.users.find((user) => user.email === email);

    if (!userWithEmail) {
      return null;
    }

    return userWithEmail;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async save(user: User): Promise<void> {
    const index = this.users.map((user) => user.id).indexOf(user.id);

    const userAlreadyCreated = await this.find(user.id);

    this.users[index] = new User(
      {
        ...userAlreadyCreated['properties'],
        ...user['properties'],
      },
      user.id,
    );
  }

  async delete(id: string): Promise<void> {
    const index = this.users.map((user) => user.id).indexOf(id);
    this.users.splice(index, 1);
  }
}
