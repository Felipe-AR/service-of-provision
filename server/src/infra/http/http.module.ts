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
import { ServiceProviderController } from './controllers/service-provider.controller';
import { SecurityModule } from '@infra/security/security.module';
import { AuthController } from './controllers/auth.controller';
import { CreateServiceProviderUserUseCase } from '@application/use-cases/user/create-service-provider-user/create-service-provider-user.use-case';
import { CoreBusinessController } from './controllers/core-business.controller';
import { CreateCoreBusinessUseCase } from '@application/use-cases/core-business/create-core-business/create-core-business.use-case';
import { FindAllCoreBusinessesUseCase } from '@application/use-cases/core-business/find-all-core-businesses/find-all-core-businesses.use-case';
import { FindCoreBusinessUseCase } from '@application/use-cases/core-business/find-core-business/find-core-business.use-case';
import { FindAllServiceProvidersUseCase } from '@application/use-cases/service-provider/find-all-service-providers/find-all-service-providers.use-case';
import { FindServiceProviderUseCase } from '@application/use-cases/service-provider/find-service-provider/find-service-provider.use-case';
import { ServiceController } from './controllers/service.controller';
import { FindAllServicesUseCase } from '@application/use-cases/service/find-all-services/find-all-services.use-case';
import { FindServiceUseCase } from '@application/use-cases/service/find-service/find-service.use-case';
import { ActivateServiceUseCase } from '@application/use-cases/service/activate-service/activate-service.use-case';
import { InactivateServiceUseCase } from '@application/use-cases/service/inactivate-service/inactive-service.use-case';
import { BlockServiceUseCase } from '@application/use-cases/service/block-service/block-service.use-case';
import { CreateServiceUseCase } from '@application/use-cases/service/create-service/create-service.use-case';
import { UpdateServiceUseCase } from '@application/use-cases/service/update-service/update-service.use-case';

@Module({
  imports: [DatabaseModule, SecurityModule],
  controllers: [
    AuthController,
    CategoryController,
    AddressController,
    UserController,
    ServiceProviderController,
    CoreBusinessController,
    ServiceController,
  ],
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
    CreateServiceProviderUserUseCase,
    CreateCoreBusinessUseCase,
    FindCoreBusinessUseCase,
    FindAllCoreBusinessesUseCase,
    FindAllServiceProvidersUseCase,
    FindServiceProviderUseCase,
    FindAllServicesUseCase,
    FindServiceUseCase,
    CreateServiceUseCase,
    UpdateServiceUseCase,
    ActivateServiceUseCase,
    InactivateServiceUseCase,
    BlockServiceUseCase,
  ],
})
export class HttpModule {}
