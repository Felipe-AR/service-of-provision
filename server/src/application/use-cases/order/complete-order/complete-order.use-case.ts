import { OrderRepository } from '@application/repositories/order/order.repository';
import { FindOrderUseCase } from '../find-order/find-order.use-case';
import { Order, OrderStatus } from '@application/domain';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { SendNotificationUseCase } from '@application/use-cases/notification/send-notification/send-notification.use-case';

export interface CompleteOrderUseCaseRequest {
  id: string;
}

type CompleteOrderUseCaseResponse = void;

@Injectable()
export class CompleteOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private findOrderUseCase: FindOrderUseCase,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {}

  async execute(
    request: CompleteOrderUseCaseRequest,
  ): Promise<CompleteOrderUseCaseResponse> {
    const { id } = request;

    const { order } = await this.findOrderUseCase.execute({ id });

    if (order.status !== OrderStatus.ACCEPTED) {
      throw new ForbiddenException(
        'Atualmente o pedido não pode ser alterado.',
      );
    }

    order.status = OrderStatus.COMPLETED;

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

    await this.sendNotificationUseCase.execute({
      userId: order.customer.user.id,
      description: `O prestador ${order.serviceProvider.companyName}, finalizou o seu pedido com a identificação #${order.id}.`,
    });
  }
}
