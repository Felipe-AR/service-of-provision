import { randomUUID } from 'crypto';
import { Gender } from './gender.enum';

export interface CustomerProperties {
  userId: string;
  name: string;
  surname: string;
  gender: Gender;
  cpf: string;
  rg: string;
}

export type CustomerObject = CustomerProperties & { id: string };

export class Customer {
  public readonly id: string;
  private properties: CustomerProperties;

  constructor(properties: CustomerProperties, id?: string) {
    this.id = id ?? randomUUID();
    this.properties = properties;
  }

  get userId(): string {
    return this.properties.userId;
  }

  set userId(userId: string) {
    this.properties.userId = userId;
  }

  get name(): string {
    return this.properties.name;
  }

  set name(name: string) {
    this.properties.name = name;
  }

  get surname(): string {
    return this.properties.surname;
  }

  set surname(surname: string) {
    this.properties.surname = surname;
  }

  get gender(): Gender {
    return this.properties.gender;
  }

  set gender(gender: Gender) {
    this.properties.gender = gender;
  }

  get cpf(): string {
    return this.properties.cpf;
  }

  set cpf(cpf: string) {
    this.properties.cpf = cpf;
  }

  get rg(): string {
    return this.properties.rg;
  }

  set rg(rg: string) {
    this.properties.rg = rg;
  }

  get object(): CustomerObject {
    return {
      id: this.id,
      ...this.properties,
    };
  }
}
