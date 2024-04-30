import { Speciality } from '@application/domain';
import { SpecialityRepository } from '@application/repositories/speciality/speciality.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaSpecialityMapper } from '../mappers';

@Injectable()
export class PrismaSpecialityRepository implements SpecialityRepository {
  constructor(private prismaService: PrismaService) {}

  async find(id: string): Promise<Speciality> {
    const speciality = await this.prismaService.speciality.findFirst({
      where: { id },
    });

    return PrismaSpecialityMapper.toDomain(speciality);
  }

  async findAll(): Promise<Speciality[]> {
    const specialities = await this.prismaService.speciality.findMany();
    return specialities.map(PrismaSpecialityMapper.toDomain);
  }

  async findAllByUser(userId: string): Promise<Speciality[]> {
    const specialities = await this.prismaService.speciality.findMany({
      where: { serviceProviderUserId: userId },
    });

    return specialities.map(PrismaSpecialityMapper.toDomain);
  }

  async create(speciality: Speciality): Promise<Speciality> {
    const rawSpeciality = PrismaSpecialityMapper.toPrisma(speciality);
    const createdSpeciality = await this.prismaService.speciality.create({
      data: { ...rawSpeciality },
    });

    return PrismaSpecialityMapper.toDomain(createdSpeciality);
  }

  async save(speciality: Speciality): Promise<void> {
    const rawSpeciality = PrismaSpecialityMapper.toPrisma(speciality);
    await this.prismaService.speciality.update({
      where: { id: speciality.id },
      data: { ...rawSpeciality },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.speciality.delete({ where: { id } });
  }
}
