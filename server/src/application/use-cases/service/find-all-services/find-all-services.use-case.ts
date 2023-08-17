import { Service } from '@application/domain';
import { ServiceRepository } from '@application/repositories';

export interface FindAllServicesUseCaseResponse {
  services: Service[];
}

export class FindAllServicesUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(): Promise<FindAllServicesUseCaseResponse> {
    const services = await this.serviceRepository.findAll();
    return { services };
  }
}
