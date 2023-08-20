import { Injectable } from '@nestjs/common';

import { OrderRepository } from '@application/repositories/order/order.repository';
import { FindServiceProviderUseCase } from '@application/use-cases/service-provider/find-service-provider/find-service-provider.use-case';
import { OrderStatus } from '@application/domain';

export interface ServiceProviderAnalyticsCountUseCaseRequest {
  userId: string;
}

export interface ServiceProviderAnalyticsCountUseCaseResponse {
  requestedServices: number;
  ongoingServices: number;
  finishedServices: number;
}

@Injectable()
export class ServiceProviderAnalyticsCountUseCase {
  constructor(
    private findServiceProviderUseCase: FindServiceProviderUseCase,
    private orderRepository: OrderRepository,
  ) {}

  async execute(
    request: ServiceProviderAnalyticsCountUseCaseRequest,
  ): Promise<ServiceProviderAnalyticsCountUseCaseResponse> {
    const { userId } = request;
    const { serviceProvider } = await this.findServiceProviderUseCase.execute({
      userId,
    });

    const orders = await this.orderRepository.findAllByServiceProvider(
      serviceProvider.user.id,
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
