import { makeUser } from '@test/factories/user.factory';

describe('User', () => {
  it('should be able to create user', () => {
    const user = makeUser();
    expect(user).toBeTruthy();
  });
});
