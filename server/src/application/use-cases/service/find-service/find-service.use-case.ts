import { Service } from '@application/domain';
import { ServiceRepository } from '@application/repositories';

export interface FindServiceUseCaseRequest {
  id: string;
}

export interface FindServiceUseCaseResponse {
  service: Service;
}

export class FindServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(
    request: FindServiceUseCaseRequest,
  ): Promise<FindServiceUseCaseResponse> {
    const { id } = request;
    const service = await this.serviceRepository.find(id);
    return { service };
  }
}
