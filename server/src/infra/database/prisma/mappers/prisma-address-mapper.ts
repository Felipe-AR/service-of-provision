import { Address } from '@application/domain/address/address.entity';
import { Address as RawAddress } from '@prisma/client';

export class PrismaAddressMapper {
  static toPrisma(address: Address): RawAddress {
    return {
      id: address.id,
      userId: address.userId,
      street: address.street,
      num: address.num,
      complement: address.complement,
      district: address.district,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    };
  }

  static toDomain(rawAddress: RawAddress): Address {
    return new Address(
      {
        userId: rawAddress.userId,
        street: rawAddress.street,
        num: rawAddress.num,
        complement: rawAddress.complement,
        district: rawAddress.district,
        city: rawAddress.city,
        state: rawAddress.state,
        zipCode: rawAddress.zipCode,
      },
      rawAddress.id,
    );
  }
}
