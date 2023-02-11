import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegionStat } from '../../../../common/model/region.model';
import { IHouse } from '../../../../common/model/house.model';

const baseUrl = 'http://localhost:5000/api';

@Injectable({
  providedIn: 'root',
})
export class HouseDataService {
  constructor(private http: HttpClient) {}

  getRegionStat(): Observable<IRegionStat[]> {
    return this.http.get<IRegionStat[]>(`${baseUrl}/region/report`);
  }

  getHousesByRegion(id: any): Observable<IHouse[]> {
    return this.http.get<IHouse[]>(`${baseUrl}/house/list/${id}`);
  }
}
