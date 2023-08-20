import { Module } from '@nestjs/common';

import { BcryptPasswordEncoderService } from './auth/bcrypt/bcrypt-password-encoder.service';
import { PasswordEncoderAdapter } from '@application/adapters/password-encoder.adapter';
import { SecurityJwtModule } from './security-jwt.module';
import { JwtEncoderService } from './auth/signature/jwt-encoder.service';
import { PassportModule } from '@nestjs/passport';
import { FindUserByEmailUseCase } from '@application/use-cases/user/find-user-by-email/find-user-by-email.use-case';
import { DatabaseModule } from '@infra/database/database.module';
import { LocalStrategy } from './auth/local.strategy';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthSignInUseCase } from '@application/use-cases/auth/auth-sign-in/auth-sign-in.use-case';
import { AuthValidateCredentialsUseCase } from '@application/use-cases/auth/auth-validate-credentials/auth-validate-credentials.use-case';
import { TokenEncoderAdapter } from '@application/adapters';
import { RolesGuard } from './auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    SecurityJwtModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    DatabaseModule,
  ],
  providers: [
    {
      provide: PasswordEncoderAdapter,
      useClass: BcryptPasswordEncoderService,
    },
    {
      provide: TokenEncoderAdapter,
      useClass: JwtEncoderService,
    },
    AuthSignInUseCase,
    AuthValidateCredentialsUseCase,
    FindUserByEmailUseCase,
    RolesGuard,
    LocalAuthGuard,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [
    PasswordEncoderAdapter,
    AuthSignInUseCase,
    TokenEncoderAdapter,
    RolesGuard,
  ],
})
export class SecurityModule {}
