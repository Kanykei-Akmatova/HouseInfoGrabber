import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegionStat } from '../../../../common/model/region.model';

const baseUrl = 'http://localhost:5000/api';

@Injectable({
  providedIn: 'root',
})
export class HouseDataService {
  constructor(private http: HttpClient) {}

  getRegionStat(): Observable<IRegionStat[]> {
    return this.http.get<IRegionStat[]>(`${baseUrl}/region/report`);
  }

  //   get(id: any): Observable<Tutorial> {
  //     return this.http.get<Tutorial>(`${baseUrl}/${id}`);
  //   }
}
