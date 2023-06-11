import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistsException extends HttpException {
  constructor() {
    super('Already exists an user with this e-mail.', HttpStatus.BAD_REQUEST);
  }
}
