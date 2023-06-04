import { makeAddress } from '@test/factories';
import { InMemoryAddressRepository } from '@test/repositories/in-memory-address.repository';
import { CreateAddressUseCase } from '../create-address/create-address.use-case';
import { Address } from '@application/domain/address/address.entity';
import { FindAllAddressesByUserUseCase } from './find-all-addresses-by-user.use-case';
import { randomUUID } from 'crypto';

describe('Find All Addresses By User', () => {
  it('should be able to find all addresses by user', async () => {
    const randomUserId = randomUUID();

    const genericAddresses = [
      makeAddress({ userId: randomUserId }),
      makeAddress(),
      makeAddress({ userId: randomUserId }),
    ];

    const addressesByRandomUserIdLength = genericAddresses.filter(
      (address) => address.userId === randomUserId,
    ).length;

    const addressesGeneratedByRandomUserId: Address[] = [];

    const repository = new InMemoryAddressRepository();
    const findAllAddressesUseCase = new FindAllAddressesByUserUseCase(
      repository,
    );
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
        if (createdAddress.address.userId === randomUserId)
          addressesGeneratedByRandomUserId.push(createdAddress.address);
        return createdAddress.address;
      }),
    );

    const { addresses } = await findAllAddressesUseCase.execute({
      userId: randomUserId,
    });

    expect(addresses).toHaveLength(addressesByRandomUserIdLength);
    expect(addresses).toStrictEqual(addressesGeneratedByRandomUserId);
  });
});
