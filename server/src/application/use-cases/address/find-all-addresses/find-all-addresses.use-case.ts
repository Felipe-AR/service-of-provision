import { Address } from '@application/domain/address/address.entity';
import { AddressRepository } from '@application/repositories/address/address.repository';

interface FindAllAddressesUseCaseResponse {
  addresses: Address[];
}

export class FindAllAddressesUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(): Promise<FindAllAddressesUseCaseResponse> {
    const addresses = await this.addressRepository.findAll();
    return { addresses };
  }
}
