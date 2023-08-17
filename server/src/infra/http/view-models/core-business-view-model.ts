import { CoreBusiness } from '@application/domain';

export interface CoreBusinessDTO {
  id: string;
  name: string;
  description: string;
}

export class CoreBusinessViewModel {
  static toHTTP(coreBusiness: CoreBusiness) {
    return {
      id: coreBusiness.id,
      name: coreBusiness.name,
      description: coreBusiness.description,
    };
  }
}
