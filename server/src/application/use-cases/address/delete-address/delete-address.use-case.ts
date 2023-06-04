import { AddressRepository } from '@application/repositories/address/address.repository';
import { FindAddressUseCase } from '../find-address/find-address.use-case';

interface DeleteAddressUseCaseRequest {
  id: string;
}

type DeleteAddressUseCaseResponse = void;

export class DeleteAddressUseCase {
  constructor(
    private addressRepository: AddressRepository,
    private findAddressUseCase: FindAddressUseCase,
  ) {}

  async execute(
    request: DeleteAddressUseCaseRequest,
  ): Promise<DeleteAddressUseCaseResponse> {
    const { address } = await this.findAddressUseCase.execute(request);
    await this.addressRepository.delete(address.id);
  }
}
