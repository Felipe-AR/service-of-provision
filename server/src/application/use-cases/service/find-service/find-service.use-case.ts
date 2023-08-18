import { Service } from '@application/domain';
import { ObjectNotFoundException } from '@application/exceptions';
import { ServiceRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';

export interface FindServiceUseCaseRequest {
  id: string;
}

export interface FindServiceUseCaseResponse {
  service: Service;
}

@Injectable()
export class FindServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(
    request: FindServiceUseCaseRequest,
  ): Promise<FindServiceUseCaseResponse> {
    const { id } = request;
    const service = await this.serviceRepository.find(id);

    if (!service) {
      throw new ObjectNotFoundException('Service was not found.');
    }

    return { service };
  }
}
