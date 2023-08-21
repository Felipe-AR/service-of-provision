import { Notification } from '@application/domain';
import { NotificationRepository } from '@application/repositories/notification';
import { FindUserUseCase } from '@application/use-cases/user/find-user/find-user.use-case';
import { Injectable } from '@nestjs/common';

export interface SendNotificationUseCaseRequest {
  userId: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface SendNotificationUseCaseResponse {
  notification: Notification;
}

@Injectable()
export class SendNotificationUseCase {
  constructor(
    private notificationRepository: NotificationRepository,
    private findUserUseCase: FindUserUseCase,
  ) {}

  async execute(
    request: SendNotificationUseCaseRequest,
  ): Promise<SendNotificationUseCaseResponse> {
    const { user } = await this.findUserUseCase.execute({ id: request.userId });

    const notification = new Notification({
      ...request,
      userId: user.id,
    });

    const createdNotification = await this.notificationRepository.create(
      notification,
    );

    return { notification: createdNotification };
  }
}
