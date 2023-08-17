import { Injectable } from '@nestjs/common';

import { ServiceStatus } from '@application/domain/service/service-status.enum';
import { Service } from '@application/domain/service/service.entity';
import { ServiceRepository } from '@application/repositories/service/service.repository';

export interface CreateServiceUseCaseRequest {
  serviceProviderId: string;
  categoryId: string;
  name: string;
  price: number;
}

export interface CreateServiceUseCaseResponse {
  service: Service;
}

@Injectable()
export class CreateServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(
    request: CreateServiceUseCaseRequest,
  ): Promise<CreateServiceUseCaseResponse> {
    const service = new Service({ ...request, status: ServiceStatus.ACTIVE });

    const createdService = await this.serviceRepository.create(service);

    return { service: createdService };
  }
}
