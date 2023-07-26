import { ServiceProvider } from '@application/domain/service-provider/service-provider.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class ServiceProviderRepository {
  abstract findByUser(id: string): Promise<ServiceProvider | null>;
  abstract findAll(): Promise<ServiceProvider[]>;
  abstract create(serviceProvider: ServiceProvider): Promise<ServiceProvider>;
  abstract save(serviceProvider: ServiceProvider): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
