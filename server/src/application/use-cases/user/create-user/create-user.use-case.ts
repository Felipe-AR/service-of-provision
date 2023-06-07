import { Address } from '@application/domain/address/address.entity';
import { Role } from '@application/domain/user/role.enum';
import { User } from '@application/domain/user/user.entity';
import { UserRepository } from '@application/repositories/user/user.repository';
import { Injectable } from '@nestjs/common';

interface CreateUserUseCaseRequest {
  email: string;
  password: string;
  phone: string;
  role: Role;
  addresses?: Address[];
  createdAt?: Date;
  updatedAt?: Date;
}
interface CreateUserUseCaseResponse {
  user: User;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: CreateUserUseCaseRequest,
  ): Promise<CreateUserUseCaseResponse> {
    const user = new User(request);
    const createdUser = await this.userRepository.create(user);
    return { user: createdUser };
  }
}
