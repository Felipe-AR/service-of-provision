import { InMemoryUserRepository } from '@test/repositories/in-memory-user.repository';
import { CreateUserUseCase } from '../create-user/create-user.use-case';
import { InMemoryAddressRepository } from '@test/repositories/in-memory-address.repository';
import { CreateAddressUseCase } from '@application/use-cases/address/create-address/create-address.use-case';
import { makeUser } from '@test/factories/user.factory';
import { FindUserUseCase } from './find-user.use-case';

describe('Find User', () => {
  it('should be able to find an user', async () => {
    const genericUser = makeUser();

    const userRepository = new InMemoryUserRepository();
    const addressRepository = new InMemoryAddressRepository();
    const createAddressUseCase = new CreateAddressUseCase(addressRepository);
    const findUserUseCase = new FindUserUseCase(userRepository);

    const createUserUseCase = new CreateUserUseCase(
      userRepository,
      createAddressUseCase,
    );

    const { user } = await createUserUseCase.execute({
      email: genericUser.email,
      password: genericUser.password,
      phone: genericUser.phone,
      addresses: genericUser.addresses,
      role: genericUser.role,
      createdAt: genericUser.createdAt,
      updatedAt: genericUser.updatedAt,
    });

    const { user: createdUser } = await findUserUseCase.execute({
      id: user.id,
    });

    const input = user.object;
    const output = createdUser.object;

    expect(input).toStrictEqual(output);
  });
});
