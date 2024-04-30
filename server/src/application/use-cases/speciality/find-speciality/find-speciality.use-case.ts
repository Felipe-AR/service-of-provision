import { Speciality } from '@application/domain';
import { ObjectNotFoundException } from '@application/exceptions';
import { SpecialityRepository } from '@application/repositories/speciality/speciality.repository';
import { Injectable } from '@nestjs/common';

export interface FindSpecialityUseCaseRequest {
  id: string;
}

export interface FindSpecialityUseCaseResponse {
  speciality: Speciality;
}

@Injectable()
export class FindSpecialityUseCase {
  constructor(private specialityRepository: SpecialityRepository) {}

  async execute(
    request: FindSpecialityUseCaseRequest,
  ): Promise<FindSpecialityUseCaseResponse> {
    const { id } = request;
    const speciality = await this.specialityRepository.find(id);

    if (!speciality) {
      throw new ObjectNotFoundException('Especialidade não foi encontrada.');
    }

    return { speciality };
  }
}
