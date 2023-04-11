

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
  firstChart2: any;
  secondChart2: any;
  firstChart3: any;
  secondChart3: any;
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
              label: 'Faixa de precos das compras',
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
          labels: response.Ever.timeDistribution.bins,
          datasets: [
            {
              label: 'Receita Mensal',
              data: response.Ever.timeDistribution.dist,
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
      
    this.firstChart2 = new Chart('myChart2', {
      type: 'bar',
      data: {
        labels: response.Monthly.priceDistribution.bins,
        datasets: [
          {
            label: 'quantidade de pedidos por valor',
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
    this.secondChart2 = new Chart('secondChart2', {
      type: 'bar',
      data: {
        labels: response.Monthly.timeDistribution.bins,
        datasets: [
          {
            label: 'Receita do dia',
            data: response.Monthly.timeDistribution.dist,
            backgroundColor: "#ff9900",
          }
          
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
      },
    });


    //cancelados
    this.firstChart3 = new Chart('thirdChart2', {
      type: 'bar',
      data: {
        labels: response.Cancelled.priceDistribution.bins,
        datasets: [
          {
            label: 'quantidade de compras canceladas',
            data: response.Cancelled.priceDistribution.dist,
            backgroundColor: "#ff9900",
          }
          
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
      },
  });

  this.secondChart3 = new Chart('myChart3', {
    type: 'bar',
    data: {
      labels: response.Cancelled.timeDistribution.bins,
      datasets: [
        {
          label: 'valor cancelado total',
          data: response.Cancelled.timeDistribution.dist,
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
this.secondChart3 = new Chart('secondChart3', {
  type: 'bar',
  data: {
    labels: response.Cancelled.priceDistribution.bins,
    datasets: [
      {
        label: 'quantidade de pedidos cancelados',
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