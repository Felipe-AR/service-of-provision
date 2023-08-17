import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardCustomerComponent } from './dashboard-customer.component';
import { DashboardCustomerSettingsComponent } from './dashboard-customer-settings/dashboard-customer-settings.component';
import { DashboardCustomerServicesComponent } from './dashboard-customer-services/dashboard-customer-services.component';
import { DashboardCustomerNotificationsComponent } from './dashboard-customer-notifications/dashboard-customer-notifications.component';
import { DashboardCustomerOrdersComponent } from './dashboard-customer-orders/dashboard-customer-orders.component';
import { DashboardCustomerCategoriesComponent } from './dashboard-customer-categories/dashboard-customer-categories.component';
import {
  PoContainerModule,
  PoPageModule,
  PoLinkModule,
  PoListViewModule,
  PoInfoModule,
  PoTableModule,
  PoModalModule,
  PoDividerModule,
  PoDynamicModule,
  PoAccordionModule,
  PoWidgetModule,
  PoTabsModule,
  PoButtonModule,
} from '@po-ui/ng-components';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DashboardCustomerProfilesComponent } from './dashboard-customer-profiles/dashboard-customer-profiles.component';
import { DashboardCustomerHomeComponent } from './dashboard-customer-home/dashboard-customer-home.component';
import { PoPageDynamicEditModule, PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { DashboardCustomerServiceProvidersComponent } from './dashboard-customer-service-providers/dashboard-customer-service-providers.component';
import { DashboardCustomerServiceProviderDetailsComponent } from './dashboard-customer-service-provider-details/dashboard-customer-service-provider-details.component';

@NgModule({
  declarations: [
    DashboardCustomerComponent,
    DashboardCustomerCategoriesComponent,
    DashboardCustomerNotificationsComponent,
    DashboardCustomerOrdersComponent,
    DashboardCustomerServicesComponent,
    DashboardCustomerSettingsComponent,
    DashboardCustomerProfilesComponent,
    DashboardCustomerHomeComponent,
    DashboardCustomerServiceProvidersComponent,
    DashboardCustomerServiceProviderDetailsComponent,
  ],
  imports: [
    CommonModule,
    PoContainerModule,
    PoPageModule,
    PoLinkModule,
    PoListViewModule,
    PoInfoModule,
    PoTableModule,
    PoModalModule,
    PoDividerModule,
    PoDynamicModule,
    PoAccordionModule,
    PoWidgetModule,
    PoPageDynamicTableModule,
    PoPageDynamicEditModule,
    PoTabsModule,
    PoButtonModule,
    FormsModule,
    SharedModule,
    RouterModule,
  ],
  exports: [DashboardCustomerComponent],
})
export class DashboardCustomerModule {}
