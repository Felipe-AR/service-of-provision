import { Customer } from '@application/domain';
import { ObjectNotFoundException } from '@application/exceptions';
import { CustomerRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';

export interface FindCustomerUseCaseRequest {
  userId: string;
}

export interface FindCustomerUseCaseResponse {
  customer: Customer;
}

@Injectable()
export class FindCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(
    request: FindCustomerUseCaseRequest,
  ): Promise<FindCustomerUseCaseResponse> {
    const { userId } = request;
    const customer = await this.customerRepository.findByUser(userId);

    if (!customer) {
      throw new ObjectNotFoundException('Customer was not found.');
    }

    return { customer };
  }
}
