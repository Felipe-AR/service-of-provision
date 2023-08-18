import { OrderMapper } from '@application/mappers/order-mapper';
import { OrderRepository } from '@application/repositories/order/order.repository';
import { FindCustomerUseCase } from '@application/use-cases/customer/find-customer/find-customer.use-case';
import { FindServiceProviderUseCase } from '@application/use-cases/service-provider/find-service-provider/find-service-provider.use-case';
import { Injectable } from '@nestjs/common';

export interface FindAllOrdersByServiceProviderUseCaseRequest {
  serviceProviderId: string;
}

export interface FindAllOrdersByServiceProviderUseCaseResponse {
  orders: OrderMapper[];
}

@Injectable()
export class FindAllOrdersByServiceProviderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private findServiceProviderUseCase: FindServiceProviderUseCase,
  ) {}

  async execute(
    request: FindAllOrdersByServiceProviderUseCaseRequest,
  ): Promise<FindAllOrdersByServiceProviderUseCaseResponse> {
    const { serviceProviderId } = request;

    const { serviceProvider } = await this.findServiceProviderUseCase.execute({
      userId: serviceProviderId,
    });

    const orders = await this.orderRepository.findAllByServiceProvider(
      serviceProvider.user.id,
    );

    return { orders };
  }
}
