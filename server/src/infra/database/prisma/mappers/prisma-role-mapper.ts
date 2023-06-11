import { Role } from '@application/domain/user/role.enum';
import { Role as RawRole } from '@prisma/client';

export class PrismaRoleMapper {
  static toPrisma(role: Role): RawRole {
    return RawRole[role];
  }

  static toDomain(rawRole: RawRole): Role {
    return Role[rawRole];
  }
}
