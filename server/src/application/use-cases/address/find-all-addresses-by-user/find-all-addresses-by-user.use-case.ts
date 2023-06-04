import { Address } from '@application/domain/address/address.entity';
import { AddressRepository } from '@application/repositories/address/address.repository';
import { Injectable } from '@nestjs/common';

interface FindAllAddressesByUserUseCaseRequest {
  userId: string;
}

interface FindAllAddressesByUserUseCaseResponse {
  addresses: Address[];
}

@Injectable()
export class FindAllAddressesByUserUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(
    request: FindAllAddressesByUserUseCaseRequest,
  ): Promise<FindAllAddressesByUserUseCaseResponse> {
    const { userId } = request;
    const addresses = await this.addressRepository.findAllByUserId(userId);
    return { addresses };
  }
}
