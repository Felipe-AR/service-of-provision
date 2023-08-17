import { Component, OnInit } from '@angular/core';

import { PoPageDynamicTableFilters } from '@po-ui/ng-templates';
import { DashboardCustomerServiceProvidersService } from './dashboard-customer-service-providers.service';

@Component({
  selector: 'app-dashboard-customer-service-providers',
  templateUrl: './dashboard-customer-service-providers.component.html',
  styleUrls: ['./dashboard-customer-service-providers.component.css']
})
export class DashboardCustomerServiceProvidersComponent implements OnInit {

  public dynamicTableFields: PoPageDynamicTableFilters[];

  constructor(private dashboardCustomerServiceProvidersService: DashboardCustomerServiceProvidersService) {}

  public ngOnInit(): void {
    this.dashboardCustomerServiceProvidersService.getFields();
  }
}
