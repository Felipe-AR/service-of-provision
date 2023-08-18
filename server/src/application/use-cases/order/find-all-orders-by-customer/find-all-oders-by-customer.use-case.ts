import { OrderMapper } from '@application/mappers/order-mapper';
import { OrderRepository } from '@application/repositories/order/order.repository';
import { FindCustomerUseCase } from '@application/use-cases/customer/find-customer/find-customer.use-case';
import { Injectable } from '@nestjs/common';

export interface FindAllOrdersByCustomerUseCaseRequest {
  customerId: string;
}

export interface FindAllOrdersByCustomerUseCaseResponse {
  orders: OrderMapper[];
}

@Injectable()
export class FindAllOrdersByCustomerUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private findCustomerUseCase: FindCustomerUseCase,
  ) {}

  async execute(
    request: FindAllOrdersByCustomerUseCaseRequest,
  ): Promise<FindAllOrdersByCustomerUseCaseResponse> {
    const { customerId } = request;

    const { customer } = await this.findCustomerUseCase.execute({
      userId: customerId,
    });

    const orders = await this.orderRepository.findAllByCustomer(
      customer.userId,
    );

    return { orders };
  }
}
