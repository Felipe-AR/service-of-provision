import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenEncoderAdapter } from '@application/adapters/token-encoder.adapter';

@Injectable()
export class JwtEncoderService implements TokenEncoderAdapter {
  constructor(private jwtService: JwtService) {}

  encoded() {
    const payload = {
      sub: '198312983712983',
      email: 'felipe251894@gmail.com',
    };

    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  decode() {
    throw new Error('Method not implemented.');
  }
}
