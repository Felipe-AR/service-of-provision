import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCustomerSettingsComponent } from './dashboard-customer-settings.component';

describe('DashboardCustomerSettingsComponent', () => {
  let component: DashboardCustomerSettingsComponent;
  let fixture: ComponentFixture<DashboardCustomerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCustomerSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCustomerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
