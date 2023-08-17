import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

const options: JwtModuleOptions = {
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: +process.env.JWT_EXPIRATION_TIME },
};

@Module({
  imports: [JwtModule.register(options)],
  exports: [JwtModule],
})
export class SecurityJwtModule {}
