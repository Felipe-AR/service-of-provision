import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdateServiceForm {
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
