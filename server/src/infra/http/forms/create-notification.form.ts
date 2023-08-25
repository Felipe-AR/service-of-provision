import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateNotificationForm {
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  description: string;
}
