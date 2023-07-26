import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardCustomerComponent } from './dashboard-customer.component';
import { DashboardCustomerSettingsComponent } from './dashboard-customer-settings/dashboard-customer-settings.component';
import { DashboardCustomerServicesComponent } from './dashboard-customer-services/dashboard-customer-services.component';
import { DashboardCustomerNotificationsComponent } from './dashboard-customer-notifications/dashboard-customer-notifications.component';
import { DashboardCustomerOrdersComponent } from './dashboard-customer-orders/dashboard-customer-orders.component';
import { DashboardCustomerCategoriesComponent } from './dashboard-customer-categories/dashboard-customer-categories.component';
import { PoContainerModule, PoPageModule, PoLinkModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [
    DashboardCustomerComponent,
    DashboardCustomerCategoriesComponent,
    DashboardCustomerNotificationsComponent,
    DashboardCustomerOrdersComponent,
    DashboardCustomerServicesComponent,
    DashboardCustomerSettingsComponent,
  ],
  imports: [CommonModule, PoContainerModule, PoPageModule, PoLinkModule, RouterModule],
  exports: [DashboardCustomerComponent],
})
export class DashboardCustomerModule {}
