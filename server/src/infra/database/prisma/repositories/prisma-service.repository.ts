import { Service } from '@application/domain';
import { ServiceRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaServiceMapper } from '../mappers/prisma-service-mapper';

@Injectable()
export class PrismaServiceRepository implements ServiceRepository {
  constructor(private prismaService: PrismaService) {}

  async find(id: string): Promise<Service> {
    const service = await this.prismaService.service.findFirst({
      where: { id },
    });
    return PrismaServiceMapper.toDomain(service);
  }

  async findAllByIdIn(servicesIds: string[]): Promise<Service[]> {
    const services = await this.prismaService.service.findMany({
      where: { id: { in: servicesIds } },
    });
    return services.map(PrismaServiceMapper.toDomain);
  }

  async findAll(): Promise<Service[]> {
    const services = await this.prismaService.service.findMany();
    return services.map(PrismaServiceMapper.toDomain);
  }

  async create(service: Service): Promise<Service> {
    const rawService = PrismaServiceMapper.toPrisma(service);
    const createdService = await this.prismaService.service.create({
      data: { ...rawService },
    });
    return PrismaServiceMapper.toDomain(createdService);
  }

  async save(service: Service): Promise<void> {
    const rawService = PrismaServiceMapper.toPrisma(service);
    await this.prismaService.service.update({
      where: { id: rawService.id },
      data: { ...rawService },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.service.delete({
      where: { id },
    });
  }
}
