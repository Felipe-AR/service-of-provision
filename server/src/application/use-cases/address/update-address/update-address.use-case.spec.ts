import { InMemoryAddressRepository } from '@test/repositories/in-memory-address.repository';
import { UpdateAddressUseCase } from './update-address.use-case';
import { CreateAddressUseCase } from '../create-address/create-address.use-case';
import { FindAddressUseCase } from '../find-address/find-address.use-case';
import { makeAddress } from '@test/factories';
import { FindAllAddressesUseCase } from '../find-all-addresses/find-all-addresses.use-case';

describe('Update Address', () => {
  it('should be able to update address', async () => {
    const genericAddress = makeAddress();
    const repository = new InMemoryAddressRepository();
    const findAddressUseCase = new FindAddressUseCase(repository);
    const createAddressUseCase = new CreateAddressUseCase(repository);
    const findAllAddressesUseCase = new FindAllAddressesUseCase(repository);

    const updateAddressUseCase = new UpdateAddressUseCase(
      repository,
      findAddressUseCase,
    );

    const { address: createdAddress } = await createAddressUseCase.execute({
      userId: genericAddress.id,
      street: genericAddress.street,
      num: genericAddress.num,
      complement: genericAddress.complement,
      district: genericAddress.district,
      city: genericAddress.city,
      state: genericAddress.state,
      zipCode: genericAddress.zipCode,
    });

    const updateRequest = {
      id: createdAddress.id,
      userId: createdAddress.id,
      street: createdAddress.street,
      num: '201',
      complement: createdAddress.complement,
      district: createdAddress.district,
      city: createdAddress.city,
      state: createdAddress.state,
      zipCode: createdAddress.zipCode,
    };

    await updateAddressUseCase.execute({ ...updateRequest });

    const { addresses } = await findAllAddressesUseCase.execute();
    expect(addresses[0].object).toStrictEqual(updateRequest);
  });
});
