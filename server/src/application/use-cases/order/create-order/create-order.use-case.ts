import { Order, OrderStatus } from '@application/domain';
import { OrderMapper } from '@application/mappers/order-mapper';
import { ServiceRepository } from '@application/repositories';
import { OrderRepository } from '@application/repositories/order/order.repository';
import { FindAddressUseCase } from '@application/use-cases/address/find-address/find-address.use-case';
import { FindCustomerUseCase } from '@application/use-cases/customer/find-customer/find-customer.use-case';
import { SendNotificationUseCase } from '@application/use-cases/notification/send-notification/send-notification.use-case';
import { FindServiceProviderUseCase } from '@application/use-cases/service-provider/find-service-provider/find-service-provider.use-case';
import { BadRequestException, Injectable } from '@nestjs/common';

export interface CreateOrderUseCaseRequest {
  customerId: string;
  serviceProviderId: string;
  selectedAddressId: string;
  selectedServices: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateOrderUseCaseResponse {
  order: OrderMapper;
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private serviceRepository: ServiceRepository,
    private findCustomerUseCase: FindCustomerUseCase,
    private findServiceProviderUseCase: FindServiceProviderUseCase,
    private findAddressUseCase: FindAddressUseCase,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {}

  async execute(
    request: CreateOrderUseCaseRequest,
  ): Promise<CreateOrderUseCaseResponse> {
    const { selectedServices, ...orderRequest } = request;

    await this.findCustomerUseCase.execute({ userId: orderRequest.customerId });
    await this.findServiceProviderUseCase.execute({
      userId: orderRequest.serviceProviderId,
    });
    await this.findAddressUseCase.execute({
      id: orderRequest.selectedAddressId,
    });

    const services = await this.serviceRepository.findAllByIdIn(
      selectedServices,
    );

    if (services.length === 0) {
      throw new BadRequestException(
        'Selected services must be greater than or equals one',
      );
    }

    const price = services.reduce(
      (accumulator, service) => accumulator + service.price,
      0,
    );

    const order = new Order({
      ...orderRequest,
      services,
      price,
      status: OrderStatus.CREATED,
    });

    const createdOrder = await this.orderRepository.create(order);

    await this.sendNotificationUseCase.execute({
      userId: createdOrder.serviceProvider.user.id,
      description: `O cliente ${createdOrder.customer.name} ${createdOrder.customer.surname}, criou um pedido com a identificação #${order.id}.`,
    });

    return { order: createdOrder };
  }
}
