import { PasswordEncoderAdapter } from '@application/adapters';
import { User } from '@application/domain';
import { FindUserByEmailUseCase } from '@application/use-cases/user/find-user-by-email/find-user-by-email.use-case';
import { Injectable } from '@nestjs/common';

export interface AuthValidateCredentialsUseCaseRequest {
  email: string;
  password: string;
}

export interface AuthValidateCredentialsUseCaseResponse {
  user: User | null;
}

@Injectable()
export class AuthValidateCredentialsUseCase {
  constructor(
    private findUserByEmailUseCase: FindUserByEmailUseCase,
    private passwordEncoderAdapter: PasswordEncoderAdapter,
  ) {}

  async execute(request: AuthValidateCredentialsUseCaseRequest) {
    const { email, password } = request;
    const { user } = await this.findUserByEmailUseCase.execute({ email });

    if (!user) {
      return null;
    }

    const match = await this.passwordEncoderAdapter.checkPassword(
      password,
      user.password,
    );

    if (!match) {
      return null;
    }

    return { user };
  }
}