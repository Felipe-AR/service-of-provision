import { Injectable } from '@nestjs/common';

import { ServiceProvider } from '@application/domain/service-provider/service-provider.entity';
import { PrismaService } from '../prisma.service';
import { ServiceProviderMapper } from '@application/mappers/service-provider-mapper';
import { PrismaServiceProviderMapper } from '../mappers/prisma-service-provider-mapper';
import { ServiceProviderRepository } from '@application/repositories';

const includeOptions = {
  user: { include: { addresses: true } },
  coreBusiness: true,
  specialities: true,
  services: {
    include: {
      category: true,
    },
  },
};

@Injectable()
export class PrismaServiceProviderRepository
  implements ServiceProviderRepository
{
  constructor(private prismaService: PrismaService) {}

  async findByUser(userId: string): Promise<ServiceProviderMapper | null> {
    const serviceProvider = await this.prismaService.serviceProvider.findFirst({
      where: { userId },
      include: includeOptions,
    });

    if (!serviceProvider) {
      return null;
    }

    return PrismaServiceProviderMapper.toDomainWithRelations(serviceProvider);
  }

  async findAll(): Promise<ServiceProviderMapper[]> {
    const serviceProviders = await this.prismaService.serviceProvider.findMany({
      include: includeOptions,
    });

    return serviceProviders.map(
      PrismaServiceProviderMapper.toDomainWithRelations,
    );
  }

  async create(
    serviceProvider: ServiceProvider,
  ): Promise<ServiceProviderMapper> {
    const rawServiceProvider =
      PrismaServiceProviderMapper.toPrisma(serviceProvider);

    const createdServiceProvider =
      await this.prismaService.serviceProvider.create({
        data: { ...rawServiceProvider },
        include: includeOptions,
      });

    return PrismaServiceProviderMapper.toDomainWithRelations(
      createdServiceProvider,
    );
  }

  async save(serviceProvider: ServiceProvider): Promise<void> {
    const rawServiceProvider =
      PrismaServiceProviderMapper.toPrisma(serviceProvider);
    await this.prismaService.serviceProvider.update({
      where: { userId: serviceProvider.userId },
      data: { ...rawServiceProvider },
    });
  }

  async delete(userId: string): Promise<void> {
    await this.prismaService.serviceProvider.delete({
      where: { userId: userId },
    });
  }
}
