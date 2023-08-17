import { Injectable } from '@nestjs/common';

import { Customer } from '@application/domain/customer/customer.entity';
import { CustomerRepository } from '@application/repositories/customer/customer.repository';
import {
  CreateUserUseCase,
  CreateUserUseCaseRequest,
} from '../create-user/create-user.use-case';
import { Gender } from '@application/domain/customer/gender.enum';
import { Role } from '@application/domain/user/role.enum';
import { User } from '@application/domain/user/user.entity';

interface CreateCustomerUserUseCaseRequest
  extends Omit<CreateUserUseCaseRequest, 'role'> {
  name: string;
  surname: string;
  gender: Gender;
  rg: string;
  cpf: string;
}

interface CreateCustomerUserUseCaseResponse {
  user: User;
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
      ...request,
      role: Role.CUSTOMER,
    });

    const customer = new Customer(
      {
        name: request.name,
        surname: request.surname,
        gender: request.gender,
        cpf: request.cpf,
        rg: request.rg,
      },
      user.id,
    );

    await this.customerRepository.create(customer);

    return { user };
  }
}
