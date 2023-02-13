import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseDataService } from 'src/app/services/house-data.service';
import { IHouseItem } from '../../../../../../common/model/house.model';

@Component({
  selector: 'house-search-result',
  templateUrl: './house-search-result.component.html',
  styleUrls: ['./house-search-result.component.scss'],
})
export class HouseSearchResultComponent implements OnInit {
  houses: IHouseItem[] = [];
  address: string = '';
  
  constructor(
    private houseDataService: HouseDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.getHousesByRegion(this.route.snapshot.params['address']);
    });
  }

  getHousesByRegion(address: string): void {
    this.address = address;
    this.houseDataService.searchHouseByAddress(address).subscribe({
      next: (data) => {
        this.houses = data;
      },
      error: (e) => console.error(e),
    });
  }
}
