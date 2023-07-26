import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateCustomerUserUseCase } from '@application/use-cases/user/create-customer-user/create-customer-user.use-case';
import { CreateCustomerUserForm } from '../forms/create-customer-user.form';
import { FindAllUsersUseCase } from '@application/use-cases/user/find-all-users/find-all-users.use-case';
import { FindUserUseCase } from '@application/use-cases/user/find-user/find-user.use-case';
import { UserViewModel, UserDTO } from '../view-models/user-view-model';
import {
  CustomerDTO,
  CustomerViewModel,
} from '../view-models/customer-view-model';
import { CreateServiceProviderUserUseCase } from '@application/use-cases/user/create-service-provider-user/create-service-provider-user.use-case';

@Controller('user')
export class UserController {
  constructor(
    private findAllUsersUseCase: FindAllUsersUseCase,
    private findUserUseCase: FindUserUseCase,
    private createCustomerUserUseCase: CreateCustomerUserUseCase,
    private createServiceProviderUserUseCase: CreateServiceProviderUserUseCase,
  ) {}

  @Get()
  public async findAllUsers(): Promise<UserDTO[]> {
    const { users } = await this.findAllUsersUseCase.execute();
    return users.map(UserViewModel.toHTTP);
  }

  @Get(':id')
  public async findUser(@Param('id') id: string): Promise<UserDTO> {
    const { user } = await this.findUserUseCase.execute({ id });
    return UserViewModel.toHTTP(user);
  }

  @Post('/customer')
  public async createCustomerUser(
    @Body() customerUserForm: CreateCustomerUserForm,
  ): Promise<CustomerDTO> {
    const { customer } = await this.createCustomerUserUseCase.execute(
      customerUserForm,
    );
    return CustomerViewModel.toHTTP(customer);
  }

  @Post('/service-provider')
  public async createServiceProviderUser(
    @Body() serviceProviderUserForm: CreateServiceProviderUserForm,
  ): Promise<ServiceProviderDTO> {
    const { serviceProvider } =
      await this.createServiceProviderUserUseCase.execute(
        serviceProviderUserForm,
      );

    return ServiceProviderViewModel.toHttp(serviceProvider);
  }
}
