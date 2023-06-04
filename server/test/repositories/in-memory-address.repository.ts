import {
  Address,
  AddressProperties,
} from '@application/domain/address/address.entity';
import { AddressRepository } from '@application/repositories/address/address.repository';

export class InMemoryAddressRepository implements AddressRepository {
  private addresses: Address[] = [];

  async findAll(): Promise<Address[]> {
    return this.addresses;
  }

  async findById(id: string): Promise<Address> {
    return this.addresses.find((address) => address.id === id);
  }

  async findAllByUserId(userId: string): Promise<Address[]> {
    return this.addresses.filter((address) => address.userId === userId);
  }

  async create(address: Address): Promise<Address> {
    this.addresses.push(address);
    return address;
  }

  async save(updatedAddress: Address): Promise<void> {
    const index = this.addresses
      .map((address) => address.id)
      .indexOf(updatedAddress.id);

    const addressAlreadyCreated = await this.findById(updatedAddress.id);

    this.addresses[index] = new Address(
      {
        ...addressAlreadyCreated['properties'],
        ...updatedAddress['properties'],
      },
      addressAlreadyCreated.id,
    );
  }

  async delete(id: string): Promise<void> {
    const index = this.addresses.map((address) => address.id).indexOf(id);
    this.addresses.splice(index, 1);
  }
}
