import { ServiceStatus } from '@application/domain';
import { ServiceStatus as RawServiceStatus } from '@prisma/client';

export class PrismaServiceStatusMapper {
  static toPrisma(serviceStatus: ServiceStatus) {
    return RawServiceStatus[serviceStatus];
  }

  static toDomain(rawServiceStatus: RawServiceStatus) {
    return ServiceStatus[rawServiceStatus];
  }
}
