import { randomUUID } from 'crypto';
import { Genre } from './genre.enum';

export interface CustomerProperties {
  userId: string;
  name: string;
  surname: string;
  genre: Genre;
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

  get genre(): Genre {
    return this.properties.genre;
  }

  set genre(genre: Genre) {
    this.properties.genre = genre;
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

  set rg(genre: string) {
    this.properties.rg = genre;
  }
}
