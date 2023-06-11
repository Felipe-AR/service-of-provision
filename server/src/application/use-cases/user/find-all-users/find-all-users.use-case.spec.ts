import { InMemoryUserRepository } from '@test/repositories/in-memory-user.repository';
import { FindAllUsersUseCase } from './find-all-users.use-case';
import { makeUser } from '@test/factories/user.factory';
import { CreateUserUseCase } from '../create-user/create-user.use-case';
import { CreateAddressUseCase } from '@application/use-cases/address/create-address/create-address.use-case';
import { InMemoryAddressRepository } from '@test/repositories/in-memory-address.repository';

describe('Find All Users', () => {
  it('should be able to find all users', async () => {
    const genericUser = makeUser();

    const userRepository = new InMemoryUserRepository();
    const addressRepository = new InMemoryAddressRepository();
    const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
    const createAddressUseCase = new CreateAddressUseCase(addressRepository);
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

    const { users } = await findAllUsersUseCase.execute();

    const input = user.object;
    const output = users[0].object;

    expect(users).toHaveLength(1);
    expect(input).toStrictEqual(output);
  });
});
