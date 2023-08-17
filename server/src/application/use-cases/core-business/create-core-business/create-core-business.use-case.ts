import { Injectable } from '@nestjs/common';

import { CoreBusiness } from '@application/domain';
import { CoreBusinessRepository } from '@application/repositories/core-business/core-business.repository';

export interface CreateCoreBusinessUseCaseRequest {
  name: string;
  description: string;
}

export interface CreateCoreBusinessUseCaseResponse {
  coreBusiness: CoreBusiness;
}

@Injectable()
export class CreateCoreBusinessUseCase {
  constructor(private coreBusinessRepository: CoreBusinessRepository) {}

  async execute(
    request: CreateCoreBusinessUseCaseRequest,
  ): Promise<CreateCoreBusinessUseCaseResponse> {
    const coreBusiness = new CoreBusiness(request);

    const createdCoreBusiness = await this.coreBusinessRepository.create(
      coreBusiness,
    );

    return { coreBusiness: createdCoreBusiness };
  }
}
