import { Notification } from '@application/domain';
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification): RawNotification {
    return {
      id: notification.id,
      userId: notification.userId,
      description: notification.description,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
    };
  }

  static toDomain(rawNotification: RawNotification): Notification {
    return new Notification(
      {
        userId: rawNotification.userId,
        description: rawNotification.description,
        createdAt: rawNotification.createdAt,
        readAt: rawNotification.readAt,
      },
      rawNotification.id,
    );
  }
}
