import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { CategoryRepository } from '@application/repositories/category/category.repository';
import { PrismaCategoryRepository } from './prisma/repositories/prisma-category.repository';
import { AddressRepository } from '@application/repositories/address/address.repository';
import { PrismaAddressRepository } from './prisma/repositories/prisma-address.repository';
import { UserRepository } from '@application/repositories/user/user.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { CustomerRepository } from '@application/repositories/customer/customer.repository';
import { PrismaCustomerRepository } from './prisma/repositories/prisma-customer.repository';
import { ServiceProviderRepository } from '@application/repositories/service-provider/service-provider.repository';
import { PrismaServiceProviderRepository } from './prisma/repositories/prisma-service-provider.repository';
import { CoreBusinessRepository } from '@application/repositories/core-business/core-business.repository';
import {
  PrismaCoreBusinessRepository,
  PrismaServiceRepository,
} from './prisma/repositories';
import { ServiceRepository } from '@application/repositories';
import { OrderRepository } from '@application/repositories/order/order.repository';
import { PrismaOrderRepository } from './prisma/repositories/prisma-order.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
    {
      provide: AddressRepository,
      useClass: PrismaAddressRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository,
    },
    {
      provide: ServiceProviderRepository,
      useClass: PrismaServiceProviderRepository,
    },
    {
      provide: CoreBusinessRepository,
      useClass: PrismaCoreBusinessRepository,
    },
    {
      provide: ServiceRepository,
      useClass: PrismaServiceRepository,
    },
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
  ],
  exports: [
    CategoryRepository,
    AddressRepository,
    UserRepository,
    CustomerRepository,
    ServiceProviderRepository,
    CoreBusinessRepository,
    ServiceRepository,
    OrderRepository,
  ],
})
export class DatabaseModule {}
