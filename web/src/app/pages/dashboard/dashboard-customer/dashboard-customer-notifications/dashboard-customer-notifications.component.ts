import { Component } from '@angular/core';
import { PoBreadcrumb } from '@po-ui/ng-components';

@Component({
  selector: 'app-dashboard-customer-notifications',
  templateUrl: './dashboard-customer-notifications.component.html',
  styleUrls: ['./dashboard-customer-notifications.component.css']
})
export class DashboardCustomerNotificationsComponent {
  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Cliente', link: '/dashboard-customer' },
      { label: 'Notificações' },
    ],
  };
}
