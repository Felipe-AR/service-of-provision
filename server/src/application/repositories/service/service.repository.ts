import { Injectable } from '@nestjs/common';

import { Service } from '@application/domain/service/service.entity';

@Injectable()
export abstract class ServiceRepository {
  abstract find(id: string): Promise<Service | null>;
  abstract findAll(): Promise<Service[]>;
  abstract findAllByIdIn(servicesIds: string[]): Promise<Service[]>;
  abstract create(service: Service): Promise<Service>;
  abstract save(service: Service): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
