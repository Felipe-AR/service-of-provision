import { Speciality } from '@application/domain';
import { Speciality as RawSpeciality } from '@prisma/client';

export class PrismaSpecialityMapper {
  static toPrisma(speciality: Speciality): RawSpeciality {
    return {
      id: speciality.id,
      serviceProviderUserId: speciality.serviceProviderId,
      name: speciality.name,
      description: speciality.description,
    };
  }

  static toDomain(rawSpeciality: RawSpeciality): Speciality {
    return new Speciality(
      {
        name: rawSpeciality.name,
        serviceProviderId: rawSpeciality.serviceProviderUserId,
        description: rawSpeciality.description,
      },
      rawSpeciality.id,
    );
  }
}
