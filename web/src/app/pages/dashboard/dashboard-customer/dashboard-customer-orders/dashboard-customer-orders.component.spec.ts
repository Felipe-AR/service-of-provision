import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCustomerOrdersComponent } from './dashboard-customer-orders.component';

describe('DashboardCustomerOrdersComponent', () => {
  let component: DashboardCustomerOrdersComponent;
  let fixture: ComponentFixture<DashboardCustomerOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCustomerOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCustomerOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
