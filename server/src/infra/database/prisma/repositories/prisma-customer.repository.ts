import { Customer } from '@application/domain/customer/customer.entity';
import { CustomerRepository } from '@application/repositories/customer/customer.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaCustomerMapper } from '../mappers/prisma-customer-mapper';
import { CustomerMapper } from '@application/mappers/customer-mapper';

const includeOptions = {
  user: { include: { addresses: true } },
};

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private prismaService: PrismaService) {}

  async findByUser(id: string): Promise<CustomerMapper | null> {
    const customer = await this.prismaService.customer.findFirst({
      where: { userId: id },
      include: { ...includeOptions },
    });

    if (!customer) {
      return null;
    }

    return PrismaCustomerMapper.toDomainWithRelations(customer);
  }

  async findAll(): Promise<CustomerMapper[]> {
    const customers = await this.prismaService.customer.findMany({
      include: { ...includeOptions },
    });

    return customers.map(PrismaCustomerMapper.toDomainWithRelations);
  }

  async create(customer: Customer): Promise<CustomerMapper> {
    const rawCustomer = PrismaCustomerMapper.toPrisma(customer);
    const createdCustomer = await this.prismaService.customer.create({
      data: rawCustomer,
      include: { ...includeOptions },
    });

    return PrismaCustomerMapper.toDomainWithRelations(createdCustomer);
  }

  async save(customer: Customer): Promise<void> {
    const rawCustomer = PrismaCustomerMapper.toDomain(customer);
    await this.prismaService.customer.update({
      where: { userId: rawCustomer.userId },
      data: { ...rawCustomer },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.customer.delete({ where: { userId: id } });
  }
}
