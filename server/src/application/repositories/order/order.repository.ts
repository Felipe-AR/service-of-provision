import { Order } from '@application/domain';
import { OrderMapper } from '@application/mappers/order-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class OrderRepository {
  abstract find(id: string): Promise<OrderMapper | null>;
  abstract findAll(): Promise<OrderMapper[]>;
  abstract findAllByCustomer(customerId: string): Promise<OrderMapper[]>;
  abstract findAllByServiceProvider(
    serviceProviderId: string,
  ): Promise<OrderMapper[]>;
  abstract create(order: Order): Promise<OrderMapper>;
  abstract save(order: Order): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
