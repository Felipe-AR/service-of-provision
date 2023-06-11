import { Customer } from '@application/domain/customer/customer.entity';
import { Gender } from '@prisma/client';

export interface CustomerDTO {
  userId: string;
  name: string;
  surname: string;
  rg: string;
  cpf: string;
  gender: Gender;
}

export class CustomerViewModel {
  static toHTTP(customer: Customer): CustomerDTO {
    return {
      userId: customer.userId,
      name: customer.name,
      surname: customer.surname,
      rg: customer.rg,
      cpf: customer.cpf,
      gender: customer.gender,
    };
  }
}
