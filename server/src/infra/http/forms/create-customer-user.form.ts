import { Gender } from '@application/domain/customer/gender.enum';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { CreateAddressForm } from './create-address.form';
import { Type } from 'class-transformer';

export class CreateCustomerUserForm {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  rg: string;

  @IsNotEmpty()
  cpf: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressForm)
  address: CreateAddressForm;
}
