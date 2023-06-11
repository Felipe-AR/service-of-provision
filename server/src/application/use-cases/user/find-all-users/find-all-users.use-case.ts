import { User } from '@application/domain/user/user.entity';
import { UserRepository } from '@application/repositories/user/user.repository';
import { Injectable } from '@nestjs/common';

interface FindAllUsersUseCaseResponse {
  users: User[];
}

@Injectable()
export class FindAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<FindAllUsersUseCaseResponse> {
    const users = await this.userRepository.findAll();
    return { users };
  }
}
