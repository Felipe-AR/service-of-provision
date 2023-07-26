import { Component } from '@angular/core';
import { PoBreadcrumb } from '@po-ui/ng-components';

@Component({
  selector: 'app-dashboard-customer-services',
  templateUrl: './dashboard-customer-services.component.html',
  styleUrls: ['./dashboard-customer-services.component.css'],
})
export class DashboardCustomerServicesComponent {
  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Cliente', link: '/dashboard-customer' },
      { label: 'Serviços' },
    ],
  };
}
