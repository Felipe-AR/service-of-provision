import { Injectable } from '@nestjs/common';
import { FindServiceProviderUseCase } from '../find-service-provider/find-service-provider.use-case';
import {
  ServiceProviderRepository,
  UserRepository,
} from '@application/repositories';
import { ServiceProvider } from '@application/domain';

export interface UpdateServiceProviderUseCaseRequest {
  userId: string;
  coreBusinessId: string;
  companyName: string;
  phone: string;
}

type UpdateServiceProviderUseCaseResponse = void;

@Injectable()
export class UpdateServiceProviderUseCase {
  constructor(
    private userRepository: UserRepository,
    private serviceProviderRepository: ServiceProviderRepository,
    private findServiceProviderUseCase: FindServiceProviderUseCase,
  ) {}

  async execute(
    request: UpdateServiceProviderUseCaseRequest,
  ): Promise<UpdateServiceProviderUseCaseResponse> {
    const { userId, phone, ...serviceProviderRequest } = request;

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

    const user = await this.userRepository.find(serviceProvider.user.id);

    user.phone = phone;

    await this.userRepository.save(user);
    await this.serviceProviderRepository.save(updatedServiceProvider);
  }
}
