import { FindAllCustomersUseCase } from '@application/use-cases/customer/find-all-customers/find-all-customers.use-case';
import { FindCustomerUseCase } from '@application/use-cases/customer/find-customer/find-customer.use-case';
import { Controller, Get, Request } from '@nestjs/common';
import {
  CustomerDTO,
  CustomerViewModel,
} from '../view-models/customer-view-model';
import { Auth } from '@infra/security/auth/decorators/auth.decorator';
import { Role } from '@application/domain';

@Controller('customer')
export class CustomerController {
  constructor(
    private findCustomerUseCase: FindCustomerUseCase,
    private findAllCustomersUseCase: FindAllCustomersUseCase,
  ) {}

  @Get()
  @Auth(Role.ADMINISTRATOR)
  public async findAllCustomers(): Promise<CustomerDTO[]> {
    const { customers } = await this.findAllCustomersUseCase.execute();
    return customers.map(CustomerViewModel.toHTTP);
  }

  @Get('/user')
  @Auth(Role.CUSTOMER)
  public async findCustomer(@Request() req: any): Promise<CustomerDTO> {
    const { customer } = await this.findCustomerUseCase.execute({
      userId: req.user.id,
    });
    return CustomerViewModel.toHTTP(customer);
  }
}
