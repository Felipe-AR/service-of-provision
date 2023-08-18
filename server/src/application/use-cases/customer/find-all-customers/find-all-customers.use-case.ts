import { Customer } from '@application/domain';
import { CustomerRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';

export interface FindAllCustomersUseCaseResponse {
  customers: Customer[];
}

@Injectable()
export class FindAllCustomersUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(): Promise<FindAllCustomersUseCaseResponse> {
    const customers = await this.customerRepository.findAll();
    return { customers };
  }
}
