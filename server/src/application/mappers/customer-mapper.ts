import { Gender, User } from '@application/domain';

export interface CustomerMapperProperties {
  user: User;
  name: string;
  surname: string;
  cpf: string;
  rg: string;
  gender: Gender;
}

export class CustomerMapper {
  user: User;
  name: string;
  surname: string;
  cpf: string;
  rg: string;
  gender: Gender;

  constructor(properties: CustomerMapperProperties) {
    this.user = properties.user;
    this.name = properties.name;
    this.surname = properties.surname;
    this.cpf = properties.cpf;
    this.rg = properties.rg;
    this.gender = properties.gender;
  }
}
