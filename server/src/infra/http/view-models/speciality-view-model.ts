import { Speciality } from '@application/domain/speciality/speciality.entity';

export class SpecialityDTO {
  id: string;
  serviceProviderId: string;
  name: string;
  description: string;
}

export class SpecialityViewModel {
  static toHTTP(speciality: Speciality): SpecialityDTO {
    return {
      id: speciality.id,
      serviceProviderId: speciality.serviceProviderId,
      name: speciality.name,
      description: speciality.description,
    };
  }
}
