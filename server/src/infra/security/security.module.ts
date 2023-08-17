import { Module } from '@nestjs/common';

import { BcryptPasswordEncoderService } from './bcrypt/bcrypt-password-encoder.service';
import { PasswordEncoderAdapter } from '@application/adapters/password-encoder.adapter';
import { SecurityJwtModule } from './security-jwt.module';
import { JwtEncoderService } from './auth/jwt-encoder.service';

@Module({
  imports: [SecurityJwtModule],
  providers: [
    JwtEncoderService,
    {
      provide: PasswordEncoderAdapter,
      useClass: BcryptPasswordEncoderService,
    },
  ],
  exports: [PasswordEncoderAdapter, JwtEncoderService],
})
export class SecurityModule {}
