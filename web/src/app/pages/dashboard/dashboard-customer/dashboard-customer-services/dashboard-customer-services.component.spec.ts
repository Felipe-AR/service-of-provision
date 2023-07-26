import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCustomerServicesComponent } from './dashboard-customer-services.component';

describe('DashboardCustomerServicesComponent', () => {
  let component: DashboardCustomerServicesComponent;
  let fixture: ComponentFixture<DashboardCustomerServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCustomerServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCustomerServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
