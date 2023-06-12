import { randomUUID } from 'crypto';
import { ServiceStatus } from './service-status.enum';

export interface ServiceProperties {
  serviceProviderId: string;
  categoryId: string;
  name: string;
  price: number;
  status: ServiceStatus;
}

export class Service {
  public readonly id: string;
  private properties: ServiceProperties;

  constructor(properties: ServiceProperties, id?: string) {
    this.id = id ?? randomUUID();
    this.properties = properties;
  }

  public get serviceProviderId(): string {
    return this.properties.serviceProviderId;
  }

  public set serviceProviderId(serviceProviderId: string) {
    this.properties.serviceProviderId = serviceProviderId;
  }

  public get categoryId(): string {
    return this.properties.categoryId;
  }

  public set categoryId(categoryId: string) {
    this.properties.categoryId = categoryId;
  }

  public get name(): string {
    return this.properties.name;
  }

  public set name(name: string) {
    this.properties.name = name;
  }

  public get price(): number {
    return this.properties.price;
  }

  public set price(price: number) {
    this.properties.price = price;
  }

  public get status(): ServiceStatus {
    return this.properties.status;
  }

  public set status(status: ServiceStatus) {
    this.properties.status = status;
  }
}
