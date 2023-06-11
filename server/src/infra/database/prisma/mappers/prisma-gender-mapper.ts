import { Gender } from '@application/domain/customer/gender.enum';
import { Gender as RawGender } from '@prisma/client';

export class PrismaGenderMapper {
  static toPrisma(gender: Gender): RawGender {
    return RawGender[gender];
  }

  static toDomain(rawGender: RawGender): Gender {
    return Gender[rawGender];
  }
}
