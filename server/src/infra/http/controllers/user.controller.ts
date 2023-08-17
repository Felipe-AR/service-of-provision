import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { CreateCustomerUserUseCase } from '@application/use-cases/user/create-customer-user/create-customer-user.use-case';
import { CreateCustomerUserForm } from '../forms/create-customer-user.form';
import { FindAllUsersUseCase } from '@application/use-cases/user/find-all-users/find-all-users.use-case';
import { FindUserUseCase } from '@application/use-cases/user/find-user/find-user.use-case';
import { UserViewModel, UserDTO } from '../view-models/user-view-model';
import { CreateServiceProviderUserUseCase } from '@application/use-cases/user/create-service-provider-user/create-service-provider-user.use-case';
import { CreateServiceProviderUserForm } from '../forms/create-service-provider-user.form';

@Controller('user')
export class UserController {
  constructor(
    private findAllUsersUseCase: FindAllUsersUseCase,
    private findUserUseCase: FindUserUseCase,
    private createCustomerUserUseCase: CreateCustomerUserUseCase,
    private createServiceProviderUserUseCase: CreateServiceProviderUserUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAllUsers(): Promise<UserDTO[]> {
    const { users } = await this.findAllUsersUseCase.execute();
    return users.map(UserViewModel.toHTTP);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findUser(@Param('id') id: string): Promise<UserDTO> {
    const { user } = await this.findUserUseCase.execute({ id });
    return UserViewModel.toHTTP(user);
  }

  @Post('/customer')
  @HttpCode(HttpStatus.CREATED)
  public async createCustomerUser(
    @Body() form: CreateCustomerUserForm,
  ): Promise<UserDTO> {
    const { user } = await this.createCustomerUserUseCase.execute(form);
    return UserViewModel.toHTTP(user);
  }

  @Post('/service-provider')
  @HttpCode(HttpStatus.CREATED)
  public async createServiceProviderUser(
    @Body() form: CreateServiceProviderUserForm,
  ): Promise<UserDTO> {
    const { user } = await this.createServiceProviderUserUseCase.execute(form);
    return UserViewModel.toHTTP(user);
  }
}
