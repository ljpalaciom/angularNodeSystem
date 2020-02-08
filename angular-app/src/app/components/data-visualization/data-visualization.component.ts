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
  chartHumidity = [];
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
          responsive: true,
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              scaleLabel:{
                display: true,
                labelString: "time"
              },
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
        
        this.chartTemperature = this.createLineChart('Temperature', weatherDates, temperatures, options, 'RED');
        this.chartHumidity = this.createLineChart('Humidity', weatherDates, humidities, options, 'BLUE');
      },
      error => {
        console.log(error);
        this.router.navigate(['/login']);
      },
      () => { // when complete
        // this is called, ok!
      }
    )
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  createLineChart(name: String, labels: any[], data: any[], options: {}, color: String) {
    let nameChart = "canvas" + name;
    options["scales"]["yAxes"][0]["scaleLabel"] = {
      display: true,
      labelString: name
    }
    return new Chart(nameChart, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: name,
            data: data,
            borderColor: color,
            fill: true,
          }
        ]
      },
      options: options
    });
  }
}







