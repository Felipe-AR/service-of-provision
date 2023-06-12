import { ServiceStatus } from '@application/domain/service/service-status.enum';
import {
  Service,
  ServiceProperties,
} from '@application/domain/service/service.entity';

export function makeService(override?: ServiceProperties) {
  return new Service({
    serviceProviderId: 'fake-service-provider-id',
    categoryId: 'fake-category-id',
    name: 'fake-service-name',
    price: 10.0,
    status: ServiceStatus.ACTIVE,
    ...override,
  });
}
