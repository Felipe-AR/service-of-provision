import { Gender } from '@application/domain/customer/gender.enum';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateAddressForm } from './create-address.form';

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

  address: CreateAddressForm;
}
