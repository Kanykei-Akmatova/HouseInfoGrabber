import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HouseListComponent } from './components/house/list/house-list.component';
import { HouseSearchResultComponent } from './components/house/search/house-search-result.component';
import { HouseTrendComponent } from './components/house/trend/house-trend.component';
import { RegionHouseTrendComponent } from './components/region/trend/region-house-trend.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'house/list/:code', component: HouseListComponent },
  { path: 'house/trend', component: RegionHouseTrendComponent },
  { path: 'house/trend/:code', component: HouseTrendComponent },
  { path: 'house/search', component: HouseSearchResultComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
