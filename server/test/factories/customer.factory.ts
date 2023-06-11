import {
  Customer,
  CustomerProperties,
} from '@application/domain/customer/customer.entity';
import { Gender } from '@application/domain/customer/gender.enum';
import { randomUUID } from 'crypto';

export function makeCustomer(override?: Partial<CustomerProperties>) {
  return new Customer({
    userId: randomUUID(),
    cpf: '00012345600',
    rg: '001234567',
    gender: Gender.FEMALE,
    name: 'John',
    surname: 'Doe',
    ...override,
  });
}
