import { Order, OrderProperties } from '@application/domain/order/order.entity';
import { OrderStatus } from '@application/domain/order/order-status.enum';

export function makeOrder(override?: OrderProperties) {
  return new Order({
    customerId: 'fake-customer-id',
    serviceProviderId: 'fake-service-provider-id',
    price: 10.0,
    status: OrderStatus.CREATED,
    ...override,
  });
}
