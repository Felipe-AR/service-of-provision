import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { CreateAddressForm } from './create-address.form';
import { Type } from 'class-transformer';

export class CreateServiceProviderUserForm {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  coreBusinessId: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  phone: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressForm)
  address: CreateAddressForm;
}
