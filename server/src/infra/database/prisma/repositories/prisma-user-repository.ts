import { User } from '@application/domain/user/user.entity';
import { UserRepository } from '@application/repositories/user/user.repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async find(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: { id },
      include: { addresses: true },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomainWithRelations(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userWithEmail = await this.prismaService.user.findFirst({
      where: { email },
      include: { addresses: true },
    });

    if (!userWithEmail) {
      return null;
    }

    return PrismaUserMapper.toDomainWithRelations(userWithEmail);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany({
      include: { addresses: true },
    });

    return users.map(PrismaUserMapper.toDomainWithRelations);
  }

  async create(user: User): Promise<User> {
    const rawUser = PrismaUserMapper.toPrisma(user);
    const createdUser = await this.prismaService.user.create({
      data: { ...rawUser },
      include: { addresses: true },
    });

    return PrismaUserMapper.toDomainWithRelations(createdUser);
  }

  async save(user: User): Promise<void> {
    const rawUser = PrismaUserMapper.toPrisma(user);
    await this.prismaService.user.update({
      where: { id: rawUser.id },
      data: { ...rawUser },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
