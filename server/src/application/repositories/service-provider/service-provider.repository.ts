import { Injectable } from '@nestjs/common';

import { ServiceProvider } from '@application/domain/service-provider/service-provider.entity';
import { ServiceProviderMapper } from '@application/mappers/service-provider-mapper';

@Injectable()
export abstract class ServiceProviderRepository {
  abstract findByUser(userId: string): Promise<ServiceProviderMapper | null>;
  abstract findAll(): Promise<ServiceProviderMapper[]>;
  abstract create(
    serviceProvider: ServiceProvider,
  ): Promise<ServiceProviderMapper>;
  abstract save(serviceProvider: ServiceProvider): Promise<void>;
  abstract delete(userId: string): Promise<void>;
}
