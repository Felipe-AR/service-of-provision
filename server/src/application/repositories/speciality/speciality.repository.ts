import { Speciality } from '@application/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class SpecialityRepository {
  abstract find(id: string): Promise<Speciality>;
  abstract findAll(): Promise<Speciality[]>;
  abstract findAllByUser(userId: string): Promise<Speciality[]>;
  abstract create(speciality: Speciality): Promise<Speciality>;
  abstract save(speciality: Speciality): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
