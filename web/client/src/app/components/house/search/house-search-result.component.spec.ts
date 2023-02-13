import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseSearchResultComponent } from './house-search-result.component';

describe('HouseSearchResultComponent', () => {
  let component: HouseSearchResultComponent;
  let fixture: ComponentFixture<HouseSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseSearchResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
