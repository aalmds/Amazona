

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
  data: any;

  constructor(private http: HttpClient) {}

  minValue: number = 800;
  maxValue: number = 1000;
  averageValue: number = 900;
  productName: string = 'Camisa azul';
  productPrice: number = 850;

  ngOnInit() {
    this.http.get<{Ever: {all: number[], max: number, min: number, mean: number, distribution: number[]}}>('http://localhost:3000/api/admin')
    .subscribe((response) =>{
      console.log("CHART", response.Ever.distribution);
      this.minValue = response.Ever.min;
      this.maxValue = response.Ever.max;
      this.averageValue = response.Ever.mean;
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
            data: response.Ever.distribution,
            //fill: true,
            backgroundColor: "#ff9900",
          }
          
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
      },
    });
  })
  }

  getMinValue(): number {
    return this.minValue;
  }

  getMaxValue(): number {
    return this.maxValue;
  }

  getAverageValue(): number {
    return this.averageValue;
  }

  getProductName(): string {
    return this.productName;
  }

  getProductPrice(): number {
    return this.productPrice;
  }
}