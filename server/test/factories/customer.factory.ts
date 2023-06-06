import {
  Customer,
  CustomerProperties,
} from '@application/domain/customer/customer.entity';
import { Genre } from '@application/domain/customer/genre.enum';
import { randomUUID } from 'crypto';

export function makeCustomer(override?: Partial<CustomerProperties>) {
  return new Customer({
    userId: randomUUID(),
    cpf: '00012345600',
    rg: '001234567',
    genre: Genre.FEMALE,
    name: 'John',
    surname: 'Doe',
  });
}
