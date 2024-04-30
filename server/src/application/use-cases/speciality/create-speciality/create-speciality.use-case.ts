import { Speciality } from '@application/domain';
import { SpecialityRepository } from '@application/repositories/speciality/speciality.repository';
import { FindServiceProviderUseCase } from '@application/use-cases/service-provider/find-service-provider/find-service-provider.use-case';
import { Injectable } from '@nestjs/common';

export interface CreateSpecialityUseCaseRequest {
  serviceProviderId: string;
  name: string;
  description: string;
}

export interface CreateSpecialityUseCaseResponse {
  speciality: Speciality;
}

@Injectable()
export class CreateSpecialityUseCase {
  constructor(
    private findServiceProviderUseCase: FindServiceProviderUseCase,
    private specialityRepository: SpecialityRepository,
  ) {}

  async execute(
    request: CreateSpecialityUseCaseRequest,
  ): Promise<CreateSpecialityUseCaseResponse> {
    const { serviceProviderId, ...specialityRequest } = request;

    const { serviceProvider } = await this.findServiceProviderUseCase.execute({
      userId: serviceProviderId,
    });

    const speciality = new Speciality({
      serviceProviderId: serviceProvider.user.id,
      ...specialityRequest,
    });

    const createdSpeciality = await this.specialityRepository.create(
      speciality,
    );

    return { speciality: createdSpeciality };
  }
}
