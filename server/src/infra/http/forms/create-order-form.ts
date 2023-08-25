import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';

export class CreateOrderForm {
  @IsUUID()
  serviceProviderId: string;

  @IsUUID()
  selectedAddressId: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  selectedServices: string[];
}
