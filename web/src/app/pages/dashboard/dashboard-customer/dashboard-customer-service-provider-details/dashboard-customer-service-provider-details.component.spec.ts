import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCustomerServiceProviderDetailsComponent } from './dashboard-customer-service-provider-details.component';

describe('DashboardCustomerServiceProviderDetailsComponent', () => {
  let component: DashboardCustomerServiceProviderDetailsComponent;
  let fixture: ComponentFixture<DashboardCustomerServiceProviderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCustomerServiceProviderDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCustomerServiceProviderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
