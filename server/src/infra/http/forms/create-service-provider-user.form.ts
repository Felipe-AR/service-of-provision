import { IsNotEmpty } from 'class-validator';
import { AddressForm } from './address.form';

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

  address: Omit<AddressForm, 'userId'>;
}
