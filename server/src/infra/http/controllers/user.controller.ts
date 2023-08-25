import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';

import { CreateCustomerUserUseCase } from '@application/use-cases/user/create-customer-user/create-customer-user.use-case';
import { CreateCustomerUserForm } from '../forms/create-customer-user.form';
import { FindAllUsersUseCase } from '@application/use-cases/user/find-all-users/find-all-users.use-case';
import { FindUserUseCase } from '@application/use-cases/user/find-user/find-user.use-case';
import { UserViewModel, UserDTO } from '../view-models/user-view-model';
import { CreateServiceProviderUserUseCase } from '@application/use-cases/user/create-service-provider-user/create-service-provider-user.use-case';
import { CreateServiceProviderUserForm } from '../forms/create-service-provider-user.form';
import { Auth } from '@infra/security/auth/decorators/auth.decorator';
import { ChangePasswordUseCase } from '@application/use-cases/user/change-password/change-password.use-case';
import { ChangePasswordForm } from '../forms/change-password.form';
import { UpdateCustomerUserUseCase } from '@application/use-cases/user/update-customer-user/update-customer-user.use-case';
import { UpdateServiceProviderUseCase } from '@application/use-cases/service-provider/update-service-provider/update-service-provider.use-case';
import { UpdateServiceProviderUserForm } from '../forms/update-service-provider-user.form';
import { UpdateCustomerUserForm } from '../forms/update-customer-user.form';
import { Role } from '@application/domain';

@Controller('user')
export class UserController {
  constructor(
    private findAllUsersUseCase: FindAllUsersUseCase,
    private findUserUseCase: FindUserUseCase,
    private createCustomerUserUseCase: CreateCustomerUserUseCase,
    private createServiceProviderUserUseCase: CreateServiceProviderUserUseCase,
    private changePasswordUseCase: ChangePasswordUseCase,
    private updateCustomerUserUseCase: UpdateCustomerUserUseCase,
    private updateServiceProviderUserUseCase: UpdateServiceProviderUseCase,
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

  @Patch('/customer')
  @Auth(Role.CUSTOMER)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async updateCustomerUser(
    @Body() form: UpdateCustomerUserForm,
    @Request() req: any,
  ): Promise<void> {
    await this.updateCustomerUserUseCase.execute({
      ...form,
      userId: req.user.id,
    });
  }

  @Patch('/service-provider')
  @Auth(Role.SERVICE_PROVIDER)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async updateServiceProviderUser(
    @Body() form: UpdateServiceProviderUserForm,
    @Request() req: any,
  ): Promise<void> {
    await this.updateServiceProviderUserUseCase.execute({
      ...form,
      userId: req.user.id,
    });
  }

  @Patch('/change-password')
  @Auth()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async changePassword(
    @Body() form: ChangePasswordForm,
    @Request() req: any,
  ): Promise<void> {
    await this.changePasswordUseCase.execute({ ...form, userId: req.user.id });
  }
}
