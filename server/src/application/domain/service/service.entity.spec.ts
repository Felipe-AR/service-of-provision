import { makeService } from '@test/factories/service.factory';

describe('Service', () => {
  it('should be able to create a service', () => {
    const service = makeService();
    expect(service).toBeTruthy();
  });
});
