import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataInterface } from 'src/app/models/data-interface';
import { DataService } from 'src/app/services/data.service';
import { Chart } from 'chart.js'
import { error } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css']
})
export class DataVisualizationComponent implements OnInit {

  constructor(private authService: AuthService, private dataService: DataService, private router: Router) { }

  username: String;
  data: DataInterface[];
  chart = [];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  ngOnInit() {
    this.username = this.authService.getUsername();
    this.dataService.getData().subscribe(
      data => {
        this.data = data;
        let temperature = this.data.map(data => data.temperature)
        let alldates = this.data.map(data => data.timestamp)

        let weatherDates = []
        alldates.forEach((date) => {
          let jsdate = new Date(date);
          weatherDates.push(jsdate.toLocaleTimeString('es', { year: 'numeric', month: 'short', day: 'numeric' }))
        })

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temperature,
                borderColor: '#3cba9f',
                fill: true
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        });
      },
      error => {
        console.log(error);
        this.router.navigate(['login']);
      },
      
    )
  }
}







