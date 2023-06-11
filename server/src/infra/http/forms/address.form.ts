import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddressForm {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  num: string;

  complement?: string;

  @IsNotEmpty()
  district: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  zipCode: string;
}
