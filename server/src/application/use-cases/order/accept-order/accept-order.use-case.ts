import { OrderRepository } from '@application/repositories/order/order.repository';
import { FindOrderUseCase } from '../find-order/find-order.use-case';
import { Order, OrderStatus } from '@application/domain';
import { ForbiddenException, Injectable } from '@nestjs/common';

export interface AcceptOrderUseCaseRequest {
  id: string;
}

type AcceptOrderUseCaseResponse = void;

@Injectable()
export class AcceptOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private findOrderUseCase: FindOrderUseCase,
  ) {}

  async execute(
    request: AcceptOrderUseCaseRequest,
  ): Promise<AcceptOrderUseCaseResponse> {
    const { id } = request;

    const { order } = await this.findOrderUseCase.execute({ id });

    if (order.status !== OrderStatus.CREATED) {
      throw new ForbiddenException('Order currently cannot be changed.');
    }

    order.status = OrderStatus.ACCEPTED;

    await this.orderRepository.save(
      new Order(
        {
          customerId: order.customer.user.id,
          selectedAddressId: order.selectedAddress.id,
          serviceProviderId: order.serviceProvider.user.id,
          price: order.price,
          status: order.status,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        },
        order.id,
      ),
    );
  }
}
