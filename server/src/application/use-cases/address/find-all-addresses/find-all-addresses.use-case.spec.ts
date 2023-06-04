import { InMemoryAddressRepository } from '@test/repositories/in-memory-address.repository';
import { FindAllAddressesUseCase } from './find-all-addresses.use-case';
import { CreateAddressUseCase } from '../create-address/create-address.use-case';
import { makeAddress } from '@test/factories';
import { Address } from '@application/domain/address/address.entity';

describe('Find Addresses', () => {
  it('should be able to find all addresses', async () => {
    const genericAddresses = [makeAddress(), makeAddress(), makeAddress()];

    const repository = new InMemoryAddressRepository();
    const findAllAddressesUseCase = new FindAllAddressesUseCase(repository);
    const createAddressUseCase = new CreateAddressUseCase(repository);

    const createdAddresses: Address[] = await Promise.all(
      genericAddresses.map(async (address) => {
        const createdAddress = await createAddressUseCase.execute({
          userId: address.userId,
          street: address.street,
          num: address.num,
          complement: address.complement,
          district: address.district,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
        });
        return createdAddress.address;
      }),
    );

    const { addresses } = await findAllAddressesUseCase.execute();

    expect(addresses).toHaveLength(genericAddresses.length);
    expect(createdAddresses).toStrictEqual(addresses);
  });
});
