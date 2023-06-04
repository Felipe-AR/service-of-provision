import { InMemoryAddressRepository } from '@test/repositories/in-memory-address.repository';
import { FindAddressUseCase } from './find-address.use-case';
import { randomUUID } from 'crypto';
import { makeAddress } from '@test/factories';
import { CreateAddressUseCase } from '../create-address/create-address.use-case';

describe('Find Address', () => {
  it('should be able to find an address', async () => {
    const genericAddress = makeAddress();
    const repository = new InMemoryAddressRepository();
    const createAddressUseCase = new CreateAddressUseCase(repository);
    const findAddressUseCase = new FindAddressUseCase(repository);

    const { address: createdAddress } = await createAddressUseCase.execute({
      userId: genericAddress.userId,
      street: genericAddress.street,
      num: genericAddress.num,
      complement: genericAddress.complement,
      city: genericAddress.city,
      district: genericAddress.district,
      state: genericAddress.state,
      zipCode: genericAddress.zipCode,
    });

    const { address: addressFound } = await findAddressUseCase.execute({
      id: createdAddress.id,
    });

    expect(addressFound.object).toStrictEqual(createdAddress.object);
  });
});
