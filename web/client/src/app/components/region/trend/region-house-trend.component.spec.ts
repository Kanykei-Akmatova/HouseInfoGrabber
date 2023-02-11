import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionHouseTrendComponent } from './region-house-trend.component';

describe('RegionHouseTrendComponent', () => {
  let component: RegionHouseTrendComponent;
  let fixture: ComponentFixture<RegionHouseTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionHouseTrendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionHouseTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
