import { CoreBusiness } from '@application/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class CoreBusinessRepository {
  abstract find(id: string): Promise<CoreBusiness | null>;
  abstract findAll(): Promise<CoreBusiness[]>;
  abstract create(coreBusiness: CoreBusiness): Promise<CoreBusiness>;
  abstract save(coreBusiness: CoreBusiness): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
