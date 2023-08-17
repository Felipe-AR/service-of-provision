import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PoModalComponent, PoTableColumn, PoPageAction, PoBreadcrumb, PoModalAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-dashboard-customer-home',
  templateUrl: './dashboard-customer-home.component.html',
  styleUrls: ['./dashboard-customer-home.component.css']
})
export class DashboardCustomerHomeComponent {
  public breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home ', link: '/' }, { label: 'Cliente' }],
  }
}
