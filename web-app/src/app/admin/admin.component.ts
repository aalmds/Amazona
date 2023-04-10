

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  firstChart: any;
  secondChart: any;
  thirdChart: any;
  data: any;

  constructor(private http: HttpClient) {}

  minValue: number = 800;
  maxValue: number = 1000;
  averageValue: number = 900;
  productName: string = 'Camisa azul';
  productPrice: number = 850;

  ngOnInit() {
    this.http.get<{
      Ever: {
        all: number[],
        max: number,
        min: number,
        mean: number,
        priceDistribution: { 
                        'dist': number[],
                        'bins': number[]
                          }
        timeDistribution:  { 
          'dist': number[],
          'bins': number[]
                            }
      },
      Monthly: {
        all: number[],
        max: number,
        min: number,
        mean: number,
        priceDistribution: { 
                        'dist': number[],
                        'bins': number[]
                    }
        timeDistribution:  { 
          'dist': number[],
          'bins': number[]
      }},
      Cancelled: {
        all: number[],
        max: number,
        min: number,
        mean: number,
        priceDistribution: { 
                        'dist': number[],
                        'bins': number[]
                    }
        timeDistribution:  { 
          'dist': number[],
          'bins': number[]
      }}

    }>('http://localhost:3000/api/admin')
    .subscribe((response) =>{
      this.minValue = response.Ever.min;
      this.maxValue = response.Ever.max;
      this.averageValue = response.Ever.mean;
      this.firstChart = new Chart('myChart', {
        type: 'bar',
        data: {
          labels: response.Ever.priceDistribution.bins,
          datasets: [
            {
              label: 'Receita',
              data: response.Ever.priceDistribution.dist,
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
      this.secondChart = new Chart('secondChart', {
        type: 'bar',
        data: {
          labels: response.Monthly.priceDistribution.bins,
          datasets: [
            {
              label: 'Receita',
              data: response.Monthly.priceDistribution.dist,
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
      this.thirdChart = new Chart('thirdChart', {
        type: 'bar',
        data: {
          labels: response.Cancelled.priceDistribution.bins,
          datasets: [
            {
              label: 'Valor Cancelado',
              data: response.Cancelled.priceDistribution.dist,
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