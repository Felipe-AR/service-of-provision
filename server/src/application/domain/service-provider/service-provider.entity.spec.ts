import { makeServiceProvider } from '@test/factories/service-provider.factory';

describe('Service Provider', () => {
  it('should be able to create a service provider', () => {
    const serviceProvider = makeServiceProvider();
    expect(serviceProvider).toBeTruthy();
  });
});
