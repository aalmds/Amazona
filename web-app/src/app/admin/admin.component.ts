

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

  minValueM: number = 800;
  maxValueM: number = 1000;
  averageValueM: number = 900;

  minValueC: number = 800;
  maxValueC: number = 1000;
  averageValueC: number = 900;

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

      this.minValueM = response.Monthly.min;
      this.maxValueM = response.Monthly.max;
      this.averageValueM = response.Monthly.mean;

      this.minValueC = response.Cancelled.min;
      this.maxValueC = response.Cancelled.max;
      this.averageValueC = response.Cancelled.mean;


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

  getMinValue(tipo : string): number {
  
    if (tipo == 'Ever') return this.minValue;
    if(tipo =='Monthly') return this.minValueM;
    return this.minValueC
  }

  getMaxValue(tipo : string): number {
    if (tipo == 'Ever')   return this.maxValue;
    if(tipo == 'Monthly') return this.maxValueM;
    return this.maxValueC
  }

  getAverageValue(tipo : string): number {
    
    if (tipo == 'Ever')   return this.averageValue;
    if(tipo == 'Monthly') return this.averageValueM;
    return this.averageValueC;
  }
  // getMinValueM(): number {
  //   return this.minValueM;
  // }

  // getMaxValueM(): number {
  //   return this.maxValueM;
  // }

  // getAverageValueM(): number {
  //   return this.averageValueM;
  // }
  // getMinValueC(): number {
  //   return this.minValueC;
  // }
  
  // getMaxValueC(): number {
  //   return this.maxValueC;
  // }
  
  // getAverageValueC(): number {
  //   return this.averageValueC;
  // }
  
}