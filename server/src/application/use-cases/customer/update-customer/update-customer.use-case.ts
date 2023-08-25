import { CustomerRepository } from '@application/repositories';
import { FindCustomerUseCase } from '../find-customer/find-customer.use-case';
import { Customer, Gender } from '@application/domain';
import { Injectable } from '@nestjs/common';

export interface UpdateCustomerUseCaseRequest {
  userId: string;
  name: string;
  surname: string;
  gender: Gender;
}

type UpdateCustomerUseCaseResponse = void;

@Injectable()
export class UpdateCustomerUseCase {
  constructor(
    private customerRepository: CustomerRepository,
    private findCustomerUseCase: FindCustomerUseCase,
  ) {}

  async execute(
    request: UpdateCustomerUseCaseRequest,
  ): Promise<UpdateCustomerUseCaseResponse> {
    const { userId, ...customerRequest } = request;

    const { customer } = await this.findCustomerUseCase.execute({ userId });

    const updatedCustomer = new Customer(
      {
        cpf: customer.cpf,
        rg: customer.rg,
        ...customerRequest,
      },
      customer.user.id,
    );

    await this.customerRepository.save(updatedCustomer);
  }
}
