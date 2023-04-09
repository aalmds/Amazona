

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
          1,
          2,
          3,
          4,
          5,
          6,
          7,
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