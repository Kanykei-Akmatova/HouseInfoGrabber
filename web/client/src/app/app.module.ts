import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/nav/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegionStatsComponent } from './components/region/stats/region-stats.component';
import { HouseListComponent } from './components/house/list/house-list.component';
import { HouseTrendComponent } from './components/house/trend/house-trend.component';
import { RegionHouseTrendComponent } from './components/region/trend/region-house-trend.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegionStatsComponent,
    HouseListComponent,
    HouseTrendComponent,
    RegionHouseTrendComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
