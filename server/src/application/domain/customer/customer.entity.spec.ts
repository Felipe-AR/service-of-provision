import { makeCustomer } from '@test/factories/customer.factory';

describe('Customer', () => {
  it('should be able to create a customer', async () => {
    const customer = makeCustomer();
    expect(customer).toBeTruthy();
  });
});
