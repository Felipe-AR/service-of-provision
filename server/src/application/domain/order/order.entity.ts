import { randomUUID } from 'crypto';
import { Service } from '../service/service.entity';
import { OrderStatus } from './order-status.enum';

export interface OrderProperties {
  customerId: string;
  serviceProviderId: string;
  selectedAddressId: string;
  services?: Service[];
  status: OrderStatus;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Order {
  public readonly id: string;
  private properties: OrderProperties;

  constructor(properties: OrderProperties, id?: string) {
    this.id = id ?? randomUUID();
    this.properties = {
      ...properties,
      createdAt: properties.createdAt ?? new Date(),
      updatedAt: properties.updatedAt ?? new Date(),
    };
  }

  public get customerId(): string {
    return this.properties.customerId;
  }

  public set customerId(customerId: string) {
    this.properties.customerId = customerId;
  }

  public get serviceProviderId(): string {
    return this.properties.serviceProviderId;
  }

  public set serviceProviderId(serviceProviderId: string) {
    this.properties.serviceProviderId = serviceProviderId;
  }

  public get selectedAddressId(): string {
    return this.properties.selectedAddressId;
  }

  public set selectedAddressId(selectedAddressId: string) {
    this.properties.selectedAddressId = selectedAddressId;
  }

  public get services(): Service[] {
    return this.properties.services;
  }

  public set services(services: Service[]) {
    this.properties.services = services;
  }

  public get status(): OrderStatus {
    return this.properties.status;
  }

  public set status(status: OrderStatus) {
    this.properties.status = status;
  }

  public get price(): number {
    return this.properties.price;
  }

  public set price(price: number) {
    this.properties.price = price;
  }

  public get createdAt(): Date {
    return this.properties.createdAt;
  }

  public set createdAt(createdAt: Date) {
    this.properties.createdAt = createdAt;
  }

  public get updatedAt(): Date {
    return this.properties.updatedAt;
  }

  public set updatedAt(updatedAt: Date) {
    this.properties.updatedAt = updatedAt;
  }
}
