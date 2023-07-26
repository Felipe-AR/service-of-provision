import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  PoButtonModule,
  PoContainerModule,
  PoDividerModule,
  PoDynamicModule,
  PoFieldModule,
  PoLinkModule,
  PoNotificationModule,
  PoTabsModule,
} from '@po-ui/ng-components';
import { RegisterComponent } from './register.component';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { RegisterServiceProviderComponent } from './register-service-provider/register-service-provider.component';


@NgModule({
  declarations: [RegisterComponent, RegisterCustomerComponent, RegisterServiceProviderComponent],
  imports: [
    CommonModule, 
    PoContainerModule, 
    PoButtonModule, 
    PoDynamicModule,
    PoFieldModule,
    PoDividerModule,
    PoLinkModule,
    FormsModule,
    PoTabsModule,
    PoNotificationModule,
    RouterModule
  ],
  exports: [RegisterComponent],
})
export class RegisterModule {}
