import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenEncoderAdapter } from '@application/adapters/token-encoder.adapter';

@Injectable()
export class JwtEncoderService implements TokenEncoderAdapter {
  constructor(private jwtService: JwtService) {}

  async encode(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  decode(token: string): string | Record<string, any> {
    return this.jwtService.decode(token);
  }
}
