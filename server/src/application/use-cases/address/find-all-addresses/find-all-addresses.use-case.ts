import { Address } from '@application/domain/address/address.entity';
import { AddressRepository } from '@application/repositories/address/address.repository';
import { Injectable } from '@nestjs/common';

interface FindAllAddressesUseCaseResponse {
  addresses: Address[];
}

@Injectable()
export class FindAllAddressesUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(): Promise<FindAllAddressesUseCaseResponse> {
    const addresses = await this.addressRepository.findAll();
    return { addresses };
  }
}
