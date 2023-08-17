import { Injectable } from '@nestjs/common';

import { CoreBusiness } from '@application/domain';
import { ObjectNotFoundException } from '@application/exceptions';
import { CoreBusinessRepository } from '@application/repositories/core-business/core-business.repository';

export interface FindCoreBusinessUseCaseRequest {
  id: string;
}

export interface FindCoreBusinessUseCaseResponse {
  coreBusiness: CoreBusiness;
}

@Injectable()
export class FindCoreBusinessUseCase {
  constructor(private coreBusinessRepository: CoreBusinessRepository) {}

  async execute(
    request: FindCoreBusinessUseCaseRequest,
  ): Promise<FindCoreBusinessUseCaseResponse> {
    const { id } = request;

    const coreBusiness = await this.coreBusinessRepository.find(id);

    if (!coreBusiness) {
      throw new ObjectNotFoundException('Core business was not found.');
    }

    return { coreBusiness };
  }
}
