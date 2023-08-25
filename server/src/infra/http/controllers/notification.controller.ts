import { ClearNotificationsUseCase } from '@application/use-cases/notification/clear-notifications/clear-notifications.use-case';
import { FindAllNotificationsByUserUseCase } from '@application/use-cases/notification/find-all-notifications-by-user/find-all-notifications-by-user.use-case';
import { FindAllNotificationsUseCase } from '@application/use-cases/notification/find-all-notifications/find-all-notifications.use-case';
import { ReadNotificationUseCase } from '@application/use-cases/notification/read-notification/read-notification.use-case';
import { UnreadNotificationUseCase } from '@application/use-cases/notification/unread-notification/unread-notification.use-case';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import {
  NotificationDTO,
  NotificationViewModel,
} from '../view-models/notification-view-model';
import { CreateNotificationForm } from '../forms/create-notification.form';
import { SendNotificationUseCase } from '@application/use-cases/notification/send-notification/send-notification.use-case';
import { Auth } from '@infra/security/auth/decorators/auth.decorator';
import { Role } from '@application/domain';

@Controller('notification')
export class NotificationController {
  constructor(
    private findAllNotificationsUseCase: FindAllNotificationsUseCase,
    private findAllNotificationsByUserUseCase: FindAllNotificationsByUserUseCase,
    private sendNotificationUseCase: SendNotificationUseCase,
    private readNotificationUseCase: ReadNotificationUseCase,
    private unreadNotificationUseCase: UnreadNotificationUseCase,
    private clearNotificationsUseCase: ClearNotificationsUseCase,
  ) {}

  @Get()
  public async findAllNotifications(): Promise<NotificationDTO[]> {
    const { notifications } = await this.findAllNotificationsUseCase.execute();
    return notifications.map(NotificationViewModel.toHTTP);
  }

  @Get('/user')
  @Auth()
  public async findAllNotificationsByUser(
    @Request() req: any,
  ): Promise<NotificationDTO[]> {
    const { notifications } =
      await this.findAllNotificationsByUserUseCase.execute({
        userId: req.user.id,
      });
    return notifications.map(NotificationViewModel.toHTTP);
  }

  @Post()
  @Auth(Role.ADMINISTRATOR)
  public async sendNotification(
    @Body() form: CreateNotificationForm,
  ): Promise<NotificationDTO> {
    const { notification } = await this.sendNotificationUseCase.execute(form);
    return NotificationViewModel.toHTTP(notification);
  }

  @Patch(':id/read')
  @Auth()
  public async readNotification(@Param('id') id: string): Promise<void> {
    await this.readNotificationUseCase.execute({ id });
  }

  @Patch(':id/unread')
  @Auth()
  public async unreadNotification(@Param('id') id: string): Promise<void> {
    await this.unreadNotificationUseCase.execute({ id });
  }

  @Delete('/user')
  @Auth()
  public async clearNotifications(@Request() req: any): Promise<void> {
    await this.clearNotificationsUseCase.execute({ userId: req.user.id });
  }
}
