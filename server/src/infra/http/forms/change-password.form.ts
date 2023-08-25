import { IsNotEmpty } from 'class-validator';

export class ChangePasswordForm {
  @IsNotEmpty()
  currentPassword: string;

  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  newPasswordConfirmation: string;
}
