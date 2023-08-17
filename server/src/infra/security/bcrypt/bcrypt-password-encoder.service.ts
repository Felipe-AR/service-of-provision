import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { PasswordEncoderAdapter } from '@application/adapters/password-encoder.adapter';

@Injectable()
export class BcryptPasswordEncoderService implements PasswordEncoderAdapter {
  async hashPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(+process.env.BCRYPT_SALT_ROUNDS);
    const hashedPassword: string = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async checkPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
