import { Address } from '@application/domain/address/address.entity';
import { AddressRepository } from '@application/repositories/address/address.repository';
import { Injectable } from '@nestjs/common';

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

@Injectable()
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
