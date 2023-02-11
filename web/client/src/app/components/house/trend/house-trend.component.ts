import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseDataService } from 'src/app/services/house-data.service';
import { IHouseItem } from '../../../../../../common/model/house.model';

@Component({
  selector: 'house-trend',
  templateUrl: './house-trend.component.html',
  styleUrls: ['./house-trend.component.scss']
})
export class HouseTrendComponent implements OnInit {
  housesTrend: IHouseItem[] = [];
  regionCode: string = '';
  today?: Date;

  constructor(
    private houseDataService: HouseDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.today = new Date();
    this.getHousesTrendByRegion(this.route.snapshot.params['code']);
  }

  getDayDiff(startDate: Date, endDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;
  
    // 👇️ explicitly calling getTime()
    return Math.round(
      Math.abs(endDate.getTime() - startDate.getTime()) / msInDay,
    );
  }

  getHousesTrendByRegion(code: string): void {
    this.regionCode = code;
    this.houseDataService.getHousesTrendByRegion(code).subscribe({
      next: (data) => {
        this.housesTrend = data;
      },
      error: (e) => console.error(e),
    });
  }
}
