import { Component } from '@angular/core';
import { PoBreadcrumb, PoListViewAction } from '@po-ui/ng-components';

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

  public readonly actions: PoListViewAction[] = [
    { 
      label: 'Marcar como lido', 
      icon: 'po-icon-ok', 
      disabled: true,
    }
  ]

  public notifications: any[] = [
    {
      id: '4d385379-b863-48eb-a350-a5364c295dec',
      readAt: new Date(),
      createdAt: new Date(),
      description: 'O pedido f87a3f79-fb86-47d2-a562-efcb0f68f504 foi alterado para concluído'
    }
  ];
}
