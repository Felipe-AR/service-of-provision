import { Address } from '@application/domain/address/address.entity';

export abstract class AddressRepository {
  abstract findAll(): Promise<Address[]>;
  abstract findById(id: string): Promise<Address | null>;
  abstract findAllByUserId(userId: string): Promise<Address[]>;
  abstract create(address: Address): Promise<Address>;
  abstract save(address: Address): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
