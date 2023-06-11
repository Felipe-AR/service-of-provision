import { Address } from '@application/domain/address/address.entity';
import { AddressRepository } from '@application/repositories/address/address.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaAddressMapper } from '../mappers/prisma-address-mapper';

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<Address[]> {
    const addresses = await this.prismaService.address.findMany();
    return addresses.map(PrismaAddressMapper.toDomain);
  }

  async findById(id: string): Promise<Address | null> {
    const address = await this.prismaService.address.findFirst({
      where: { id },
    });

    if (!address) {
      return null;
    }

    return PrismaAddressMapper.toDomain(address);
  }

  async findAllByUserId(userId: string): Promise<Address[]> {
    const addressesByUser = await this.prismaService.address.findMany({
      where: { userId },
    });

    return addressesByUser.map(PrismaAddressMapper.toDomain);
  }

  async create(address: Address): Promise<Address> {
    const rawAddress = PrismaAddressMapper.toPrisma(address);
    const createdAddress = await this.prismaService.address.create({
      data: { ...rawAddress },
    });

    return PrismaAddressMapper.toDomain(createdAddress);
  }

  async save(address: Address): Promise<void> {
    const rawAddress = PrismaAddressMapper.toPrisma(address);

    await this.prismaService.address.update({
      where: { id: rawAddress.id },
      data: { ...rawAddress },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.address.delete({
      where: { id },
    });
  }
}
