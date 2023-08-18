import { Service } from '@application/domain';
import { ObjectNotFoundException } from '@application/exceptions';
import { ServiceRepository } from '@application/repositories';
import { FindServiceUseCase } from '../find-service/find-service.use-case';
import { FindServiceProviderUseCase } from '@application/use-cases/service-provider/find-service-provider/find-service-provider.use-case';
import { FindCategoryUseCase } from '@application/use-cases/category/find-category/find-category.use-case';
import { Injectable } from '@nestjs/common';

export interface UpdateServiceUseCaseRequest {
  id: string;
  serviceProviderId: string;
  categoryId: string;
  name: string;
  price: number;
}

type UpdateServiceUseCaseResponse = void;

@Injectable()
export class UpdateServiceUseCase {
  constructor(
    private serviceRepository: ServiceRepository,
    private findServiceUseCase: FindServiceUseCase,
    private findServiceProviderUseCase: FindServiceProviderUseCase,
    private findCategoryUseCase: FindCategoryUseCase,
  ) {}

  async execute(
    request: UpdateServiceUseCaseRequest,
  ): Promise<UpdateServiceUseCaseResponse> {
    const { id, ...updatedService } = request;

    const { service } = await this.findServiceUseCase.execute({ id });
    await this.findServiceProviderUseCase.execute({
      userId: updatedService.serviceProviderId,
    });
    await this.findCategoryUseCase.execute({
      id: updatedService.categoryId,
    });

    if (!service) {
      throw new ObjectNotFoundException('This service was not found.');
    }

    await this.serviceRepository.save(
      new Service({ ...updatedService, status: service.status }, service.id),
    );
  }
}
