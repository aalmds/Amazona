import { Router, Request, Response } from 'express';
import OrderEntity from '../entities/order.entity';
import JsonHandler from '../utils/json-handler';
import { BaseRepository } from '../repositories/base.repository';
import OrderModel from '../models/order.model';
import OrderRepository from '../repositories/order.repository';

let getMesIndexFromOrder: (ordem: OrderEntity) => Number = function(
    ordem : OrderEntity
    ): Number {
        let mesString =  ordem.purchaseDate;
        let mesIndex = mesString.split("-")[1]; //string do mes, ex: '02' == fevereiro
        return Number(mesIndex)-1; //subtrai 1 para deixar 0 indexado
}   

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

let distribuicaoEstatistica: ((vals : number[], granularity : number) => number[]) = function (
    vals: number[],
    granularity : number
): number[] {


    var sorted_vals: number[] = vals.sort((n1,n2) => n1 - n2);
    
    let minimo = sorted_vals[0]; //Math.min(...vals);
    let maximo = sorted_vals.slice(-1)[0]; //Math.max(...vals);
    let bin_width = (maximo - minimo)/granularity;
    let dist : number[] = [0];

    var cur_bin = minimo;
    var next_bin = minimo + bin_width;
    var bin_index = 0;

    let j = 0;
    while (j < sorted_vals.length) {
        let valor = sorted_vals[j];
        if ( (cur_bin <= valor) && (sorted_vals[j] <  next_bin) )  {
            dist[bin_index]++;
            j++;
            console.log(valor)
        }
        else{
            bin_index ++;
            dist.push(0);
            cur_bin = next_bin;
            next_bin += bin_width;
            console.log("---")
            console.log(cur_bin)
            console.log(next_bin)
            console.log(j)
            console.log("---")
        }
        if (j >= sorted_vals.length){
            break;
        }
    }
    return dist;
};

export default class AdminController {
    private prefix: string = '/admin';
    public router: Router;
    db: OrderRepository
    
    constructor(router: Router) {
        this.router = router;
        this.initRoutes();
        this.db = new OrderRepository()
    }

    // funca que gera ordens aleatorias a partir de uma ordem base ja feita 
    private async generateOrders(numberOfOrders : number) {
        const baseOrder = (await this.db.getOrder()).at(0); //pega uma ordem como base
        //baseOrder?.purchaseDate
        for (let i :number = 0; i < numberOfOrders; i++){
            await this.db.createOrder(new OrderEntity({
                userId:         baseOrder?.id + String(i),
                totalValue:     String((Number(baseOrder?.totalValue)*Math.random())) ,
                purchaseDate:   "2023-" + String(getRandomInt(1,13)) + "-29T06:00:00Z"   ,
                statusHistory:  baseOrder?.statusHistory   ,
                productsIds:    baseOrder?.productsIds     , 
                address :       baseOrder?.address         ,
                payment:        baseOrder?.payment }         
            ))
        }
    }    
    private initRoutes() {
        this.router.get(this.prefix, async (req , res ) => { 
            
            let orders_arr : OrderEntity[] = (await this.db.getOrder()) // pegar todos
            let currentMonth = new Date().getMonth()
            
            //filtra somente orden do mes atual
            let monthlyOrders = orders_arr.filter((order) => getMesIndexFromOrder(order) == currentMonth);
            
            let monthlyValues = monthlyOrders.map((order) => Number(order.totalValue));
            let totalValues = orders_arr.map((order) => Number(order.totalValue)); //aplica operacao em todos
            // let totalValues_filter_data = orders_arr.map((order) => { // retorna undifined em alguns casos
            //    if(order.purchaseDate > "20/02")
            //         return order.totalValue
            // })
        
            
            res.status(200);
            res.send({
                "Ever":{
                            "all": totalValues,
                            "max": Math.max(...totalValues),
                            "min": Math.min(...totalValues),
                            "mean": totalValues.reduce((a, b) => a + b, 0) / totalValues.length,
                            "distribution": distribuicaoEstatistica(totalValues, 5),
                        },
                "Monthly":{
                            "all": monthlyValues,
                            "max": Math.max(...monthlyValues),
                            "min": Math.min(...monthlyValues),
                            "mean": monthlyValues.reduce((a, b) => a + b, 0) / monthlyValues.length,
                           "distribution": distribuicaoEstatistica(monthlyValues, 5),
                        }
                });
                });
            

            //this.db.add()
    }
}



// C:\Users\rodri\Documents\GitHub\Amazona\server\src\data\orders.json
// C:\Users\rodri\Documents\GitHub\Amazona\server\dist\src\data\orders.json
