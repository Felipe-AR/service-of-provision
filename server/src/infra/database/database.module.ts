import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { CategoryRepository } from '@application/repositories/category/category.repository';
import { PrismaCategoryRepository } from './prisma/repositories/prisma-category.repository';
import { AddressRepository } from '@application/repositories/address/address.repository';
import { PrismaAddressRepository } from './prisma/repositories/prisma-address.repository';
import { UserRepository } from '@application/repositories/user/user.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { CustomerRepository } from '@application/repositories/customer/customer.repository';
import { PrismaCustomerRepository } from './prisma/repositories/prisma-customer-repository';

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
  ],
  exports: [
    CategoryRepository,
    AddressRepository,
    UserRepository,
    CustomerRepository,
  ],
})
export class DatabaseModule {}
