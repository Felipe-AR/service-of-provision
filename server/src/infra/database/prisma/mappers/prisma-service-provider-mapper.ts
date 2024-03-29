import { ServiceProvider } from '@application/domain';
import { ServiceProviderMapper } from '@application/mappers/service-provider-mapper';
import {
  User as RawUser,
  ServiceProvider as RawServiceProvider,
  CoreBusiness as RawCoreBusiness,
  Service as RawService,
  Address as RawAddress,
  Category as RawCategory,
  Speciality as RawSpeciality,
} from '@prisma/client';
import { PrismaServiceMapper } from './prisma-service-mapper';
import { PrismaSpecialityMapper } from './prisma-speciality-mapper';
import { PrismaCoreBusinessMapper } from './prisma-core-business-mapper';
import { PrismaUserMapper, RawUserWithRelations } from './prisma-user-mapper';

export type RawServiceProviderWithRelations = RawServiceProvider & {
  user: RawUserWithRelations;
  coreBusiness: RawCoreBusiness;
  services: (RawService & { category: RawCategory })[];
  specialities: RawSpeciality[];
};

export class PrismaServiceProviderMapper {
  static toPrisma(serviceProvider: ServiceProvider): RawServiceProvider {
    return {
      userId: serviceProvider.userId,
      coreBusinessId: serviceProvider.coreBusinessId,
      cnpj: serviceProvider.cnpj,
      companyName: serviceProvider.companyName,
    };
  }

  static toDomain(rawServiceProvider: RawServiceProvider) {
    return new ServiceProvider(
      {
        coreBusinessId: rawServiceProvider.coreBusinessId,
        companyName: rawServiceProvider.companyName,
        cnpj: rawServiceProvider.cnpj,
      },
      rawServiceProvider.userId,
    );
  }

  static toDomainWithRelations(
    rawServiceProvider: RawServiceProviderWithRelations,
  ): ServiceProviderMapper {
    return new ServiceProviderMapper({
      user: PrismaUserMapper.toDomainWithRelations(rawServiceProvider.user),
      cnpj: rawServiceProvider.cnpj,
      companyName: rawServiceProvider.companyName,
      coreBusiness: PrismaCoreBusinessMapper.toDomain(
        rawServiceProvider.coreBusiness,
      ),
      services: rawServiceProvider.services.map(
        PrismaServiceMapper.toDomainWithRelations,
      ),
      specialities: rawServiceProvider.specialities.map(
        PrismaSpecialityMapper.toDomain,
      ),
    });
  }
}
