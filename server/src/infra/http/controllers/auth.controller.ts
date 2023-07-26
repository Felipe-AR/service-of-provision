import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('/login')
  public async loginUser(): Promise<void> {
    return null;
  }
}
