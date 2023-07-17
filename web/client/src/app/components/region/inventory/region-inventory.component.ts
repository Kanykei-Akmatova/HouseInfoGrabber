import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseDataService } from 'src/app/services/house-data.service';

@Component({
  selector: 'app-region-inventory',
  templateUrl: './region-inventory.component.html',
  styleUrls: ['./region-inventory.component.scss'],
})
export class RegionInventoryComponent {
  regionCode: string = '';
  data: number[] = [];
  labels: string[] = [];
  dataLoaded = false;

  constructor(
    private houseDataService: HouseDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRegionInventoryByRegion(this.route.snapshot.params['code']);
  }

  getRegionInventoryByRegion(code: string): void {
    this.houseDataService.getRegionInventory(code).subscribe({
      next: (data) => {
        this.regionCode = code;
        this.data = data.map((a) => Number(a.house_count));
        this.labels = data.map((a) => 
          new Date(a.record_date).toDateString()
        );
        this.dataLoaded = true;
      },
      error: (e) => {
        console.error('Error occurred while loading data:', e);
        this.dataLoaded = true;
      }
    });
  }
}
