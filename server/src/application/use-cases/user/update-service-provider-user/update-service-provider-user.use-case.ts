import { Gender } from '@application/domain';
import { UserRepository } from '@application/repositories';
import { UpdateServiceProviderUseCase } from '@application/use-cases/service-provider/update-service-provider/update-service-provider.use-case';
import { Injectable } from '@nestjs/common';

export interface UpdateServiceProviderUserUseCaseRequest {
  userId: string;
  coreBusinessId: string;
  companyName: string;
  phone: string;
}

type UpdateServiceProviderUserUseCaseResponse = void;

@Injectable()
export class UpdateServiceProviderUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private updateServiceProviderUseCase: UpdateServiceProviderUseCase,
  ) {}

  async execute(
    request: UpdateServiceProviderUserUseCaseRequest,
  ): Promise<UpdateServiceProviderUserUseCaseResponse> {
    await this.updateServiceProviderUseCase.execute(request);

    const user = await this.userRepository.find(request.userId);

    user.phone = request.phone;

    await this.userRepository.save(user);
  }
}
