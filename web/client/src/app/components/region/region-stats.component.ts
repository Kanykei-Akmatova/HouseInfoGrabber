import { Component, OnInit } from '@angular/core';
import { HouseDataService } from '../../services/house-data.service';
import { IRegionStat } from '../../../../../common/model/region.model';

@Component({
  selector: 'region-stats',
  templateUrl: './region-stats.component.html',
  styleUrls: ['./region-stats.component.scss'],
})
export class RegionStatsComponent implements OnInit {
  regionStats?: IRegionStat[];

  constructor(private tutorialService: HouseDataService) {}

  ngOnInit(): void {
    this.getRegionStat();
  }

  getRegionStat(): void {
    this.tutorialService.getRegionStat().subscribe({
      next: (data) => {
        this.regionStats = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
