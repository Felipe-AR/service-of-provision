import { IsNotEmpty } from 'class-validator';
import { CreateAddressForm } from './create-address.form';

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

  address: CreateAddressForm;
}
