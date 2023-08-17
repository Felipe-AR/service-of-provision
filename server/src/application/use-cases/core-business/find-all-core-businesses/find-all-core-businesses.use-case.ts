import { Injectable } from '@nestjs/common';

import { CoreBusiness } from '@application/domain';
import { CoreBusinessRepository } from '@application/repositories/core-business/core-business.repository';

export interface FindAllCoreBusinessesUseCaseResponse {
  coreBusinesses: CoreBusiness[];
}

@Injectable()
export class FindAllCoreBusinessesUseCase {
  constructor(private coreBusinessRepository: CoreBusinessRepository) {}

  async execute(): Promise<FindAllCoreBusinessesUseCaseResponse> {
    const coreBusinesses = await this.coreBusinessRepository.findAll();
    return { coreBusinesses };
  }
}
