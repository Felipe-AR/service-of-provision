import { NotificationRepository } from '@application/repositories';
import { FindUserUseCase } from '@application/use-cases/user/find-user/find-user.use-case';
import { Injectable } from '@nestjs/common';

export interface ClearNotificationsUseCaseRequest {
  userId: string;
}

type ClearNotificationsUseCaseResponse = void;

@Injectable()
export class ClearNotificationsUseCase {
  constructor(
    private notificationRepository: NotificationRepository,
    private findUserUseCase: FindUserUseCase,
  ) {}

  async execute(
    request: ClearNotificationsUseCaseRequest,
  ): Promise<ClearNotificationsUseCaseResponse> {
    const { userId } = request;
    const { user } = await this.findUserUseCase.execute({ id: userId });
    await this.notificationRepository.deleteByUser(user.id);
  }
}
