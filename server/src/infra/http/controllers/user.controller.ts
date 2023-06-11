import { CreateCustomerUserUseCase } from '@application/use-cases/user/create-customer-user/create-customer-user.use-case';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCustomerUserForm } from '../forms/create-customer-user.form';
import { FindAllUsersUseCase } from '@application/use-cases/user/find-all-users/find-all-users.use-case';
import { FindUserUseCase } from '@application/use-cases/user/find-user/find-user.use-case';
import { UserViewModel, UserDTO } from '../view-models/user-view-model';
import {
  CustomerDTO,
  CustomerViewModel,
} from '../view-models/customer-view-model';

@Controller('user')
export class UserController {
  constructor(
    private findAllUsersUseCase: FindAllUsersUseCase,
    private findUserUseCase: FindUserUseCase,
    private createCustomerUserUseCase: CreateCustomerUserUseCase,
  ) {}

  @Get()
  public async findAllUsers(): Promise<UserDTO[]> {
    const { users } = await this.findAllUsersUseCase.execute();
    return users.map(UserViewModel.toHTTP);
  }

  @Get(':id')
  public async findUser(@Param('id') id: string): Promise<any> {
    const { user } = await this.findUserUseCase.execute({ id });
    return UserViewModel.toHTTP(user);
  }

  @Post('/customer')
  public async createCustomerUser(
    @Body() customerUserForm: CreateCustomerUserForm,
  ): Promise<CustomerDTO> {
    const { customer } = await this.createCustomerUserUseCase.execute({
      ...customerUserForm,
    });

    return CustomerViewModel.toHTTP(customer);
  }
}
