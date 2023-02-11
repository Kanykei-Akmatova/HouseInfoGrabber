import { Component, OnInit } from '@angular/core';
import { HouseDataService } from 'src/app/services/house-data.service';
import { IRegionStat } from '../../../../../../common/model/region.model';

@Component({
  selector: 'region-house-trend',
  templateUrl: './region-house-trend.component.html',
  styleUrls: ['./region-house-trend.component.scss']
})
export class RegionHouseTrendComponent implements OnInit {
  regionStats?: IRegionStat[];

  constructor(private houseDataService: HouseDataService) {}

  ngOnInit(): void {
    this.getRegionStat();
  }

  getRegionStat(): void {
    this.houseDataService.getRegionStat().subscribe({
      next: (data) => {
        this.regionStats = data;
      },
      error: (e) => console.error(e),
    });
  }
}