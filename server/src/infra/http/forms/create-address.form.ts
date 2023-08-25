import { IsNotEmpty } from 'class-validator';

export class CreateAddressForm {
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
