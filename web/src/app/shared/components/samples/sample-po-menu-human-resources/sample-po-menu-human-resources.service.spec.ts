import { TestBed } from '@angular/core/testing';

import { SamplePoMenuHumanResourcesService } from './sample-po-menu-human-resources.service';

describe('SamplePoMenuHumanResourcesService', () => {
  let service: SamplePoMenuHumanResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SamplePoMenuHumanResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
