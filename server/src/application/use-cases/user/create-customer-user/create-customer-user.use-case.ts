import { Injectable } from '@nestjs/common';

import { Customer } from '@application/domain/customer/customer.entity';
import { CustomerRepository } from '@application/repositories/customer/customer.repository';
import {
  CreateUserUseCase,
  CreateUserUseCaseRequest,
} from '../create-user/create-user.use-case';
import { Gender } from '@application/domain/customer/gender.enum';
import { Role } from '@application/domain/user/role.enum';

interface CreateCustomerUserUseCaseRequest
  extends Omit<CreateUserUseCaseRequest, 'role'> {
  name: string;
  surname: string;
  gender: Gender;
  rg: string;
  cpf: string;
}

interface CreateCustomerUserUseCaseResponse {
  customer: Customer;
}

@Injectable()
export class CreateCustomerUserUseCase {
  constructor(
    private customerRepository: CustomerRepository,
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async execute(
    request: CreateCustomerUserUseCaseRequest,
  ): Promise<CreateCustomerUserUseCaseResponse> {
    const { user } = await this.createUserUseCase.execute({
      email: request.email,
      password: request.password,
      phone: request.phone,
      role: Role.CUSTOMER,
      addresses: request.addresses,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt,
    });

    const customer = new Customer({
      userId: user.id,
      name: request.name,
      surname: request.surname,
      gender: request.gender,
      cpf: request.cpf,
      rg: request.rg,
    });

    const createdCustomer = await this.customerRepository.create(customer);

    return { customer: createdCustomer };
  }
}
