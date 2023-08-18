import { ObjectNotFoundException } from '@application/exceptions';
import { ServiceProviderMapper } from '@application/mappers/service-provider-mapper';
import { ServiceProviderRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';

export interface FindServiceProviderUseCaseRequest {
  userId: string;
}

export interface FindServiceProviderUseCaseResponse {
  serviceProvider: ServiceProviderMapper;
}

@Injectable()
export class FindServiceProviderUseCase {
  constructor(private serviceProviderRepository: ServiceProviderRepository) {}

  async execute(request: FindServiceProviderUseCaseRequest) {
    const { userId } = request;
    const serviceProvider = await this.serviceProviderRepository.findByUser(
      userId,
    );

    if (!serviceProvider) {
      throw new ObjectNotFoundException('Service Provider was not found.');
    }

    return { serviceProvider };
  }
}
