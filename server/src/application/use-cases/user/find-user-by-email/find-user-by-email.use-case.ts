import { User } from '@application/domain';
import { UserRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';

export interface FindUserByEmailUseCaseRequest {
  email: string;
}

export interface FindUserByEmailUseCaseResponse {
  user: User | null;
}

@Injectable()
export class FindUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: FindUserByEmailUseCaseRequest,
  ): Promise<FindUserByEmailUseCaseResponse> {
    const { email } = request;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return { user: null };
    }

    return { user };
  }
}
