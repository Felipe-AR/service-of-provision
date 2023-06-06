import { randomUUID } from 'crypto';

export interface AddressProperties {
  userId: string;
  street: string;
  num: string;
  district: string;
  complement?: string;
  city: string;
  state: string;
  zipCode: string;
}

export type AddressObject = AddressProperties & { id: string };

export class Address {
  public readonly id: string;
  private properties: AddressProperties;

  constructor(properties: AddressProperties, id?: string) {
    this.id = id ?? randomUUID();
    this.properties = properties;
  }

  get userId(): string {
    return this.properties.userId;
  }

  set userId(user: string) {
    this.properties.userId;
  }

  get street(): string {
    return this.properties.street;
  }

  set street(street: string) {
    this.properties.street = street;
  }

  get num(): string {
    return this.properties.num;
  }

  set num(num: string) {
    this.properties.num = num;
  }

  get district(): string {
    return this.properties.district;
  }

  set district(district: string) {
    this.properties.district = district;
  }

  get complement(): string {
    return this.properties.complement;
  }

  set complement(complement: string) {
    this.properties.complement = complement;
  }

  get city(): string {
    return this.properties.city;
  }

  set city(city: string) {
    this.properties.city = city;
  }

  get state(): string {
    return this.properties.state;
  }

  set state(state: string) {
    this.properties.state = state;
  }

  get zipCode(): string {
    return this.properties.zipCode;
  }

  set zipCode(zipCode: string) {
    this.properties.zipCode = zipCode;
  }

  get object(): AddressObject {
    return {
      id: this.id,
      ...this.properties,
    };
  }
}
