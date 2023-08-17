import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class PasswordEncoderAdapter {
  abstract hashPassword(password: string): Promise<string>;

  abstract checkPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
