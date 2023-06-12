import { makeOrder } from '@test/factories/order.factory';

describe('Order', () => {
  it('should be able to create an order', () => {
    const order = makeOrder();
    expect(order).toBeTruthy();
  });
});
