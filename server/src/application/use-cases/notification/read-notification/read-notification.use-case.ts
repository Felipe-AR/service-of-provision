import { ObjectNotFoundException } from '@application/exceptions';
import { NotificationRepository } from '@application/repositories/notification';
import { Injectable } from '@nestjs/common';

export interface ReadNotificationUseCaseRequest {
  id: string;
}

type ReadNotificationUseCaseResponse = void;

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: ReadNotificationUseCaseRequest,
  ): Promise<ReadNotificationUseCaseResponse> {
    const { id } = request;
    const notification = await this.notificationRepository.find(id);

    if (!notification) {
      throw new ObjectNotFoundException('Notification was not found.');
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
