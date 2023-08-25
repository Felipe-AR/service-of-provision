import { Injectable } from '@nestjs/common';

import { ServiceStatus } from '@application/domain/service/service-status.enum';
import { Service } from '@application/domain/service/service.entity';
import { ServiceRepository } from '@application/repositories/service/service.repository';
import { FindServiceProviderUseCase } from '@application/use-cases/service-provider/find-service-provider/find-service-provider.use-case';
import { FindCategoryUseCase } from '@application/use-cases/category/find-category/find-category.use-case';

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
  constructor(
    private serviceRepository: ServiceRepository,
    private findServiceProviderUseCase: FindServiceProviderUseCase,
    private findCategoryUseCase: FindCategoryUseCase,
  ) {}

  async execute(
    request: CreateServiceUseCaseRequest,
  ): Promise<CreateServiceUseCaseResponse> {
    await this.findServiceProviderUseCase.execute({
      userId: request.serviceProviderId,
    });

    await this.findCategoryUseCase.execute({ id: request.categoryId });

    const service = new Service({ ...request, status: ServiceStatus.ACTIVE });

    const createdService = await this.serviceRepository.create(service);

    return { service: createdService };
  }
}
