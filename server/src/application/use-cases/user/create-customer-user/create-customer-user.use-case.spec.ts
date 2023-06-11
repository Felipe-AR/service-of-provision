import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer.repository';
import { CreateCustomerUserUseCase } from './create-customer-user.use-case';
import { CreateUserUseCase } from '../create-user/create-user.use-case';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user.repository';
import { makeUser } from '@test/factories/user.factory';
import { makeCustomer } from '@test/factories/customer.factory';
import { CreateAddressUseCase } from '@application/use-cases/address/create-address/create-address.use-case';
import { InMemoryAddressRepository } from '@test/repositories/in-memory-address.repository';
import { makeAddress } from '@test/factories';
import { Role } from '@application/domain/user/role.enum';

describe('Create Customer User', () => {
  it('should be able to create a customer user', async () => {
    const genericUser = makeUser();
    const genericCustomer = makeCustomer();
    const genericAddress = makeAddress();

    const userRepository = new InMemoryUserRepository();
    const customerRepository = new InMemoryCustomerRepository();
    const addressRepository = new InMemoryAddressRepository();

    const createAddressUseCase = new CreateAddressUseCase(addressRepository);
    const createUserUseCase = new CreateUserUseCase(
      userRepository,
      createAddressUseCase,
    );
    const createCustomerUserUseCase = new CreateCustomerUserUseCase(
      customerRepository,
      createUserUseCase,
    );

    const { customer } = await createCustomerUserUseCase.execute({
      email: genericUser.email,
      password: genericUser.password,
      name: genericCustomer.name,
      surname: genericCustomer.surname,
      gender: genericCustomer.gender,
      addresses: [
        {
          street: genericAddress.street,
          num: genericAddress.num,
          city: genericAddress.city,
          district: genericAddress.district,
          state: genericAddress.state,
          zipCode: genericAddress.zipCode,
        },
      ],
      phone: genericUser.phone,
      cpf: genericCustomer.cpf,
      rg: genericCustomer.rg,
    });

    const users = await userRepository.findAll();
    const customers = await customerRepository.findAll();

    const input = customer.object;
    const output = customers[0].object;

    expect(users[0].object.role).toEqual(Role.CUSTOMER);

    expect(input).toStrictEqual(output);
  });
});
