import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgChartsModule } from 'ng2-charts';
import { NavbarComponent } from './components/nav/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegionStatsComponent } from './components/region/stats/region-stats.component';
import { HouseListComponent } from './components/house/list/house-list.component';
import { HouseTrendComponent } from './components/house/trend/house-trend.component';
import { RegionHouseTrendComponent } from './components/region/trend/region-house-trend.component';
import { HouseTrendChartComponent } from './components/house/trend/house-trend-chart.component';
import { HouseSearchResultComponent } from './components/house/search/house-search-result.component';
import { RegionInventoryComponent } from './components/region/inventory/region-inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegionStatsComponent,
    HouseListComponent,
    HouseTrendComponent,
    RegionHouseTrendComponent,
    HouseTrendChartComponent,
    HouseSearchResultComponent,
    RegionInventoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
