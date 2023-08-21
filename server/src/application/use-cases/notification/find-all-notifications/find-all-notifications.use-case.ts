import { Notification } from '@application/domain';
import { NotificationRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';

export interface FindAllNotificationsUseCaseResponse {
  notifications: Notification[];
}

@Injectable()
export class FindAllNotificationsUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(): Promise<FindAllNotificationsUseCaseResponse> {
    const notifications = await this.notificationRepository.findAll();
    return { notifications };
  }
}
