import { OrderRepository } from '@application/repositories/order/order.repository';
import { FindOrderUseCase } from '../find-order/find-order.use-case';
import { Order, OrderStatus } from '@application/domain';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { SendNotificationUseCase } from '@application/use-cases/notification/send-notification/send-notification.use-case';

export interface DenyOrderUseCaseRequest {
  id: string;
}

type DenyOrderUseCaseResponse = void;

@Injectable()
export class DenyOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private findOrderUseCase: FindOrderUseCase,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {}

  async execute(
    request: DenyOrderUseCaseRequest,
  ): Promise<DenyOrderUseCaseResponse> {
    const { id } = request;

    const { order } = await this.findOrderUseCase.execute({ id });

    if (order.status !== OrderStatus.CREATED) {
      throw new ForbiddenException(
        'Atualmente o pedido não pode ser alterado.',
      );
    }

    order.status = OrderStatus.DENIED;

    await this.orderRepository.save(
      new Order(
        {
          customerId: order.customer.user.id,
          selectedAddressId: order.selectedAddress.id,
          serviceProviderId: order.serviceProvider.user.id,
          price: order.price,
          status: order.status,
          createdAt: order.createdAt,
        },
        order.id,
      ),
    );

    await this.sendNotificationUseCase.execute({
      userId: order.customer.user.id,
      description: `O prestador ${order.serviceProvider.companyName}, recusou o seu pedido com a identificação #${order.id}.`,
    });
  }
}
