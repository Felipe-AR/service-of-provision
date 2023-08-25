import { Category, Service, ServiceStatus } from '@application/domain';
import { ServiceProviderMapper } from './service-provider-mapper';

type ServiceMapperProperties = Omit<Service, 'categoryId'> & {
  category: Category;
};

export class ServiceMapper {
  id: string;
  serviceProviderId: string;
  category: Category;
  name: string;
  price: number;
  status: ServiceStatus;

  constructor(properties: ServiceMapperProperties) {
    this.id = properties.id;
    this.serviceProviderId = properties.serviceProviderId;
    this.category = properties.category;
    this.name = properties.name;
    this.price = properties.price;
    this.status = properties.status;
  }
}
