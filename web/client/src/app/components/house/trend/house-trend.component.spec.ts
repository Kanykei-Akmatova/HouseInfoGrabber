import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseTrendComponent } from './house-trend.component';

describe('HouseTrendComponent', () => {
  let component: HouseTrendComponent;
  let fixture: ComponentFixture<HouseTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseTrendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
