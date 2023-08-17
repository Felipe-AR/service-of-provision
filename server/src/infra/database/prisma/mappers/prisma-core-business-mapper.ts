import { CoreBusiness } from '@application/domain';
import { CoreBusiness as RawCoreBusiness } from '@prisma/client';

export class PrismaCoreBusinessMapper {
  static toPrisma(coreBusiness: CoreBusiness): RawCoreBusiness {
    return {
      id: coreBusiness.id,
      name: coreBusiness.name,
      description: coreBusiness.description,
    };
  }

  static toDomain(rawCoreBusiness: RawCoreBusiness): CoreBusiness {
    return new CoreBusiness(
      {
        name: rawCoreBusiness.name,
        description: rawCoreBusiness.description,
      },
      rawCoreBusiness.id,
    );
  }
}
