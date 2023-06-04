import { AddressRepository } from '@application/repositories/address/address.repository';
import { FindAddressUseCase } from '../find-address/find-address.use-case';

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

export class UpdateAddressUseCase {
  constructor(
    private addressRepository: AddressRepository,
    private findAddressUseCase: FindAddressUseCase,
  ) {}

  async execute(
    request: UpdateAddressUseCaseRequest,
  ): Promise<UpdateAddressUseCaseResponse> {
    const { id, ...updatedAddress } = request;

    await Promise.all([
      this.findAddressUseCase.execute({ id }),
      this.addressRepository.update(id, updatedAddress),
    ]);
  }
}
