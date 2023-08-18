import {
  Customer,
  Order,
  ServiceProvider,
  Address,
  Service,
  OrderStatus,
} from '@application/domain';

type OrderMapperProperties = Omit<
  Order,
  'customerId' | 'serviceProviderId' | 'selectedAddressId'
> & {
  customer: Customer;
  serviceProvider: ServiceProvider;
  selectedAddress: Address;
};

export class OrderMapper {
  id: string;
  customer: Customer;
  serviceProvider: ServiceProvider;
  selectedAddress: Address;
  services: Service[];
  price: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(properties: OrderMapperProperties) {
    this.id = properties.id;
    this.customer = properties.customer;
    this.serviceProvider = properties.serviceProvider;
    this.selectedAddress = properties.selectedAddress;
    this.services = properties.services;
    this.price = properties.price;
    this.status = properties.status;
    this.createdAt = properties.createdAt;
    this.updatedAt = properties.updatedAt;
  }
}
