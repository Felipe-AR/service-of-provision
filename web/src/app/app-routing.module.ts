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
import { DashboardCustomerProfilesComponent } from './pages/dashboard/dashboard-customer/dashboard-customer-profiles/dashboard-customer-profiles.component';
import { RegisterCustomerComponent } from './pages/register/register-customer/register-customer.component';
import { RegisterServiceProviderComponent } from './pages/register/register-service-provider/register-service-provider.component';
import { DashboardCustomerHomeComponent } from './pages/dashboard/dashboard-customer/dashboard-customer-home/dashboard-customer-home.component';
import { DashboardCustomerServiceProvidersComponent } from './pages/dashboard/dashboard-customer/dashboard-customer-service-providers/dashboard-customer-service-providers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent, title: 'Ajudaê | Cadastro' },
  { path: 'register/customer', component: RegisterCustomerComponent, title: 'Ajudaê | Cadastro'},
  { path: 'register/service-provider', component: RegisterServiceProviderComponent, title: 'Ajudaê | Cadastro' },
  
  { path: 'dashboard-customer', component: DashboardCustomerComponent, children: [
    { path: '', component: DashboardCustomerHomeComponent, title: 'Ajudaê | Home' },
    { path: 'service-providers', component: DashboardCustomerServiceProvidersComponent, title: 'Ajudaê | Prestadores de Serviço'  },
    { path: 'orders', component: DashboardCustomerOrdersComponent, title: 'Ajudaê | Pedidos'  },
    { path: 'notifications', component: DashboardCustomerNotificationsComponent, title: 'Ajudaê | Notificações'  },
    { path: 'profiles', component: DashboardCustomerProfilesComponent, title: 'Ajudaê | Perfil'  },
    { path: 'profiles/settings', component: DashboardCustomerSettingsComponent, title: 'Ajudaê | Configurações'  }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
