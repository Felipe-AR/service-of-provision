import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateServiceProviderUserForm {
  @IsUUID()
  coreBusinessId: string;

  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  phone: string;
}
