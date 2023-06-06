import { randomUUID } from 'crypto';
import { Address } from '../address/address.entity';
import { Role } from './role.enum';

export class UserProperties {
  email: string;
  password: string;
  role: Role;
  phone: string;
  addresses?: Address[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserObject = UserProperties & { id: string };

export class User {
  public readonly id: string;
  private properties: UserProperties;

  constructor(properties: UserProperties, id?: string) {
    this.id = id ?? randomUUID();
    this.properties = {
      ...properties,
      createdAt: properties.createdAt ?? new Date(),
      updatedAt: properties.updatedAt ?? new Date(),
    };
  }

  get email(): string {
    return this.properties.email;
  }

  set email(email: string) {
    this.properties.email = email;
  }

  get password(): string {
    return this.properties.password;
  }

  set password(password: string) {
    this.properties.password = password;
  }

  get role(): Role {
    return this.properties.role;
  }

  set role(role: Role) {
    this.properties.role = role;
  }

  get phone(): string {
    return this.properties.phone;
  }

  set phone(phone: string) {
    this.properties.phone = phone;
  }

  get addresses(): Address[] {
    return this.properties.addresses;
  }

  set addresses(addresses: Address[]) {
    this.properties.addresses = addresses;
  }

  get createdAt(): Date {
    return this.properties.createdAt;
  }

  set createdAt(createdAt: Date) {
    this.properties.createdAt = createdAt;
  }

  get updatedAt(): Date {
    return this.properties.updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this.properties.updatedAt = updatedAt;
  }

  get object(): UserObject {
    return {
      id: this.id,
      ...this.properties,
    };
  }
}
