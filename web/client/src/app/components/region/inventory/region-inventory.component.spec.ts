import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionInventoryComponent } from './region-inventory.component';

describe('RegionInventoryComponent', () => {
  let component: RegionInventoryComponent;
  let fixture: ComponentFixture<RegionInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
