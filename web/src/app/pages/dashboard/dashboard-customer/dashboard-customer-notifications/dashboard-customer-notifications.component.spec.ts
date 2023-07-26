import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCustomerNotificationsComponent } from './dashboard-customer-notifications.component';

describe('DashboardCustomerNotificationsComponent', () => {
  let component: DashboardCustomerNotificationsComponent;
  let fixture: ComponentFixture<DashboardCustomerNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCustomerNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCustomerNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
