import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoDynamicViewField } from '@po-ui/ng-components';
import { DashboardCustomerProfilesService } from './dashboard-customer-profiles.service';
import { PoPageDynamicEditField } from '@po-ui/ng-templates';
import { Customer, Gender, Role, User } from 'src/app/shared/models';
import { FlattenObject, flattenObject } from 'src/app/shared/utils';

@Component({
  selector: 'app-dashboard-customer-profiles',
  templateUrl: './dashboard-customer-profiles.component.html',
  styleUrls: ['./dashboard-customer-profiles.component.css']
})
export class DashboardCustomerProfilesComponent implements OnInit {
  public breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Perfil' }]
  };

  public customer: Customer & { user: Partial<User> } = {
    id: crypto.randomUUID(),
    name: 'Felipe Alexandre',
    surname: 'Ribeiro',
    rg: '11.222.333-4',
    cpf: '111.222.333.44',
    gender: Gender.MALE,
    user: {
      email: 'felipe251894@gmail.com',
      phone: '(18) 3302-1055',
      role: Role.CUSTOMER,
    }
  }

  public flattenCustomer: FlattenObject<Customer & { user: Partial<User> }>;

  public dynamicPersonalDataFields: PoDynamicViewField[];

  constructor(private dashboardCustomerProfilesService: DashboardCustomerProfilesService) {}

  public ngOnInit(): void {
    this.dynamicPersonalDataFields = this.dashboardCustomerProfilesService.getPersonalDataFields();
    this.flattenCustomer = flattenObject(this.customer);
  }
}
