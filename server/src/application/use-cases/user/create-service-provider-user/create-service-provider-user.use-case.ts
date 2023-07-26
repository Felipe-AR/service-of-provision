import { ServiceProviderRepository } from '@application/repositories/service-provider/service-provider.repository';
import {
  CreateUserUseCase,
  CreateUserUseCaseRequest,
} from '../create-user/create-user.use-case';
import { Role } from '@application/domain/user/role.enum';
import { ServiceProvider } from '@application/domain/service-provider/service-provider.entity';

export interface CreateServiceProviderUserUseCaseRequest
  extends Omit<CreateUserUseCaseRequest, 'role'> {
  coreBusinessId: string;
  companyName: string;
  cnpj: string;
}

export interface CreateServiceProviderUserUseCaseResponse {
  serviceProvider: ServiceProvider;
}

export class CreateServiceProviderUserUseCase {
  constructor(
    private serviceProviderRepository: ServiceProviderRepository,
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async execute(
    request: CreateServiceProviderUserUseCaseRequest,
  ): Promise<CreateServiceProviderUserUseCaseResponse> {
    const { user } = await this.createUserUseCase.execute({
      email: request.email,
      password: request.password,
      phone: request.phone,
      role: Role.SERVICE_PROVIDER,
      addresses: request.addresses,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt,
    });

    const serviceProvider = new ServiceProvider({
      cnpj: request.cnpj,
      companyName: request.companyName,
      coreBusinessId: request.coreBusinessId,
    });

    await this.serviceProviderRepository.create(serviceProvider);

    return { serviceProvider };
  }
}
