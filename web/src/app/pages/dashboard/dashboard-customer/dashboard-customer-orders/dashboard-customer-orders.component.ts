import { Component } from '@angular/core';
import { PoBreadcrumb } from '@po-ui/ng-components';

@Component({
  selector: 'app-dashboard-customer-orders',
  templateUrl: './dashboard-customer-orders.component.html',
  styleUrls: ['./dashboard-customer-orders.component.css']
})
export class DashboardCustomerOrdersComponent {
  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Cliente', link: '/dashboard-customer' },
      { label: 'Pedidos' },
    ],
  };
}
