import { Customer } from '@application/domain/customer/customer.entity';
import { Gender } from '@application/domain/customer/gender.enum';
import { UserDTO, UserViewModel } from './user-view-model';
import { CustomerMapper } from '@application/mappers/customer-mapper';

export interface CustomerDTO {
  user: UserDTO;
  name: string;
  surname: string;
  rg: string;
  cpf: string;
  gender: Gender;
}

export class CustomerViewModel {
  static toHTTP(customer: CustomerMapper): CustomerDTO {
    return {
      user: UserViewModel.toHTTP(customer.user),
      name: customer.name,
      surname: customer.surname,
      rg: customer.rg,
      cpf: customer.cpf,
      gender: customer.gender,
    };
  }
}
