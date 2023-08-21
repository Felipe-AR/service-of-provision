import { ClassificationRepository } from '@application/repositories/classification/classification.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Classification } from '@application/domain';
import { PrismaClassificationMapper } from '../mappers';

@Injectable()
export class PrismaClassificationRepository
  implements ClassificationRepository
{
  constructor(private prismaService: PrismaService) {}

  async find(id: string): Promise<Classification> {
    throw new Error('Method not implemented.');
  }

  async findAllByUserRated(userId: string): Promise<Classification[]> {
    const classifications = await this.prismaService.classification.findMany({
      where: { userClassificationRatedId: userId },
    });
    return classifications.map(PrismaClassificationMapper.toDomain);
  }

  async create(classification: Classification): Promise<Classification> {
    const rawClassification =
      PrismaClassificationMapper.toPrisma(classification);
    const createdClassification =
      await this.prismaService.classification.create({
        data: { ...rawClassification },
      });
    return PrismaClassificationMapper.toDomain(createdClassification);
  }

  async save(classification: Classification): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
