import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplePoMenuHumanResourcesComponent } from './sample-po-menu-human-resources.component';

describe('SamplePoMenuHumanResourcesComponent', () => {
  let component: SamplePoMenuHumanResourcesComponent;
  let fixture: ComponentFixture<SamplePoMenuHumanResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamplePoMenuHumanResourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SamplePoMenuHumanResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
