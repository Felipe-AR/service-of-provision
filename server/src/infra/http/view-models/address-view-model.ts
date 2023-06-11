import { Address } from '@application/domain/address/address.entity';

export interface AddressDTO {
  id: string;
  userId: string;
  street: string;
  num: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}

export class AddressViewModel {
  static toHTTP(address: Address): AddressDTO {
    return {
      id: address.id,
      userId: address.userId,
      street: address.street,
      num: address.num,
      complement: address.complement,
      district: address.district,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    };
  }
}
