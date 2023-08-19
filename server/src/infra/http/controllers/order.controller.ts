import { CreateOrderUseCase } from '@application/use-cases/order/create-order/create-order.use-case';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderDTO, OrderViewModel } from '../view-models/order-view-model';
import { CreateOrderForm } from '../forms/create-order-form';
import { FindOrderUseCase } from '@application/use-cases/order/find-order/find-order.use-case';
import { FindAllOrdersUseCase } from '@application/use-cases/order/find-all-orders/find-all-orders.use-case';
import { FindAllOrdersByCustomerUseCase } from '@application/use-cases/order/find-all-orders-by-customer/find-all-oders-by-customer.use-case';
import { FindAllOrdersByServiceProviderUseCase } from '@application/use-cases/order/find-all-orders-by-service-provider/find-all-orders-by-service-provider.use-case';
import { AcceptOrderUseCase } from '@application/use-cases/order/accept-order/accept-order.use-case';
import { DenyOrderUseCase } from '@application/use-cases/order/deny-order/deny-order.use-case';
import { CompleteOrderUseCase } from '@application/use-cases/order/complete-order/complete-order.use-case';

@Controller('order')
export class OrderController {
  constructor(
    private findOrderUseCase: FindOrderUseCase,
    private findAllOrdersUseCase: FindAllOrdersUseCase,
    private findAllOrdersByCustomerUseCase: FindAllOrdersByCustomerUseCase,
    private findAllOrdersByServiceProviderUseCase: FindAllOrdersByServiceProviderUseCase,
    private createOrderUseCase: CreateOrderUseCase,
    private acceptOrderUseCase: AcceptOrderUseCase,
    private denyOrderUseCase: DenyOrderUseCase,
    private completeOrderUseCase: CompleteOrderUseCase,
  ) {}

  @Get()
  public async findAllOrders(): Promise<OrderDTO[]> {
    const { orders } = await this.findAllOrdersUseCase.execute();
    return orders.map(OrderViewModel.toHTTP);
  }

  @Get(':id')
  public async findOrder(@Param('id') id: string): Promise<OrderDTO> {
    const { order } = await this.findOrderUseCase.execute({ id });
    return OrderViewModel.toHTTP(order);
  }

  @Get('/customer/:customerId')
  public async findAllOrdersByCustomer(
    @Param('customerId') customerId: string,
  ): Promise<OrderDTO[]> {
    const { orders } = await this.findAllOrdersByCustomerUseCase.execute({
      customerId,
    });
    return orders.map(OrderViewModel.toHTTP);
  }

  @Get('/service-provider/:serviceProviderId')
  public async findAllOrdersByServiceProvider(
    @Param('serviceProviderId') serviceProviderId: string,
  ): Promise<OrderDTO[]> {
    const { orders } = await this.findAllOrdersByServiceProviderUseCase.execute(
      {
        serviceProviderId,
      },
    );
    return orders.map(OrderViewModel.toHTTP);
  }

  @Post()
  public async createOrder(@Body() form: CreateOrderForm): Promise<OrderDTO> {
    const { order } = await this.createOrderUseCase.execute(form);
    return OrderViewModel.toHTTP(order);
  }

  @Patch(':id/accept')
  public async acceptOrder(@Param('id') id: string): Promise<void> {
    await this.acceptOrderUseCase.execute({ id });
  }

  @Patch(':id/deny')
  public async denyOrder(@Param('id') id: string): Promise<void> {
    await this.denyOrderUseCase.execute({ id });
  }

  @Patch(':id/complete')
  public async completeOrder(@Param('id') id: string): Promise<void> {
    await this.completeOrderUseCase.execute({ id });
  }
}
