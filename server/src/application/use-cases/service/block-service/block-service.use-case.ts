import { ServiceRepository } from '@application/repositories';
import { FindServiceUseCase } from '../find-service/find-service.use-case';
import { Service, ServiceStatus } from '@application/domain';
import { Injectable } from '@nestjs/common';

export interface BlockServiceUseCaseRequest {
  id: string;
}

type BlockServiceUseCaseResponse = void;

@Injectable()
export class BlockServiceUseCase {
  constructor(
    private serviceRepository: ServiceRepository,
    private findServiceUseCase: FindServiceUseCase,
  ) {}

  async execute(
    request: BlockServiceUseCaseRequest,
  ): Promise<BlockServiceUseCaseResponse> {
    const { id } = request;
    const { service } = await this.findServiceUseCase.execute({ id });

    await this.serviceRepository.save(
      new Service(
        {
          serviceProviderId: service.serviceProviderId,
          categoryId: service.categoryId,
          name: service.name,
          price: service.price,
          status: ServiceStatus.BLOCKED,
        },
        service.id,
      ),
    );
  }
}
