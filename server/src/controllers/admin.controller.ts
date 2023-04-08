import { Router, Request, Response } from 'express';
import OrderEntity from '../entities/order.entity';
import JsonHandler from '../utils/json-handler';
import { BaseRepository } from '../repositories/base.repository';
import OrderModel from '../models/order.model';
import OrderRepository from '../repositories/order.repository';

let distribuicao_estatistica: ((vals : number[], granularity : number) => number[]) = function (
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
    while (j <= sorted_vals.length) {
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

    private async generateOrders(numberOfOrders : number) {
        const baseOrder = (await this.db.getOrder()).at(0);
        baseOrder?.purchaseDate
        for (let i :number = 0; i < numberOfOrders; i++){
            await this.db.createOrder(new OrderEntity({
                userId:         baseOrder?.id + String(i),
                totalValue:     String((Number(baseOrder?.totalValue)*Math.random())) ,
                purchaseDate:   baseOrder?.purchaseDate    ,
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
            let recentOrders = orders_arr.filter((order) => order.purchaseDate > "20/10") //filtra
            let totalValues = orders_arr.map((order) => Number(order.totalValue)) //aplica operacao em todos
            let totalValues_filter_data = orders_arr.map((order) => { // retorna undifined em alguns casos
               if(order.purchaseDate > "20/02")
                    return order.totalValue
            })
        
            
            console.log(orders_arr);
            res.status(200);
            res.send({
                "all": totalValues,
                "max": Math.max(...totalValues),
                "min": Math.min(...totalValues),
                "mean": totalValues.reduce((a, b) => a + b, 0) / totalValues.length,
                //"distribution": distribuicao_estatistica(totalValues_filter_data, 10),
                
                });
            

            //this.db.add()
        })
    }

}

// C:\Users\rodri\Documents\GitHub\Amazona\server\src\data\orders.json
// C:\Users\rodri\Documents\GitHub\Amazona\server\dist\src\data\orders.json
