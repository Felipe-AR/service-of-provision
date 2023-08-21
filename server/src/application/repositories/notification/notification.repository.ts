import { Notification } from '@application/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class NotificationRepository {
  abstract find(id: string): Promise<Notification | null>;
  abstract findAll(): Promise<Notification[]>;
  abstract findAllByUserId(userId: string): Promise<Notification[]>;
  abstract create(notification: Notification): Promise<Notification>;
  abstract save(notification: Notification): Promise<void>;
  abstract deleteByUser(userId: string): Promise<void>;
}
