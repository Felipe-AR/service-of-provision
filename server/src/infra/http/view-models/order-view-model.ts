import { OrderMapper } from '@application/mappers/order-mapper';
import { CustomerDTO } from './customer-view-model';
import {
  ServiceProviderDTO,
  ServiceProviderViewModel,
} from './service-provider-view-model';
import { AddressDTO } from './address-view-model';
import { ServiceDTO, ServiceViewModel } from './service-view-model';
import { OrderStatus } from '@application/domain';

export interface OrderDTO {
  id: string;
  // customer: CustomerDTO;
  // serviceProvider: ServiceProviderDTO;
  // selectedAddress: AddressDTO;
  services: ServiceDTO[];
  price: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class OrderViewModel {
  static toHTTP(order: OrderMapper): OrderDTO {
    return {
      id: order.id,
      // customer: order.customer,
      // serviceProvider: ServiceProviderViewModel.toHTTP(order.serviceProvider),
      // selectedAddress: order.selectedAddress,
      services: order.services.map(ServiceViewModel.toHTTP),
      price: order.price,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
