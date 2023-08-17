import { Customer } from '@application/domain/customer/customer.entity';
import { Customer as RawCustomer } from '@prisma/client';
import { PrismaGenderMapper } from './prisma-gender-mapper';

export class PrismaCustomerMapper {
  static toPrisma(customer: Customer): RawCustomer {
    return {
      userId: customer.userId,
      rg: customer.rg,
      cpf: customer.cpf,
      name: customer.name,
      surname: customer.surname,
      gender: PrismaGenderMapper.toPrisma(customer.gender),
    };
  }

  static toDomain(rawCustomer: RawCustomer): Customer {
    return new Customer(
      {
        name: rawCustomer.name,
        surname: rawCustomer.surname,
        rg: rawCustomer.rg,
        cpf: rawCustomer.cpf,
        gender: PrismaGenderMapper.toDomain(rawCustomer.gender),
      },
      rawCustomer.userId,
    );
  }
}
