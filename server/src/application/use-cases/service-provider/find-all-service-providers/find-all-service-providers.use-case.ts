import { Injectable } from '@nestjs/common';

import { ServiceProviderMapper } from '@application/mappers/service-provider-mapper';
import { ServiceProviderRepository } from '@application/repositories';

export interface FindAllServiceProvidersUseCaseResponse {
  serviceProviders: ServiceProviderMapper[];
}

@Injectable()
export class FindAllServiceProvidersUseCase {
  constructor(private serviceProviderRepository: ServiceProviderRepository) {}

  async execute(): Promise<FindAllServiceProvidersUseCaseResponse> {
    const serviceProviders = await this.serviceProviderRepository.findAll();
    return { serviceProviders };
  }
}
