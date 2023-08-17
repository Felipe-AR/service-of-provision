import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCustomerHomeComponent } from './dashboard-customer-home.component';

describe('DashboardCustomerHomeComponent', () => {
  let component: DashboardCustomerHomeComponent;
  let fixture: ComponentFixture<DashboardCustomerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCustomerHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCustomerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
