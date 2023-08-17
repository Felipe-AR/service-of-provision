import { CoreBusiness, Service, Speciality } from ".";

export class ServiceProvider {
  id: string;
  companyName: string;
  cnpj: string;
  coreBusiness: CoreBusiness;
  speciality: Speciality[];
  services: Service[];
}