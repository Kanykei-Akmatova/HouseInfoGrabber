import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseTrendChartComponent } from './house-trend-chart.component';

describe('HouseTrendChartComponent', () => {
  let component: HouseTrendChartComponent;
  let fixture: ComponentFixture<HouseTrendChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseTrendChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseTrendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
