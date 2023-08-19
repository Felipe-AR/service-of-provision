import { FindAllCustomersUseCase } from '@application/use-cases/customer/find-all-customers/find-all-customers.use-case';
import { FindCustomerUseCase } from '@application/use-cases/customer/find-customer/find-customer.use-case';
import { Controller, Get, Param } from '@nestjs/common';
import {
  CustomerDTO,
  CustomerViewModel,
} from '../view-models/customer-view-model';

@Controller('customer')
export class CustomerController {
  constructor(
    private findCustomerUseCase: FindCustomerUseCase,
    private findAllCustomersUseCase: FindAllCustomersUseCase,
  ) {}

  @Get()
  public async findAllCustomers(): Promise<CustomerDTO[]> {
    const { customers } = await this.findAllCustomersUseCase.execute();
    return customers.map(CustomerViewModel.toHTTP);
  }

  @Get(':userId')
  public async findCustomer(
    @Param('userId') userId: string,
  ): Promise<CustomerDTO> {
    const { customer } = await this.findCustomerUseCase.execute({ userId });
    return CustomerViewModel.toHTTP(customer);
  }
}
