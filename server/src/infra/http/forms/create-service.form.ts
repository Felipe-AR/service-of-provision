import { IsNotEmpty, IsUUID, IsString, IsNumber } from 'class-validator';

export class CreateServiceForm {
  @IsNotEmpty()
  @IsUUID()
  serviceProviderId: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
