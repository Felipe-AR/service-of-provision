import { Address } from '@application/domain/address/address.entity';
import { ObjectNotFoundException } from '@application/exceptions/object-not-found.exception';
import { AddressRepository } from '@application/repositories/address/address.repository';
import { Injectable } from '@nestjs/common';

export interface FindAddressUseCaseRequest {
  id: string;
}

export interface FindAddressUseCaseResponse {
  address: Address;
}

@Injectable()
export class FindAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(
    request: FindAddressUseCaseRequest,
  ): Promise<FindAddressUseCaseResponse> {
    const { id } = request;
    const address = await this.addressRepository.findById(id);

    if (!address) {
      throw new ObjectNotFoundException('O endereço não foi encontrado.');
    }

    return { address };
  }
}
