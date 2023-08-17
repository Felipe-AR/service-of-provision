import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCustomerServiceProvidersComponent } from './dashboard-customer-service-providers.component';

describe('DashboardCustomerServiceProvidersComponent', () => {
  let component: DashboardCustomerServiceProvidersComponent;
  let fixture: ComponentFixture<DashboardCustomerServiceProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCustomerServiceProvidersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCustomerServiceProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
