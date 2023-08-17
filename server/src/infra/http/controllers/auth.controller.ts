import { JwtEncoderService } from '@infra/security/auth/jwt-encoder.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private jwtEncoderService: JwtEncoderService) {}

  @Post('/login')
  public async loginUser() {
    return this.jwtEncoderService.encoded();
  }
}
