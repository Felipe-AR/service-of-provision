import { AddressRepository } from '@application/repositories/address/address.repository';
import { ObjectNotFoundException } from '@application/exceptions/object-not-found.exception';
import { Address } from '@application/domain/address/address.entity';
import { Injectable } from '@nestjs/common';

interface UpdateAddressUseCaseRequest {
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

type UpdateAddressUseCaseResponse = void;

@Injectable()
export class UpdateAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(
    request: UpdateAddressUseCaseRequest,
  ): Promise<UpdateAddressUseCaseResponse> {
    const { id, ...updatedAddress } = request;

    const address = await this.addressRepository.findById(id);

    if (!address) {
      throw new ObjectNotFoundException('O endereço não foi encontrado.');
    }

    await this.addressRepository.save(
      new Address({ ...updatedAddress }, address.id),
    );
  }
}
