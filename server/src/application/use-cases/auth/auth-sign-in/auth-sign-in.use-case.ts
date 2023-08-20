import { TokenEncoderAdapter } from '@application/adapters';
import { Role, User } from '@application/domain';
import { Injectable } from '@nestjs/common';

export interface AuthSignInUseCaseRequest {
  user: User;
}

export interface AuthSignInUseCaseResponse {
  accessToken: string;
}

@Injectable()
export class AuthSignInUseCase {
  constructor(private tokenEncoderAdapter: TokenEncoderAdapter) {}

  async execute(
    request: AuthSignInUseCaseRequest,
  ): Promise<AuthSignInUseCaseResponse> {
    const { user } = request;

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.tokenEncoderAdapter.encode(payload);

    return { accessToken };
  }
}
