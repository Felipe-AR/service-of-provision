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
      throw new ObjectNotFoundException(
        'O prestador de serviço não foi encontrado.',
      );
    }

    return { serviceProvider };
  }
}
