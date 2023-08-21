import { Notification } from '@application/domain';
import { NotificationRepository } from '@application/repositories';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async find(id: string): Promise<Notification> {
    const notification = await this.prismaService.notification.findFirst({
      where: { id },
    });

    return PrismaNotificationMapper.toDomain(notification);
  }

  async findAll(): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany();
    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async findAllByUserId(userId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: { userId },
    });
    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async create(notification: Notification): Promise<Notification> {
    const rawNotification = PrismaNotificationMapper.toPrisma(notification);
    const createdNotification = await this.prismaService.notification.create({
      data: { ...rawNotification },
    });
    return PrismaNotificationMapper.toDomain(createdNotification);
  }

  async save(notification: Notification): Promise<void> {
    const rawNotification = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.update({
      where: { id: rawNotification.id },
      data: { ...rawNotification },
    });
  }

  async deleteByUser(userId: string): Promise<void> {
    await this.prismaService.notification.deleteMany({
      where: { userId },
    });
  }
}
