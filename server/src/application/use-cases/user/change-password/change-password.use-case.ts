import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@application/repositories';
import { FindUserUseCase } from '../find-user/find-user.use-case';
import { PasswordEncoderAdapter } from '@application/adapters';

export interface ChangePasswordUseCaseRequest {
  userId: string;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

type ChangePasswordUseCaseResponse = void;

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    private findUserUseCase: FindUserUseCase,
    private userRepository: UserRepository,
    private passwordEncoderAdapter: PasswordEncoderAdapter,
  ) {}

  async execute(
    request: ChangePasswordUseCaseRequest,
  ): Promise<ChangePasswordUseCaseResponse> {
    const { userId, currentPassword, newPassword, newPasswordConfirmation } =
      request;

    const { user } = await this.findUserUseCase.execute({ id: userId });

    const isCurrentPasswordValid =
      await this.passwordEncoderAdapter.checkPassword(
        currentPassword,
        user.password,
      );

    if (!isCurrentPasswordValid || newPassword !== newPasswordConfirmation) {
      throw new BadRequestException('As credenciais estão inválidas.');
    }

    user.password = await this.passwordEncoderAdapter.hashPassword(newPassword);

    await this.userRepository.save(user);
  }
}
