import { Category, ServiceStatus } from '@application/domain';
import { ServiceProviderMapper } from './service-provider-mapper';

export class ServiceMapper {
  serviceProvider: ServiceProviderMapper;
  category: Category;
  name: string;
  price: string;
  status: ServiceStatus;
}
