import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardServiceProviderComponent } from './dashboard-service-provider.component';

describe('DashboardServiceProviderComponent', () => {
  let component: DashboardServiceProviderComponent;
  let fixture: ComponentFixture<DashboardServiceProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardServiceProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardServiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
