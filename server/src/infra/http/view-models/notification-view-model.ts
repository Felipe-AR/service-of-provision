import { Notification } from '@application/domain';

export interface NotificationDTO {
  id: string;
  userId: string;
  description: string;
  createdAt: Date;
  readAt: Date | null;
}

export class NotificationViewModel {
  static toHTTP(notification: Notification): NotificationDTO {
    return {
      id: notification.id,
      userId: notification.userId,
      description: notification.description,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
    };
  }
}
