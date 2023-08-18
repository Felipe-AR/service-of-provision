import { Service } from '@application/domain';
import { ServiceRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';

export interface FindAllServicesUseCaseResponse {
  services: Service[];
}

@Injectable()
export class FindAllServicesUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(): Promise<FindAllServicesUseCaseResponse> {
    const services = await this.serviceRepository.findAll();
    return { services };
  }
}
