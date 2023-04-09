

import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  template: '<canvas id="myChart"></canvas>',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  chart: any;

  ngOnInit() {
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#4bc0c0',
          },
          {
            label: 'Expenses',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: '#565656',
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
      },
    });
  }
}