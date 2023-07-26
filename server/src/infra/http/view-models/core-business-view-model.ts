import { CoreBusiness } from '@application/domain/core-business/core-business.entity';
import { Gender } from '@prisma/client';

export interface CoreBusinessDTO {
  coreBusinessId: string;
  companyName: string;
  cnpj: string;
  speciality?: Speciality[];
  services?: Service[];
}

export class CoreBusinessViewModel {
  static toHTTP(serviceProvider: CoreBusiness): CoreBusinessDTO {
    return {
      coreBusinessId: serviceProvider.coreBusinessId;
      companyName: string;
      cnpj: string;
      speciality?: Speciality[];
      services?: Service[];
    };
  }
}
