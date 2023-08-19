import { Customer } from '@application/domain';
import { CustomerMapper } from '@application/mappers/customer-mapper';
import { CustomerRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';

export interface FindAllCustomersUseCaseResponse {
  customers: CustomerMapper[];
}

@Injectable()
export class FindAllCustomersUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(): Promise<FindAllCustomersUseCaseResponse> {
    const customers = await this.customerRepository.findAll();
    return { customers };
  }
}
