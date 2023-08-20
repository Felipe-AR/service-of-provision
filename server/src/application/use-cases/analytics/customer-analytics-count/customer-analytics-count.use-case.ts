import { Injectable } from '@nestjs/common';

import { OrderRepository } from '@application/repositories/order/order.repository';
import { FindCustomerUseCase } from '@application/use-cases/customer/find-customer/find-customer.use-case';
import { OrderStatus } from '@application/domain';

export interface CustomerAnalyticsCountUseCaseRequest {
  userId: string;
}

export interface CustomerAnalyticsCountUseCaseResponse {
  requestedServices: number;
  ongoingServices: number;
  finishedServices: number;
}

@Injectable()
export class CustomerAnalyticsCountUseCase {
  constructor(
    private findCustomerUseCase: FindCustomerUseCase,
    private orderRepository: OrderRepository,
  ) {}

  async execute(
    request: CustomerAnalyticsCountUseCaseRequest,
  ): Promise<CustomerAnalyticsCountUseCaseResponse> {
    const { userId } = request;
    const { customer } = await this.findCustomerUseCase.execute({ userId });

    const orders = await this.orderRepository.findAllByCustomer(
      customer.user.id,
    );

    const counts = orders.reduce(
      (previousOrder, currentOrder) => {
        const currentStatus = currentOrder.status;

        if (currentStatus in previousOrder) {
          previousOrder[currentStatus]++;
        }

        return previousOrder;
      },
      {
        [OrderStatus.CREATED]: 0,
        [OrderStatus.ACCEPTED]: 0,
        [OrderStatus.DENIED]: 0,
        [OrderStatus.COMPLETED]: 0,
      },
    );

    return {
      requestedServices: counts.CREATED,
      ongoingServices: counts.ACCEPTED,
      finishedServices: counts.COMPLETED,
    };
  }
}
