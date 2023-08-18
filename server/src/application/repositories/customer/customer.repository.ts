import { Customer } from '@application/domain/customer/customer.entity';
import { CustomerMapper } from '@application/mappers/customer-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class CustomerRepository {
  abstract findByUser(id: string): Promise<CustomerMapper | null>;
  abstract findAll(): Promise<CustomerMapper[]>;
  abstract create(customer: Customer): Promise<CustomerMapper>;
  abstract save(customer: Customer): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
