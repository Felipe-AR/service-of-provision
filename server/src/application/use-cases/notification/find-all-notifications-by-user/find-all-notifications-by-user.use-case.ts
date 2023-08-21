import { Notification } from '@application/domain';
import { NotificationRepository } from '@application/repositories';
import { FindUserUseCase } from '@application/use-cases/user/find-user/find-user.use-case';
import { Injectable } from '@nestjs/common';

export interface FindAllNotificationsByUserUseCaseRequest {
  userId: string;
}

export interface FindAllNotificationsByUserUseCaseResponse {
  notifications: Notification[];
}

@Injectable()
export class FindAllNotificationsByUserUseCase {
  constructor(
    private notificationRepository: NotificationRepository,
    private findUserUseCase: FindUserUseCase,
  ) {}

  async execute(
    request: FindAllNotificationsByUserUseCaseRequest,
  ): Promise<FindAllNotificationsByUserUseCaseResponse> {
    const { userId } = request;

    const { user } = await this.findUserUseCase.execute({ id: userId });

    const notifications = await this.notificationRepository.findAllByUserId(
      user.id,
    );

    return { notifications };
  }
}
