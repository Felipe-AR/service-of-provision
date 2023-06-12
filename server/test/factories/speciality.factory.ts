import {
  Speciality,
  SpecialityProperties,
} from '@application/domain/speciality/speciality.entity';

export function makeSpeciality(
  override?: Partial<SpecialityProperties>,
): Speciality {
  return new Speciality({
    name: 'Pintor',
    description: 'Lorem ipsum dolor sit amet, consectetur adip',
    ...override,
  });
}
