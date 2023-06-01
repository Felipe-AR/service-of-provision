import { makeCategory } from '@test/factories/category.factory';

describe('Category', () => {
  it('should be able to create a category entity', () => {
    const category = makeCategory();
    expect(category).toBeTruthy();
  });
});
