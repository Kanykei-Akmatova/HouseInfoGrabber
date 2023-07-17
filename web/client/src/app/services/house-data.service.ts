import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { IRegionStat } from '../../../../common/model/region.model';
import { IHouse, IHouseItem } from '../../../../common/model/house.model';

const baseUrl = 'http://localhost:5000/api';

@Injectable({
  providedIn: 'root',
})
export class HouseDataService {
  constructor(private http: HttpClient) {}

  getRegionStat(): Observable<IRegionStat[]> {
    return this.http.get<IRegionStat[]>(`${baseUrl}/region/report`);
  }

  getRegionInventory(id: any): Observable<IRegionStat[]> {
    return this.http.get<IRegionStat[]>(`${baseUrl}/region/inventory/${id}`).pipe(
      catchError(() => of([]))
    );
  }

  getHousesByRegion(id: any): Observable<IHouse[]> {
    return this.http.get<IHouse[]>(`${baseUrl}/house/list/${id}`);
  }

  getHousesTrendByRegion(id: any): Observable<IHouseItem[]> {
    return this.http.get<IHouseItem[]>(`${baseUrl}/house/trend/${id}`);
  }

  searchHouseByAddress(address: any): Observable<IHouseItem[]> {
    return this.http.get<IHouseItem[]>(`${baseUrl}/house/search/${address}`);
  }
}
