import { Component } from '@angular/core';
import { PoBreadcrumb } from '@po-ui/ng-components';

@Component({
  selector: 'app-dashboard-customer-settings',
  templateUrl: './dashboard-customer-settings.component.html',
  styleUrls: ['./dashboard-customer-settings.component.css']
})
export class DashboardCustomerSettingsComponent {
  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Cliente', link: '/dashboard-customer' },
      { label: 'Configurações' },
    ],
  };
}
