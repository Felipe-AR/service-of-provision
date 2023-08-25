import { Gender } from '@application/domain';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateCustomerUserForm {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  phone: string;
}
