import { makeUser } from '@test/factories/user.factory';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user.repository';
import { CreateUserUseCase } from './create-user.use-case';
import { Role } from '@application/domain/user/role.enum';
import { FindAllUsersUseCase } from '../find-all-users/find-all-users.use-case';
import { CreateAddressUseCase } from '@application/use-cases/address/create-address/create-address.use-case';
import { InMemoryAddressRepository } from '@test/repositories/in-memory-address.repository';

describe('Create User', () => {
  it('should be able to create an user', async () => {
    const genericUser = makeUser();

    const userRepository = new InMemoryUserRepository();
    const addressRepository = new InMemoryAddressRepository();
    const createAddressUseCase = new CreateAddressUseCase(addressRepository);
    const createUserUseCase = new CreateUserUseCase(
      userRepository,
      createAddressUseCase,
    );
    const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);

    const { user: createdUser } = await createUserUseCase.execute({
      email: genericUser.email,
      password: genericUser.password,
      phone: genericUser.phone,
      role: Role.CUSTOMER,
    });

    const { users } = await findAllUsersUseCase.execute();

    const input = createdUser.object;
    const output = users[0].object;

    expect(input).toStrictEqual(output);
  });
});
