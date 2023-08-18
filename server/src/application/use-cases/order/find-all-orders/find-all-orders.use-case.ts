import { OrderMapper } from '@application/mappers/order-mapper';
import { OrderRepository } from '@application/repositories/order/order.repository';
import { Injectable } from '@nestjs/common';

export interface FindAllOrdersUseCaseResponse {
  orders: OrderMapper[];
}

@Injectable()
export class FindAllOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(): Promise<FindAllOrdersUseCaseResponse> {
    const orders = await this.orderRepository.findAll();
    return { orders };
  }
}
