import { ObjectNotFoundException } from '@application/exceptions';
import { OrderMapper } from '@application/mappers/order-mapper';
import { OrderRepository } from '@application/repositories/order/order.repository';
import { Injectable } from '@nestjs/common';

export interface FindOrderUseCaseRequest {
  id: string;
}

export interface FindOrderUseCaseResponse {
  order: OrderMapper;
}

@Injectable()
export class FindOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(
    request: FindOrderUseCaseRequest,
  ): Promise<FindOrderUseCaseResponse> {
    const { id } = request;
    const order = await this.orderRepository.find(id);

    if (!order) {
      throw new ObjectNotFoundException('Order was not found.');
    }

    return { order };
  }
}
