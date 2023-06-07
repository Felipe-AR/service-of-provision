import { User } from '@application/domain/user/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class UserRepository {
  abstract find(id: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract create(user: User): Promise<User>;
  abstract save(user: User): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
