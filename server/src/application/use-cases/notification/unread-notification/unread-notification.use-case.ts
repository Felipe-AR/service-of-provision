import { ObjectNotFoundException } from '@application/exceptions';
import { NotificationRepository } from '@application/repositories/notification';
import { Injectable } from '@nestjs/common';

export interface UnreadNotificationUseCaseRequest {
  id: string;
}

type UnreadNotificationUseCaseResponse = void;

@Injectable()
export class UnreadNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: UnreadNotificationUseCaseRequest,
  ): Promise<UnreadNotificationUseCaseResponse> {
    const { id } = request;
    const notification = await this.notificationRepository.find(id);

    if (!notification) {
      throw new ObjectNotFoundException('A notificação não foi encontrada.');
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
