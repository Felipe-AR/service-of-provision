import { User } from '@application/domain/user/user.entity';
import { AddressDTO, AddressViewModel } from './address-view-model';
import { Role } from '@application/domain/user/role.enum';

export interface UserDTO {
  id: string;
  email: string;
  phone: string;
  addresses: AddressDTO[];
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserViewModel {
  static toHTTP(user: User): UserDTO {
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      addresses: user.addresses.map(AddressViewModel.toHTTP),
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
