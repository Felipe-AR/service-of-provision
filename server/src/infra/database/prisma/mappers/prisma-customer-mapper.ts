import { Customer } from '@application/domain/customer/customer.entity';
import { Customer as RawCustomer, User as RawUser } from '@prisma/client';
import { PrismaGenderMapper } from './prisma-gender-mapper';
import { CustomerMapper } from '@application/mappers/customer-mapper';
import { PrismaUserMapper, RawUserWithRelations } from './prisma-user-mapper';

export type RawCustomerWithRelations = RawCustomer & {
  user: RawUserWithRelations;
};

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

  static toDomainWithRelations(
    rawCustomer: RawCustomerWithRelations,
  ): CustomerMapper {
    return new CustomerMapper({
      user: PrismaUserMapper.toDomainWithRelations(rawCustomer.user),
      name: rawCustomer.name,
      surname: rawCustomer.surname,
      cpf: rawCustomer.cpf,
      rg: rawCustomer.rg,
      gender: PrismaGenderMapper.toDomain(rawCustomer.gender),
    });
  }
}
