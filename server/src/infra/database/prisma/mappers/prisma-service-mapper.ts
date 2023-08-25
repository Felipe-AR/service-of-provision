import { Service } from '@application/domain';
import { Service as RawService, Category as RawCategory } from '@prisma/client';
import { PrismaServiceStatusMapper } from './prisma-service-status-mapper';
import { ServiceMapper } from '@application/mappers';
import { PrismaCategoryMapper } from './prisma-category-mapper';

export type RawServiceWithRelations = RawService & { category: RawCategory };

export class PrismaServiceMapper {
  static toPrisma(service: Service): RawService {
    return {
      id: service.id,
      serviceProviderUserId: service.serviceProviderId,
      categoryId: service.categoryId,
      name: service.name,
      price: service.price,
      status: service.status,
    };
  }

  static toDomain(rawService: RawService): Service {
    return new Service(
      {
        serviceProviderId: rawService.serviceProviderUserId,
        categoryId: rawService.categoryId,
        name: rawService.name,
        price: rawService.price,
        status: PrismaServiceStatusMapper.toDomain(rawService.status),
      },
      rawService.id,
    );
  }

  static toDomainWithRelations(
    rawService: RawServiceWithRelations,
  ): ServiceMapper {
    return new ServiceMapper({
      id: rawService.id,
      serviceProviderId: rawService.serviceProviderUserId,
      category: PrismaCategoryMapper.toDomain(rawService.category),
      name: rawService.name,
      price: rawService.price,
      status: PrismaServiceStatusMapper.toDomain(rawService.status),
    });
  }
}
