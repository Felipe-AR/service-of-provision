import { makeSpeciality } from '@test/factories/speciality.factory';

describe('Speciality', () => {
  it('should be able to create a speciality', () => {
    const speciality = makeSpeciality();
    expect(speciality).toBeTruthy();
  });
});
