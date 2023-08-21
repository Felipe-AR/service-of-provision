import { AddressRepository } from '@application/repositories/address/address.repository';
import { FindAddressUseCase } from '../find-address/find-address.use-case';
import { Injectable } from '@nestjs/common';
import { ObjectNotFoundException } from '@application/exceptions/object-not-found.exception';

interface DeleteAddressUseCaseRequest {
  id: string;
}

type DeleteAddressUseCaseResponse = void;

@Injectable()
export class DeleteAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(
    request: DeleteAddressUseCaseRequest,
  ): Promise<DeleteAddressUseCaseResponse> {
    const { id } = request;
    const address = await this.addressRepository.findById(id);

    if (!address) {
      throw new ObjectNotFoundException('O endereço não foi encontrado.');
    }

    await this.addressRepository.delete(address.id);
  }
}
