import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrderRepository } from '@application/repositories/order/order.repository';
import { Order } from '@application/domain';
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper';
import { OrderMapper } from '@application/mappers/order-mapper';

const includeOptions = {
  customer: { include: { user: { include: { addresses: true } } } },
  address: true,
  services: true,
  serviceProvider: {
    include: {
      user: { include: { addresses: true } },
      coreBusiness: true,
      services: { include: { category: true } },
      specialities: true,
    },
  },
};

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private prismaService: PrismaService) {}

  async find(id: string): Promise<OrderMapper | null> {
    const order = await this.prismaService.order.findFirst({
      where: { id },
      include: { ...includeOptions },
      orderBy: [{ createdAt: 'desc' }, { status: 'desc' }],
    });

    return PrismaOrderMapper.toDomainWithRelations(order);
  }

  async findAll(): Promise<OrderMapper[]> {
    const orders = await this.prismaService.order.findMany({
      include: { ...includeOptions },
      orderBy: [{ createdAt: 'desc' }, { status: 'desc' }],
    });

    return orders.map(PrismaOrderMapper.toDomainWithRelations);
  }

  async findAllByCustomer(customerId: string): Promise<OrderMapper[]> {
    const orders = await this.prismaService.order.findMany({
      where: { customerUserId: customerId },
      include: { ...includeOptions },
      orderBy: [{ createdAt: 'desc' }, { status: 'desc' }],
    });
    return orders.map(PrismaOrderMapper.toDomainWithRelations);
  }

  async findAllByServiceProvider(
    serviceProviderId: string,
  ): Promise<OrderMapper[]> {
    const orders = await this.prismaService.order.findMany({
      where: { serviceProviderUserId: serviceProviderId },
      include: { ...includeOptions },
      orderBy: [{ createdAt: 'desc' }, { status: 'desc' }],
    });
    return orders.map(PrismaOrderMapper.toDomainWithRelations);
  }

  async create(order: Order): Promise<OrderMapper> {
    const rawOrder = PrismaOrderMapper.toPrisma(order);
    const createdOrder = await this.prismaService.order.create({
      data: {
        ...rawOrder,
        services: {
          connect: order.services.map((service) => ({ id: service.id })),
        },
      },
      include: { ...includeOptions },
    });

    return PrismaOrderMapper.toDomainWithRelations(createdOrder);
  }

  async save(order: Order): Promise<void> {
    const rawOrder = PrismaOrderMapper.toPrisma(order);
    await this.prismaService.order.update({
      where: { id: rawOrder.id },
      data: { ...rawOrder },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.order.delete({
      where: { id },
    });
  }
}
