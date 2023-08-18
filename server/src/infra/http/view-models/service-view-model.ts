import { Service } from '@application/domain';
import { ServiceStatus } from '@prisma/client';

export interface ServiceDTO {
  id: string;
  serviceProviderId: string;
  categoryId: string;
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
}
