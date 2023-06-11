import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CreateCategoryUseCase } from '@application/use-cases/category/create-category/create-category.use-case';
import { DatabaseModule } from '@infra/database/database.module';
import { FindCategoryUseCase } from '@application/use-cases/category/find-category/find-category.use-case';
import { UpdateCategoryUseCase } from '@application/use-cases/category/update-category/update-category.use-case';
import { DeleteCategoryUseCase } from '@application/use-cases/category/delete-category/delete-category.use-case';
import { FindAllCategoriesUseCase } from '@application/use-cases/category/find-all-categories/find-all-categories.use-case';
import { AddressController } from './controllers/address.controller';
import { CreateAddressUseCase } from '@application/use-cases/address/create-address/create-address.use-case';
import { DeleteAddressUseCase } from '@application/use-cases/address/delete-address/delete-address.use-case';
import { FindAddressUseCase } from '@application/use-cases/address/find-address/find-address.use-case';
import { FindAllAddressesUseCase } from '@application/use-cases/address/find-all-addresses/find-all-addresses.use-case';
import { FindAllAddressesByUserUseCase } from '@application/use-cases/address/find-all-addresses-by-user/find-all-addresses-by-user.use-case';
import { UpdateAddressUseCase } from '@application/use-cases/address/update-address/update-address.use-case';
import { CreateUserUseCase } from '@application/use-cases/user/create-user/create-user.use-case';
import { CreateCustomerUserUseCase } from '@application/use-cases/user/create-customer-user/create-customer-user.use-case';
import { UserController } from './controllers/user.controller';
import { FindAllUsersUseCase } from '@application/use-cases/user/find-all-users/find-all-users.use-case';
import { FindUserUseCase } from '@application/use-cases/user/find-user/find-user.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController, AddressController, UserController],
  providers: [
    CreateCategoryUseCase,
    FindCategoryUseCase,
    FindAllCategoriesUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    CreateAddressUseCase,
    DeleteAddressUseCase,
    FindAddressUseCase,
    FindAllAddressesUseCase,
    FindAllAddressesByUserUseCase,
    UpdateAddressUseCase,
    CreateUserUseCase,
    CreateCustomerUserUseCase,
    FindAllUsersUseCase,
    FindUserUseCase,
  ],
})
export class HttpModule {}
