import { Customer } from '@application/domain/customer/customer.entity';

export abstract class CustomerRepository {
  abstract find(id: string): Promise<Customer | null>;
  abstract findAll(): Promise<Customer[]>;
  abstract create(customer: Customer): Promise<Customer>;
  abstract save(customer: Customer): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
