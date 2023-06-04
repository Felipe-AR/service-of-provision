import { InMemoryAddressRepository } from '@test/repositories/in-memory-address.repository';
import { CreateAddressUseCase } from './create-address.use-case';
import { AddressProperties } from '@application/domain/address/address.entity';
import { makeAddress } from '@test/factories';

describe('Create Address', () => {
  it('should be able to create an address', async () => {
    const request: AddressProperties = {
      userId: makeAddress().userId,
      street: 'Rua das Flores',
      num: '111',
      district: 'Vila Primavera',
      complement: 'Apartamento 105',
      city: 'Gramados',
      state: 'SC',
      zipCode: '12345-000',
    };

    const repository = new InMemoryAddressRepository();
    const createAddressUseCase = new CreateAddressUseCase(repository);
    const addresses = await repository.findAll();

    const { address } = await createAddressUseCase.execute(request);

    const input = address.object;
    const output = addresses[0].object;

    expect(addresses).toHaveLength(1);

    expect(input).toStrictEqual({
      id: output.id,
      userId: output.userId,
      street: output.street,
      num: output.num,
      district: output.district,
      complement: output.complement,
      city: output.city,
      state: output.state,
      zipCode: output.zipCode,
    });
  });
});
