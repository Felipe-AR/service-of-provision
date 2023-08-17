import { TestBed } from '@angular/core/testing';

import { DashboardCustomerServiceProvidersService } from './dashboard-customer-service-providers.service';

describe('DashboardCustomerServiceProvidersService', () => {
  let service: DashboardCustomerServiceProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardCustomerServiceProvidersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
