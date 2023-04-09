

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  chart: any;

  ngOnInit() {
    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: [
          1,//'January',
          2,//'February',
          3,//'March',
          4,//'April',
          5,//'May',
          6,//'June',
          7,//'July',
        ],
        datasets: [
          {
            label: 'Receita',
            data: [65, 59, 80, 81, 56, 55, 40],
            //fill: true,
            borderColor: "#ff9900",
          }
          
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
      },
    });
  }
}