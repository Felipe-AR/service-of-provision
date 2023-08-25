import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@infra/security/auth/guards/local-auth.guard';
import { JwtAuthGuard } from '@infra/security/auth/guards/jwt-auth.guard';
import { AuthSignInUseCase } from '@application/use-cases/auth/auth-sign-in/auth-sign-in.use-case';
import { Auth } from '@infra/security/auth/decorators/auth.decorator';
import { Role } from '@application/domain';

@Controller('auth')
export class AuthController {
  constructor(private authSignInUseCase: AuthSignInUseCase) {}

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  public async signIn(@Request() request: any) {
    return this.authSignInUseCase.execute({ user: request.user });
  }

  @Get('/check-connection')
  @Auth()
  public async checkConnection(@Request() request: any) {
    return request.user;
  }
}
