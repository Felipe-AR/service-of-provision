import { User as RawUser, Address as RawAddress } from '@prisma/client';
import { User } from '@application/domain/user/user.entity';
import { PrismaAddressMapper } from './prisma-address-mapper';
import { PrismaRoleMapper } from './prisma-role-mapper';

type RawUserWithAddresses = RawUser & { addresses: RawAddress[] };

export class PrismaUserMapper {
  static toPrisma(user: User): RawUser {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toPrismaWithAddresses(user: User): RawUserWithAddresses {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      phone: user.phone,
      role: user.role,
      addresses: user.addresses.map(PrismaAddressMapper.toPrisma),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(rawUser: RawUser): User {
    return new User(
      {
        email: rawUser.email,
        password: rawUser.password,
        phone: rawUser.phone,
        role: PrismaRoleMapper.toDomain(rawUser.role),
        createdAt: rawUser.createdAt,
        updatedAt: rawUser.updatedAt,
      },
      rawUser.id,
    );
  }

  static toDomainWithAddresses(rawUser: RawUserWithAddresses): User {
    return new User(
      {
        email: rawUser.email,
        password: rawUser.password,
        phone: rawUser.phone,
        addresses: rawUser.addresses.map(PrismaAddressMapper.toDomain),
        role: PrismaRoleMapper.toDomain(rawUser.role),
        createdAt: rawUser.createdAt,
        updatedAt: rawUser.updatedAt,
      },
      rawUser.id,
    );
  }
}
