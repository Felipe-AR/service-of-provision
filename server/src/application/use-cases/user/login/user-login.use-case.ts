import { UserRepository } from '@application/repositories/user/user.repository';
import { Injectable } from '@nestjs/common';

export interface UserLoginUseCaseRequest {
  email: string;
  password: string;
}

export interface UserLoginUseCaseResponse {
  token: string;
}

@Injectable()
export class UserLoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: UserLoginUseCaseRequest,
  ): Promise<UserLoginUseCaseResponse> {
    return null;
  }
}
