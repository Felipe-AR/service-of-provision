import { User } from '@application/domain/user/user.entity';
import { ObjectNotFoundException } from '@application/exceptions/object-not-found.exception';
import { UserRepository } from '@application/repositories/user/user.repository';
import { Injectable } from '@nestjs/common';

export interface FindUserUseCaseRequest {
  id: string;
}

export interface FindUserUseCaseResponse {
  user: User;
}

@Injectable()
export class FindUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: FindUserUseCaseRequest,
  ): Promise<FindUserUseCaseResponse> {
    const { id } = request;
    const user = await this.userRepository.find(id);

    if (!user) {
      throw new ObjectNotFoundException('User was not found.');
    }

    return { user };
  }
}
