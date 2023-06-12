import { randomUUID } from 'crypto';
import { Speciality } from '../speciality/speciality.entity';
import { Service } from '../service/service.entity';

export interface ServiceProviderProperties {
  coreBusinessId: string;
  companyName: string;
  cnpj: string;
  speciality?: Speciality[];
  services?: Service[];
}

export class ServiceProvider {
  public readonly id: string;
  private properties: ServiceProviderProperties;

  constructor(properties: ServiceProviderProperties, id?: string) {
    this.id = id ?? randomUUID();
    this.properties = properties;
  }

  public get coreBusinessId(): string {
    return this.properties.coreBusinessId;
  }

  public set coreBusinessId(coreBusinessId: string) {
    this.properties.coreBusinessId = coreBusinessId;
  }

  public get companyName(): string {
    return this.properties.companyName;
  }

  public set companyName(companyName: string) {
    this.properties.companyName = companyName;
  }

  public get cnpj(): string {
    return this.properties.cnpj;
  }

  public set cnpj(cnpj: string) {
    this.properties.cnpj = cnpj;
  }

  public get speciality(): Speciality[] {
    return this.properties.speciality;
  }

  public set speciality(speciality: Speciality[]) {
    this.properties.speciality = speciality;
  }

  public get services(): Service[] {
    return this.properties.services;
  }

  public set services(services: Service[]) {
    this.properties.services = services;
  }
}
