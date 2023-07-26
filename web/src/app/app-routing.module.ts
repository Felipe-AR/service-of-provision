import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardCustomerComponent } from './pages/dashboard/dashboard-customer/dashboard-customer.component';
import { DashboardCustomerServicesComponent } from './pages/dashboard/dashboard-customer/dashboard-customer-services/dashboard-customer-services.component';
import { DashboardCustomerNotificationsComponent } from './pages/dashboard/dashboard-customer/dashboard-customer-notifications/dashboard-customer-notifications.component';
import { DashboardCustomerOrdersComponent } from './pages/dashboard/dashboard-customer/dashboard-customer-orders/dashboard-customer-orders.component';
import { DashboardCustomerCategoriesComponent } from './pages/dashboard/dashboard-customer/dashboard-customer-categories/dashboard-customer-categories.component';
import { DashboardCustomerSettingsComponent } from './pages/dashboard/dashboard-customer/dashboard-customer-settings/dashboard-customer-settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard-customer', component: DashboardCustomerComponent },
  { path: 'dashboard-customer/categories', component: DashboardCustomerCategoriesComponent },
  { path: 'dashboard-customer/services', component: DashboardCustomerServicesComponent },
  { path: 'dashboard-customer/orders', component: DashboardCustomerOrdersComponent },
  { path: 'dashboard-customer/notifications', component: DashboardCustomerNotificationsComponent },
  { path: 'dashboard-customer/settings', component: DashboardCustomerSettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
