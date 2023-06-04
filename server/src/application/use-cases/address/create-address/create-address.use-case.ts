import { Address } from '@application/domain/address/address.entity';
import { AddressRepository } from '@application/repositories/address/address.repository';

export interface CreateAddressUseCaseRequest {
  userId: string;
  street: string;
  num: string;
  district: string;
  complement?: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface CreateAddressUseCaseResponse {
  address: Address;
}

export class CreateAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(
    request: CreateAddressUseCaseRequest,
  ): Promise<CreateAddressUseCaseResponse> {
    const address = new Address(request);
    const createdAddress = await this.addressRepository.create(address);
    return { address: createdAddress };
  }
}
