import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { RegisterModule } from './register/register.module';
import { RegisterComponent } from './register/register.component';
import {
  PoContainerModule,
  PoPageModule,
  PoWidgetModule,
} from '@po-ui/ng-components';
import { DashboardCustomerModule } from './dashboard/dashboard-customer/dashboard-customer.module';
import { DashboardServiceProviderModule } from './dashboard/dashboard-service-provider/dashboard-service-provider.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    DashboardCustomerModule,
    DashboardServiceProviderModule,
    PoPageModule,
    PoWidgetModule,
    PoContainerModule,
    RegisterModule,
  ],
  providers: [],
  exports: [RegisterComponent],
})
export class PagesModule {}
