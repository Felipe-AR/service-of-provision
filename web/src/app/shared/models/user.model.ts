import { Address, Role } from '.';

export class User {
  id: string;
  email: string;
  role: Role;
  phone: string;
  addresses: Address[];
  createdAt?: Date;
  updatedAt?: Date;
}
