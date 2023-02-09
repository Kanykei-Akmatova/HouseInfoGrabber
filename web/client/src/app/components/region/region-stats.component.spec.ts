import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionStatsComponent } from './region-stats.component';

describe('RegionStatsComponent', () => {
  let component: RegionStatsComponent;
  let fixture: ComponentFixture<RegionStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
