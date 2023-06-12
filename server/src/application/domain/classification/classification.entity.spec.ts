import { makeClassification } from '@test/factories/classification.factory';

describe('Classification', () => {
  it('should be able to create a classification', () => {
    const classification = makeClassification();
    expect(classification).toBeTruthy();
  });
});
