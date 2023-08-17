import { Address, Customer, ServiceProvider, OrderStatus, Service } from ".";

export class Order {
  id: string;
  customer: Customer;
  selectedAddress: Address;
  serviceProvider: ServiceProvider;
  services: Service[];
  status: OrderStatus;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}