import { Order } from '@application/domain';
import { OrderRepository } from '@application/repositories/order/order.repository';

export interface CreateOrderUseCaseRequest {
  customerId: string;
  serviceProviderId: string;
  selectedAddressId: string;
  selectedServices: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateOrderUseCaseResponse {
  order: Order;
}

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(
    request: CreateOrderUseCaseRequest,
  ): Promise<CreateOrderUseCaseResponse> {
    return null;
  }
}
