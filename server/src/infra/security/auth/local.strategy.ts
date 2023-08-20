import { Strategy } from 'passport-local';
import { AbstractStrategy, PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthValidateCredentialsUseCase } from '@application/use-cases/auth/auth-validate-credentials/auth-validate-credentials.use-case';

@Injectable()
export class LocalStrategy
  extends PassportStrategy(Strategy)
  implements AbstractStrategy
{
  constructor(
    private authValidateCredentialsUseCase: AuthValidateCredentialsUseCase,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const { user } = await this.authValidateCredentialsUseCase.execute({
      email,
      password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
