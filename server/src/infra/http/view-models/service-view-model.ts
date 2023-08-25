import { Category, Service } from '@application/domain';
import { ServiceMapper } from '@application/mappers';
import { ServiceStatus } from '@prisma/client';
import { CategoryDTO, CategoryViewModel } from './category-view-model';

export interface ServiceDTO {
  id: string;
  serviceProviderId: string;
  categoryId: string;
  name: string;
  price: number;
  status: ServiceStatus;
}

export interface ServiceMapperDTO {
  id: string;
  serviceProviderId: string;
  category: CategoryDTO;
  name: string;
  price: number;
  status: ServiceStatus;
}

export class ServiceViewModel {
  static toHTTP(service: Service): ServiceDTO {
    return {
      id: service.id,
      serviceProviderId: service.serviceProviderId,
      categoryId: service.categoryId,
      name: service.name,
      price: service.price,
      status: service.status,
    };
  }

  static mapperToHTTP(service: ServiceMapper): ServiceMapperDTO {
    return {
      id: service.id,
      serviceProviderId: service.serviceProviderId,
      category: CategoryViewModel.toHTTP(service.category),
      name: service.name,
      price: service.price,
      status: service.status,
    };
  }
}
