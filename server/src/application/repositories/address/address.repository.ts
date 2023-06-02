import {
  Address,
  AddressProperties,
} from '@application/domain/address/address.entity';

export interface AddressRepository {
  findAll(): Promise<Address[]>;
  findById(id: string): Promise<Address>;
  findAllByUserId(userId: string): Promise<Address[]>;
  create(address: Address): Promise<Address>;
  update(id: string, address: AddressProperties): Promise<void>;
  delete(id: string): Promise<void>;
}
