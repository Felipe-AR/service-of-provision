import { ServiceProvider } from '@application/domain/service-provider/service-provider.entity';
import { Gender } from '@prisma/client';

export interface ServiceProviderDTO {
  coreBusinessId: string;
  companyName: string;
  cnpj: string;
  speciality?: Speciality[];
  services?: Service[];
}

export class ServiceProviderViewModel {
  static toHTTP(serviceProvider: ServiceProvider): ServiceProviderDTO {
    return {
      coreBusinessId: serviceProvider.coreBusinessId;
      companyName: string;
      cnpj: string;
      speciality?: Speciality[];
      services?: Service[];
    };
  }
}
