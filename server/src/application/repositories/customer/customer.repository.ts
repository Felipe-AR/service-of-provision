import { Customer } from '@application/domain/customer/customer.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class CustomerRepository {
  abstract findByUser(id: string): Promise<Customer | null>;
  abstract findAll(): Promise<Customer[]>;
  abstract create(customer: Customer): Promise<Customer>;
  abstract save(customer: Customer): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
