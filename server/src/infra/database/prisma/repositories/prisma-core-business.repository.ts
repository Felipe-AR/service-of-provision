import { Injectable } from '@nestjs/common';

import { CoreBusinessRepository } from '@application/repositories/core-business/core-business.repository';
import { PrismaService } from '../prisma.service';
import { CoreBusiness } from '@application/domain';
import { PrismaCoreBusinessMapper } from '../mappers/prisma-core-business-mapper';

@Injectable()
export class PrismaCoreBusinessRepository implements CoreBusinessRepository {
  constructor(private prismaService: PrismaService) {}

  async find(id: string): Promise<CoreBusiness | null> {
    const coreBusiness = await this.prismaService.coreBusiness.findFirst({
      where: { id },
    });

    if (!coreBusiness) {
      return null;
    }

    return PrismaCoreBusinessMapper.toDomain(coreBusiness);
  }

  async findAll(): Promise<CoreBusiness[]> {
    const coreBusinesses = await this.prismaService.coreBusiness.findMany();
    return coreBusinesses.map(PrismaCoreBusinessMapper.toDomain);
  }

  async create(coreBusiness: CoreBusiness): Promise<CoreBusiness> {
    const rawCoreBusiness = PrismaCoreBusinessMapper.toPrisma(coreBusiness);
    const createdCoreBusiness = await this.prismaService.coreBusiness.create({
      data: { ...rawCoreBusiness },
    });

    return PrismaCoreBusinessMapper.toDomain(createdCoreBusiness);
  }

  async save(coreBusiness: CoreBusiness): Promise<void> {
    const rawCoreBusiness = PrismaCoreBusinessMapper.toPrisma(coreBusiness);
    await this.prismaService.coreBusiness.update({
      where: { id: rawCoreBusiness.id },
      data: { ...rawCoreBusiness },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.coreBusiness.delete({
      where: { id },
    });
  }
}
