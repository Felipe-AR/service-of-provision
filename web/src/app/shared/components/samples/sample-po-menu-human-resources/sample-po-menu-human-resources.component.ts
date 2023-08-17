import { Component, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoCheckboxGroupOption, PoMenuItem, PoModalAction, PoModalComponent, PoRadioGroupOption, PoSelectOption } from '@po-ui/ng-components';
import { SamplePoMenuHumanResourcesService } from './sample-po-menu-human-resources.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/api/user/user.service';

@Component({
  selector: 'app-sample-po-menu-human-resources',
  templateUrl: './sample-po-menu-human-resources.component.html',
  styleUrls: ['./sample-po-menu-human-resources.component.css']
})
export class SamplePoMenuHumanResourcesComponent {
  @ViewChild(PoModalComponent, { static: true }) public poModal: PoModalComponent;

  public menus: Array<PoMenuItem> = [
    {
      label: 'Página Inicial',
      shortLabel: 'Início',
      link: '/dashboard-customer',
      icon: 'po-icon po-icon-home'
    },
    {
      label: 'Notificações',
      shortLabel: 'Notificações',
      link: '/dashboard-customer/notifications',
      icon: 'po-icon po-icon-notification',
      badge: { value: 0 }
    },
    {
      label: 'Prestadores de Serviço',
      shortLabel: 'Serviços',
      icon: 'po-icon po-icon-arrow-right',
      link: '/dashboard-customer/service-providers/'
    },
    {
      label: 'Pedidos',
      shortLabel: 'Pedidos',
      icon: 'po-icon po-icon-clock',
      link: '/dashboard-customer/orders'
    },
    {
      label: 'Perfil',
      shortLabel: 'Perfil',
      link: '/dashboard-customer/profiles',
      icon: 'po-icon po-icon-user'
    },
    {
      label: 'Sair',
      shortLabel: 'Sair',
      icon: 'po-icon po-icon-close',
      action: this.openModal.bind(this)
    }
  ];

  constructor(
    private userService: UserService
  ) {}

  public greetingsMessage(): string {
    let greetingsMessage = '';
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour >= 6 && currentHour < 12 )
      greetingsMessage = 'Bom dia';
    else if (currentHour >= 12 && currentHour < 18)
      greetingsMessage = 'Boa tarde';
    else
      greetingsMessage = 'Boa noite';

    return greetingsMessage;
  }

  public primaryModalAction: PoModalAction = {
    label: 'Confirmar',
    action: () => this.userService.logout(),
  };

  public secondaryModalAction: PoModalAction = {
    label: 'Cancelar',
    action: () => this.poModal.close(),
  };

  public openModal() {
    this.poModal.open();
  }
}
