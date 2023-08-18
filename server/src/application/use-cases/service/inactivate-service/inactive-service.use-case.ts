import { ServiceRepository } from '@application/repositories';
import { FindServiceUseCase } from '../find-service/find-service.use-case';
import { Service, ServiceStatus } from '@application/domain';
import { Injectable } from '@nestjs/common';

export interface InactivateServiceUseCaseRequest {
  id: string;
}

type InactivateServiceUseCaseResponse = void;

@Injectable()
export class InactivateServiceUseCase {
  constructor(
    private serviceRepository: ServiceRepository,
    private findServiceUseCase: FindServiceUseCase,
  ) {}

  async execute(
    request: InactivateServiceUseCaseRequest,
  ): Promise<InactivateServiceUseCaseResponse> {
    const { id } = request;
    const { service } = await this.findServiceUseCase.execute({ id });

    await this.serviceRepository.save(
      new Service(
        {
          serviceProviderId: service.serviceProviderId,
          categoryId: service.categoryId,
          name: service.name,
          price: service.price,
          status: ServiceStatus.INACTIVE,
        },
        service.id,
      ),
    );
  }
}
