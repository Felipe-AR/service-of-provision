import { makeAddress } from '@test/factories/address.factory';

describe('Address', () => {
  it('should be able to create address', () => {
    const address = makeAddress();
    expect(address).toBeTruthy();
  });
});
