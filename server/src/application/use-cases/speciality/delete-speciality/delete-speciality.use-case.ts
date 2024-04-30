import { SpecialityRepository } from '@application/repositories/speciality/speciality.repository';
import { FindSpecialityUseCase } from '../find-speciality/find-speciality.use-case';
import { Injectable } from '@nestjs/common';

export interface DeleteSpecialityUseCaseRequest {
  id: string;
}

type DeleteSpecialityUseCaseResponse = void;

@Injectable()
export class DeleteSpecialityUseCase {
  constructor(
    private specialityRepository: SpecialityRepository,
    private findSpecialityUseCase: FindSpecialityUseCase,
  ) {}

  async execute(
    request: DeleteSpecialityUseCaseRequest,
  ): Promise<DeleteSpecialityUseCaseResponse> {
    const { id } = request;
    const { speciality } = await this.findSpecialityUseCase.execute({ id });
    await this.specialityRepository.delete(speciality.id);
  }
}
