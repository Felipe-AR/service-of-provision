import { Speciality } from '@application/domain';
import { SpecialityRepository } from '@application/repositories/speciality/speciality.repository';
import { FindServiceProviderUseCase } from '@application/use-cases/service-provider/find-service-provider/find-service-provider.use-case';
import { Injectable } from '@nestjs/common';

export interface FindAllSpecialitiesByUserUseCaseRequest {
  serviceProviderId: string;
}

export interface FindAllSpecialitiesByUserUseCaseResponse {
  specialities: Speciality[];
}

@Injectable()
export class FindAllSpecialitiesByUserUseCase {
  constructor(
    private specialityRepository: SpecialityRepository,
    private findServiceProviderUseCase: FindServiceProviderUseCase,
  ) {}

  async execute(
    request: FindAllSpecialitiesByUserUseCaseRequest,
  ): Promise<FindAllSpecialitiesByUserUseCaseResponse> {
    const { serviceProviderId } = request;

    const { serviceProvider } = await this.findServiceProviderUseCase.execute({
      userId: serviceProviderId,
    });

    const specialities = await this.specialityRepository.findAllByUser(
      serviceProvider.user.id,
    );

    return { specialities };
  }
}
