import { ServiceRepository } from '@application/repositories';
import { FindServiceUseCase } from '../find-service/find-service.use-case';
import { Service, ServiceStatus } from '@application/domain';
import { Injectable } from '@nestjs/common';

export interface ActivateServiceUseCaseRequest {
  id: string;
}

type ActivateServiceUseCaseResponse = void;

@Injectable()
export class ActivateServiceUseCase {
  constructor(
    private serviceRepository: ServiceRepository,
    private findServiceUseCase: FindServiceUseCase,
  ) {}

  async execute(
    request: ActivateServiceUseCaseRequest,
  ): Promise<ActivateServiceUseCaseResponse> {
    const { id } = request;
    const { service } = await this.findServiceUseCase.execute({ id });

    await this.serviceRepository.save(
      new Service(
        {
          serviceProviderId: service.serviceProviderId,
          categoryId: service.categoryId,
          name: service.name,
          price: service.price,
          status: ServiceStatus.ACTIVE,
        },
        service.id,
      ),
    );
  }
}
