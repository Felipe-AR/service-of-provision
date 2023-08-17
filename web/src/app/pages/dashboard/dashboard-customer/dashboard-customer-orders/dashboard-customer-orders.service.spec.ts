import { TestBed } from '@angular/core/testing';

import { DashboardCustomerOrdersService } from './dashboard-customer-orders.service';

describe('DashboardCustomerOrdersService', () => {
  let service: DashboardCustomerOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardCustomerOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
