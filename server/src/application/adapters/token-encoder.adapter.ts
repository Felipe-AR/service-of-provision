import { Injectable } from '@nestjs/common';

export interface UserPayload {
  sub: number;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export abstract class TokenEncoderAdapter {
  abstract encoded();
  abstract decode();
}
