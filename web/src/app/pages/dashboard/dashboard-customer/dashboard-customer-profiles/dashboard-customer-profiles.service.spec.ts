import { TestBed } from '@angular/core/testing';

import { DashboardCustomerProfilesService } from './dashboard-customer-profiles.service';

describe('DashboardCustomerProfilesService', () => {
  let service: DashboardCustomerProfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardCustomerProfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
