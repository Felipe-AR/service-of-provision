import { Order } from '@application/domain';
import {
  Order as RawOrder,
  Service as RawService,
  Address as RawAddress,
} from '@prisma/client';
import { PrismaOrderStatusMapper } from './prisma-order-status-mapper';
import { OrderMapper } from '@application/mappers/order-mapper';
import {
  PrismaCustomerMapper,
  RawCustomerWithRelations,
} from './prisma-customer-mapper';
import {
  PrismaServiceProviderMapper,
  RawServiceProviderWithRelations,
} from './prisma-service-provider.mapper';
import { PrismaAddressMapper } from './prisma-address-mapper';
import { PrismaServiceMapper } from './prisma-service.mapper';

type RawOrderWithRelations = RawOrder & {
  customer: RawCustomerWithRelations;
  serviceProvider: RawServiceProviderWithRelations;
  address: RawAddress;
  services: RawService[];
};

export class PrismaOrderMapper {
  static toPrisma(order: Order): RawOrder {
    return {
      id: order.id,
      customerUserId: order.customerId,
      serviceProviderUserId: order.serviceProviderId,
      selectedAddressId: order.selectedAddressId,
      price: order.price,
      status: PrismaOrderStatusMapper.toPrisma(order.status),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }

  static toDomain(rawOrder: RawOrder): Order {
    return new Order(
      {
        customerId: rawOrder.customerUserId,
        serviceProviderId: rawOrder.serviceProviderUserId,
        price: rawOrder.price,
        selectedAddressId: rawOrder.selectedAddressId,
        status: PrismaOrderStatusMapper.toDomain(rawOrder.status),
        createdAt: rawOrder.createdAt,
        updatedAt: rawOrder.updatedAt,
      },
      rawOrder.id,
    );
  }

  static toDomainWithRelations(rawOrder: RawOrderWithRelations): OrderMapper {
    return new OrderMapper({
      id: rawOrder.id,
      customer: PrismaCustomerMapper.toDomainWithRelations(rawOrder.customer),
      serviceProvider: PrismaServiceProviderMapper.toDomainWithRelations(
        rawOrder.serviceProvider,
      ),
      selectedAddress: PrismaAddressMapper.toDomain(rawOrder.address),
      services: rawOrder.services.map(PrismaServiceMapper.toDomain),
      price: rawOrder.price,
      status: PrismaOrderStatusMapper.toDomain(rawOrder.status),
      createdAt: rawOrder.createdAt,
      updatedAt: rawOrder.updatedAt,
    });
  }
}
