import {
  CoreBusiness,
  Speciality,
  Service,
  ServiceProvider,
  User,
} from '@application/domain';

type ServiceProviderMapperProperties = Omit<
  ServiceProvider,
  'coreBusinessId' | 'userId'
> & { user: User; coreBusiness: CoreBusiness };

export class ServiceProviderMapper {
  user: User;
  coreBusiness: CoreBusiness;
  companyName: string;
  cnpj: string;
  services: Service[];
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
