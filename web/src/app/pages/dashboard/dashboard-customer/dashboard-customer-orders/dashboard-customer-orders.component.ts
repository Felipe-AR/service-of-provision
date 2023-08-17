import { Component, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumb, PoDynamicFormField, PoDynamicViewField, PoModalAction, PoModalComponent, PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { DashboardCustomerOrdersService } from './dashboard-customer-orders.service';
import { Order, OrderStatus } from 'src/app/shared/models';
import { FlattenObject, flattenObject } from 'src/app/shared/utils';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard-customer-orders',
  templateUrl: './dashboard-customer-orders.component.html',
  styleUrls: ['./dashboard-customer-orders.component.css']
})
export class DashboardCustomerOrdersComponent implements OnInit {
  public readonly breadcrumb: PoBreadcrumb = { 
    items: [ 
      { label: 'Home', link: '/' }, 
      { label: 'Cliente', link: '/dashboard-customer' }, 
      { label: 'Pedidos' }
    ]
  };

  @ViewChild('orderDetailModal') public orderDetailModal: PoModalComponent; 
  @ViewChild('orderRateFormModal') public orderRateFormModal: PoModalComponent;
  
  public tableColumns: PoTableColumn[];
  public dynamicOrderFields: PoDynamicViewField[];
  public dynamicRatingFormFields: PoDynamicFormField[];
  
  public orders: Order[];
  public selectedOrder: Order = {} as Order;
  public selectedOrderFlattened: FlattenObject<Order> = {} as FlattenObject<Order>;
  
  public rateOrderForm: NgForm;

  public tableActions: PoTableAction[] = [
    { 
      label: 'Visualizar', 
      icon: 'po-icon-eye', 
      action: (order: Order) => this.showModal(order, this.orderDetailModal) 
    },
    { 
      label: 'Baixar Relatorio', 
      icon: 'po-icon-download', 
      disabled: true 
    },
    { 
      label: 'Avaliar', 
      icon: 'po-icon-star', 
      disabled: (order: Order) => order.status !== OrderStatus.COMPLETED,  
      action: (order: Order) => this.showModal(order, this.orderRateFormModal)
    },
    { 
      label: 'Editar', 
      icon: 'po-icon-edit', 
      disabled: true 
    },
    { 
      label: 'Remover', 
      icon: 'po-icon-delete', 
      type: 'danger', 
      disabled: true 
    },
  ];

  public primaryActionRateModal: PoModalAction = {
    label: 'Enviar',
    action: () => this.sendOrderRating(),
    disabled: false
  }

  public secondaryActionRateModal: PoModalAction = {
    label: 'Voltar',
    action: () => this.orderRateFormModal.close(),
  }

  constructor(
    private dashboardCustomerOrdersService: DashboardCustomerOrdersService,
    private poNotificationService: PoNotificationService 
  ) {}

  ngOnInit(): void {
    this.orders = this.dashboardCustomerOrdersService.getOrders();
    this.tableColumns = this.dashboardCustomerOrdersService.getColumns();
    this.dynamicOrderFields = this.dashboardCustomerOrdersService.getDynamicOrderFields();
    this.dynamicRatingFormFields = this.dashboardCustomerOrdersService.getDynamicRatingFormFields();
  }

  public showModal(order: any, modal: PoModalComponent) {
    this.selectedOrder = order || {};
    this.selectedOrderFlattened = flattenObject(order);
    modal.open();
  }

  public sendOrderRating() {
    if (this.rateOrderForm.invalid) {
      this.poNotificationService.warning('Escolher a nota para confirmar a avaliação.');
    } else {
      this.primaryActionRateModal.loading = true;
      setTimeout(() => {
        this.primaryActionRateModal.loading = false;
        this.poNotificationService.success('A avaliação do pedido ' + this.selectedOrder.id + ' foi enviada.')
      }, 1000);
    }
  }

  public formatServicePriceToPoInfo(price: number): string {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  }

  public getRateOrderForm(form: NgForm) {
    this.rateOrderForm = form;
  }
}
