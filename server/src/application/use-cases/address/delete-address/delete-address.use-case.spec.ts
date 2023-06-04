import { InMemoryAddressRepository } from '@test/repositories/in-memory-address.repository';
import { DeleteAddressUseCase } from './delete-address.use-case';
import { CreateAddressUseCase } from '../create-address/create-address.use-case';
import { FindAddressUseCase } from '../find-address/find-address.use-case';
import { makeAddress } from '@test/factories';
import { FindAllAddressesUseCase } from '../find-all-addresses/find-all-addresses.use-case';

describe('Delete Address', () => {
  it('should be able to delete an address', async () => {
    const genericAddress = makeAddress();

    const repository = new InMemoryAddressRepository();
    const createAddressUseCase = new CreateAddressUseCase(repository);
    const findAddressUseCase = new FindAddressUseCase(repository);
    const findAllAddressesUseCase = new FindAllAddressesUseCase(repository);
    const deleteAddressUseCaseDelete = new DeleteAddressUseCase(
      repository,
      findAddressUseCase,
    );

    const { address: createdAddress } = await createAddressUseCase.execute({
      street: genericAddress.street,
      city: genericAddress.city,
      district: genericAddress.district,
      num: genericAddress.num,
      state: genericAddress.state,
      userId: genericAddress.userId,
      zipCode: genericAddress.zipCode,
      complement: genericAddress.complement,
    });

    const { addresses: addressesBeforeDelete } =
      await findAllAddressesUseCase.execute();

    expect(addressesBeforeDelete).toHaveLength(1);

    await deleteAddressUseCaseDelete.execute({ id: createdAddress.id });

    const { addresses: addressesAfterDelete } =
      await findAllAddressesUseCase.execute();

    expect(addressesBeforeDelete).toHaveLength(0);
  });
});
