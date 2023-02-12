import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'house-trend-chart',
  templateUrl: './house-trend-chart.component.html',
  styleUrls: ['./house-trend-chart.component.scss'],
})
export class HouseTrendChartComponent implements OnInit {
  @Input()
  chartLabels: string[] = [];

  @Input()
  chartData: number[] = [];

  @Input()
  chartLabel: string = '';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: '',
        fill: false,
        tension: 0.2,
        borderColor: 'seagreen',
        backgroundColor: 'whitesmoke',
        pointHitRadius: 15, // expands the hover 'detection' area
        pointHoverRadius: 5, // grows the point when hovered

        pointRadius: 2,
        borderWidth: 3, // main line width
        hoverBorderWidth: 0, // borders on points
        pointBorderWidth: 0, // removes POINT borders
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false    
  };

  public lineChartLegend = true;

  constructor() {}

  ngOnInit() {
    this.lineChartData.labels = this.chartLabels;
    this.lineChartData.datasets[0].data = this.chartData;
    this.lineChartData.datasets[0].label = this.chartLabel;
  }
}
