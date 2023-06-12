import { makeCoreBusiness } from '@test/factories/core-business.factory';

describe('Core Business', () => {
  it('should be able to create a core business', () => {
    const coreBusiness = makeCoreBusiness();
    expect(coreBusiness).toBeTruthy();
  });
});
