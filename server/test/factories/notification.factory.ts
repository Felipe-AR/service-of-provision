import { Notification } from '@application/domain/notification/notification.entity';
import { NotificationProperties } from '@application/domain/notification/notification.entity';

export function makeNotification(override?: NotificationProperties) {
  return new Notification({
    userId: 'fake-user-id',
    description: 'Lorem ipsum dolor sit amet, consectetur',
    ...override,
  });
}
