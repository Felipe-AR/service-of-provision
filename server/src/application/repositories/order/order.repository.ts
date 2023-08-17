import { Order } from '@application/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class OrderRepository {
  abstract find(id: string): Promise<Order | null>;
  abstract findAll(): Promise<Order[]>;
  abstract create(order: Order): Promise<Order>;
  abstract save(order: Order): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
