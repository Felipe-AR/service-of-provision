import { CoreBusiness, Service, Speciality, User } from '.';

export class ServiceProvider {
  user: User;
  coreBusiness: CoreBusiness;
  companyName: string;
  cnpj: string;
  specialities: Speciality[];
  services: Service[];
}
