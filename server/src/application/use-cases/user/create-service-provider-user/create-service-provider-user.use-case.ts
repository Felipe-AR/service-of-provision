import { ServiceProviderRepository } from '@application/repositories/service-provider/service-provider.repository';
import {
  CreateUserUseCase,
  CreateUserUseCaseRequest,
} from '../create-user/create-user.use-case';
import { Role } from '@application/domain/user/role.enum';
import { ServiceProvider } from '@application/domain/service-provider/service-provider.entity';
import { Injectable } from '@nestjs/common';
import { User } from '@application/domain/user/user.entity';
import { FindCoreBusinessUseCase } from '@application/use-cases/core-business/find-core-business/find-core-business.use-case';

export interface CreateServiceProviderUserUseCaseRequest
  extends Omit<CreateUserUseCaseRequest, 'role'> {
  coreBusinessId: string;
  companyName: string;
  cnpj: string;
}

export interface CreateServiceProviderUserUseCaseResponse {
  user: User;
}

@Injectable()
export class CreateServiceProviderUserUseCase {
  constructor(
    private serviceProviderRepository: ServiceProviderRepository,
    private createUserUseCase: CreateUserUseCase,
    private findCoreBusinessUseCase: FindCoreBusinessUseCase,
  ) {}

  async execute(
    request: CreateServiceProviderUserUseCaseRequest,
  ): Promise<CreateServiceProviderUserUseCaseResponse> {
    await this.findCoreBusinessUseCase.execute({
      id: request.coreBusinessId,
    });

    const { user } = await this.createUserUseCase.execute({
      ...request,
      role: Role.SERVICE_PROVIDER,
    });

    const serviceProvider = new ServiceProvider(
      {
        cnpj: request.cnpj,
        companyName: request.companyName,
        coreBusinessId: request.coreBusinessId,
      },
      user.id,
    );

    await this.serviceProviderRepository.create(serviceProvider);

    return { user };
  }
}
