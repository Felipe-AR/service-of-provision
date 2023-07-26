import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCustomerCategoriesComponent } from './dashboard-customer-categories.component';

describe('DashboardCustomerCategoriesComponent', () => {
  let component: DashboardCustomerCategoriesComponent;
  let fixture: ComponentFixture<DashboardCustomerCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCustomerCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCustomerCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
