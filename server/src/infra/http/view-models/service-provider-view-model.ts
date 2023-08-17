import { ServiceProviderMapper } from '@application/mappers/service-provider-mapper';
import { SpecialityDTO, SpecialityViewModel } from './speciality-view-model';
import { ServiceDTO, ServiceViewModel } from './service-view-model';
import {
  CoreBusinessDTO,
  CoreBusinessViewModel,
} from './core-business-view-model';
import { UserDTO, UserViewModel } from './user-view-model';

export interface ServiceProviderDTO {
  user: UserDTO;
  coreBusiness: CoreBusinessDTO;
  companyName: string;
  cnpj: string;
  specialities: SpecialityDTO[];
  services: ServiceDTO[];
}

export class ServiceProviderViewModel {
  static toHTTP(serviceProvider: ServiceProviderMapper): ServiceProviderDTO {
    return {
      user: UserViewModel.toHTTP(serviceProvider.user),
      coreBusiness: CoreBusinessViewModel.toHTTP(serviceProvider.coreBusiness),
      companyName: serviceProvider.companyName,
      cnpj: serviceProvider.cnpj,
      specialities: serviceProvider.specialities.map(
        SpecialityViewModel.toHTTP,
      ),
      services: serviceProvider.services.map(ServiceViewModel.toHTTP),
    };
  }
}
