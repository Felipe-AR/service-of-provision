import { Customer } from '@application/domain/customer/customer.entity';
import { CustomerRepository } from '@application/repositories/customer/customer.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaCustomerMapper } from '../mappers/prisma-customer-mapper';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private prismaService: PrismaService) {}

  async findByUser(id: string): Promise<Customer | null> {
    const customer = await this.prismaService.customer.findFirst({
      where: { userId: id },
    });

    if (!customer) {
      return null;
    }

    return PrismaCustomerMapper.toDomain(customer);
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.prismaService.customer.findMany();
    return customers.map(PrismaCustomerMapper.toDomain);
  }

  async create(customer: Customer): Promise<Customer> {
    const rawCustomer = PrismaCustomerMapper.toPrisma(customer);
    const createdCustomer = await this.prismaService.customer.create({
      data: rawCustomer,
    });

    return PrismaCustomerMapper.toDomain(createdCustomer);
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
