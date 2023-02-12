import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseDataService } from 'src/app/services/house-data.service';
import { IHouseItem, IHousePrice } from '../../../../../../common/model/house.model';

@Component({
  selector: 'house-trend',
  templateUrl: './house-trend.component.html',
  styleUrls: ['./house-trend.component.scss'],
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

  getHousesTrendByRegion(code: string): void {
    this.regionCode = code;
    this.houseDataService.getHousesTrendByRegion(code).subscribe({
      next: (data) => {
        this.housesTrend = data;
      },
      error: (e) => console.error(e),
    });
  }

  selectPriceDates(houseData: IHousePrice[]):string[] {
    return houseData.map(a => new Date(a.price_date).toDateString());
  }

  selectPrices(houseData: IHousePrice[]):number[] {
    let prices : number[] = houseData.map(a => a.amount);
    return prices;
  }
}
