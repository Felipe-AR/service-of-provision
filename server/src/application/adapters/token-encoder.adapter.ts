import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class TokenEncoderAdapter {
  abstract encode(payload: any): Promise<string>;
  abstract decode(token: string): string | Record<string, any>;
}
