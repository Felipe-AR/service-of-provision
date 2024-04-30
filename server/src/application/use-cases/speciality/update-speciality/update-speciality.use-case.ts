import { SpecialityRepository } from '@application/repositories/speciality/speciality.repository';
import { FindServiceProviderUseCase } from '@application/use-cases/service-provider/find-service-provider/find-service-provider.use-case';
import { FindSpecialityUseCase } from '../find-speciality/find-speciality.use-case';
import { Speciality } from '@application/domain';
import { Injectable } from '@nestjs/common';

export interface UpdateSpecialityUseCaseRequest {
  id: string;
  serviceProviderId: string;
  name: string;
  description: string;
}

type UpdateSpecialityUseCaseResponse = void;

@Injectable()
export class UpdateSpecialityUseCase {
  constructor(
    private specialityRepository: SpecialityRepository,
    private findSpecialityUseCase: FindSpecialityUseCase,
    private findServiceProviderUseCase: FindServiceProviderUseCase,
  ) {}

  async execute(
    request: UpdateSpecialityUseCaseRequest,
  ): Promise<UpdateSpecialityUseCaseResponse> {
    const { id, serviceProviderId, ...updatedSpeciality } = request;

    const { serviceProvider } = await this.findServiceProviderUseCase.execute({
      userId: serviceProviderId,
    });

    const { speciality } = await this.findSpecialityUseCase.execute({ id });

    await this.specialityRepository.save(
      new Speciality(
        {
          serviceProviderId: serviceProvider.user.id,
          ...updatedSpeciality,
        },
        speciality.id,
      ),
    );
  }
}
