import {
  CoreBusiness,
  Speciality,
  Service,
  ServiceProvider,
  User,
} from '@application/domain';
import { ServiceMapper } from './service.mapper';

type ServiceProviderMapperProperties = Omit<
  ServiceProvider,
  'coreBusinessId' | 'userId' | 'services'
> & { user: User; coreBusiness: CoreBusiness; services: ServiceMapper[] };

export class ServiceProviderMapper {
  user: User;
  coreBusiness: CoreBusiness;
  companyName: string;
  cnpj: string;
  services: ServiceMapper[];
  specialities: Speciality[];

  constructor(properties: ServiceProviderMapperProperties) {
    this.user = properties.user;
    this.coreBusiness = properties.coreBusiness;
    this.companyName = properties.companyName;
    this.cnpj = properties.cnpj;
    this.specialities = properties.specialities;
    this.services = properties.services;
  }
}
