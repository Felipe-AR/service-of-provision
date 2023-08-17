import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCustomerProfilesComponent } from './dashboard-customer-profiles.component';

describe('DashboardCustomerProfilesComponent', () => {
  let component: DashboardCustomerProfilesComponent;
  let fixture: ComponentFixture<DashboardCustomerProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCustomerProfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCustomerProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
