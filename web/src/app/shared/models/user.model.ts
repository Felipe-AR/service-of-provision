import { Address, Role } from ".";

export class User {
  email: string;
  role: Role;
  phone: string;
  addresses: Address[];
  createdAt: Date;
  updatedAt: Date;
}