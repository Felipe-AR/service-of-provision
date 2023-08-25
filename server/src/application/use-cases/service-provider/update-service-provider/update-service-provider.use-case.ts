import { Injectable } from '@nestjs/common';
import { FindServiceProviderUseCase } from '../find-service-provider/find-service-provider.use-case';
import { ServiceProviderRepository } from '@application/repositories';
import { ServiceProvider } from '@application/domain';

export interface UpdateServiceProviderUseCaseRequest {
  userId: string;
  coreBusinessId: string;
  companyName: string;
}

type UpdateServiceProviderUseCaseResponse = void;

@Injectable()
export class UpdateServiceProviderUseCase {
  constructor(
    private serviceProviderRepository: ServiceProviderRepository,
    private findServiceProviderUseCase: FindServiceProviderUseCase,
  ) {}

  async execute(
    request: UpdateServiceProviderUseCaseRequest,
  ): Promise<UpdateServiceProviderUseCaseResponse> {
    const { userId, ...serviceProviderRequest } = request;

    const { serviceProvider } = await this.findServiceProviderUseCase.execute({
      userId,
    });

    const updatedServiceProvider = new ServiceProvider(
      {
        ...serviceProviderRequest,
        cnpj: serviceProvider.cnpj,
      },
      serviceProvider.user.id,
    );

    await this.serviceProviderRepository.save(updatedServiceProvider);
  }
}
