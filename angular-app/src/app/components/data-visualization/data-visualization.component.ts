import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataInterface } from 'src/app/models/data-interface';
import { DataService } from 'src/app/services/data.service';
import { Chart } from 'chart.js'
import { error } from 'protractor';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css']
})
export class DataVisualizationComponent implements OnInit {

  constructor(private authService: AuthService, private dataService: DataService, private router: Router) { }

  username: String;
  data: DataInterface[];
  chartTemperature = [];
  chartHumidities = [];
  subscription: Subscription

  ngOnInit() {
    this.username = this.authService.getUsername();
    console.log(this.username);
    this.getData();
  }
  
  getData() {
    this.dataService.getData().subscribe(
      res => {
        console.log("holii");
        this.data = res;
        let temperatures = res.map(data => data.temperature);
        let humidities = res.map(data => data.humidity);
        let alldates = res.map(data => data.timestamp);

        let weatherDates = []
        alldates.forEach((date) => {
          let jsdate = new Date(date);
          weatherDates.push(jsdate.toLocaleTimeString('es', { year: 'numeric', month: 'short', day: 'numeric' }))
        })

        let options = {
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
        console.log("rada")
        this.chartTemperature = this.createLineChart('canvasTemperature', weatherDates, temperatures, options, 'RED');
        this.chartHumidities = this.createLineChart('canvasHumidities', weatherDates, humidities, options, 'BLUE');
      },
      error => {
        console.log(error);
        console.log("un error");
        this.router.navigate(['/login']);
      },
      () => { // when complete
        // this is called, ok!
        console.log("meeeeeeeelo");
      }
    )
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  createLineChart(name: String, labels: any[], data: any[], options: {}, color: String) {
    return new Chart(name, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            borderColor: color,
            fill: true
          }
        ]
      },
      options: options
    });
  }
}







