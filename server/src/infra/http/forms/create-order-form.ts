import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateOrderForm {
  @IsUUID()
  customerId: string;

  @IsUUID()
  serviceProviderId: string;

  @IsUUID()
  selectedAddressId: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  selectedServices: string[];
}
