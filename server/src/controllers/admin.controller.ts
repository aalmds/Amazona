import { Router, Request, Response } from 'express';
import OrderEntity from '../entities/order.entity';
import OrderStatusItemEntity from '../entities/order-status-item.entity';
import JsonHandler from '../utils/json-handler';
import { BaseRepository } from '../repositories/base.repository';
import OrderModel from '../models/order.model';
import OrderRepository from '../repositories/order.repository';
import OrderStatusItemModel from '../models/order-status-item.model';


let getDiaIndexFromOrder: (ordem: OrderEntity) => number = function(
    ordem : OrderEntity
    ): number {
        let dataString =  ordem.purchaseDate;
        let diaIndex = dataString.split("-").slice(0,2); 
        
        return Number(diaIndex)-1; 
}   

let getMesIndexFromOrder: (ordem: OrderEntity) => number = function(
    ordem : OrderEntity
    ): number {
        let mesString =  ordem.purchaseDate;
        let mesIndex = mesString.split("-")[1]; //string do mes, ex: '02' == fevereiro
        return Number(mesIndex)-1; //subtrai 1 para deixar 0 indexado
}   

let getAnoFromOrder: (ordem: OrderEntity) => Number = function(
    ordem : OrderEntity
    ): Number {
        let anoString =  ordem.purchaseDate;
        return Number(anoString.split("-")[0]); 
        
}   


function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function calcularMedia(arr: number[]){
    if (arr.length == 0){
        return 0;
    }
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

let distribuicaoEstatisticaTempoAno: ((ordens : OrderEntity[]  , granularity : number) => {'dist': number[],'bins': String[]}) = function (
    ordens : OrderEntity[],
    granularity : number
): {'dist': number[],'bins': String[]} {
    let meses = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dec"];
    var dist = [];
    for (var i = 0; i < 12; i++){
        dist.push(0);
    }    
    
    if (ordens.length < 1){
        return {'dist': dist, 'bins': meses};
        
    }    


    for (let i = 0; i < ordens.length; i++) {
        let mesCompra = getMesIndexFromOrder(ordens[i]);
        let valor = Number(ordens[i].totalValue);
        dist[mesCompra] += valor;
    }
    
    return {'dist': dist, 'bins': meses};
};

let distribuicaoEstatisticaTempoMes: ((ordens : OrderEntity[]  , granularity : number) => {'dist': number[],'bins': String[]}) = function (
    ordens : OrderEntity[],
    granularity : number
): {'dist': number[],'bins': String[]} {
    let dias = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
    var dist = [];
    for (var i = 0; i < dias.length; i++){
        dist.push(0);
    }    
    
    if (ordens.length < 1){
        return {'dist': dist, 'bins': dias};
        
    }    


    for (let i = 0; i < ordens.length; i++) {
        let mesCompra = getMesIndexFromOrder(ordens[i]);
        let valor = Number(ordens[i].totalValue);
        dist[mesCompra] += valor;
    }
    
    return {'dist': dist, 'bins': dias};
};


let distribuicaoEstatisticaPreco: ((vals : number[], granularity : number) => {'dist': number[],'bins': String[]}) = function (
    vals: number[],
    granularity : number
): {'dist': number[],'bins': String[]} {

    if (vals.length < 2){
        return {'dist': [1], 'bins': [String(vals[0])]};
        
    }
    var sorted_vals: number[] = vals.sort((n1,n2) => n1 - n2);
    
    let minimo = sorted_vals[0]; //Math.min(...vals);
    let maximo = sorted_vals.slice(-1)[0]; //Math.max(...vals);
    let bin_width = (maximo - minimo)/granularity;
    let dist : number[] = [0];

    var bins : String[] = [];
    var cur_bin = minimo;
    var next_bin = minimo + bin_width;
    var bin_index = 0;

    let j = 0;
    while (j < sorted_vals.length) {
        let valor = sorted_vals[j];
        if ( (cur_bin <= valor) && (sorted_vals[j] <  next_bin) )  {
            dist[bin_index]++;
            j++;
            //console.log(valor)
        }
        else{
            bin_index ++;
            dist.push(0);
            bins.push("R$(" + String(Math.floor(cur_bin))+"-"+String(Math.floor(next_bin))+ ")") ;
            cur_bin = next_bin;
            next_bin += bin_width;
            // console.log("---")
            // console.log(cur_bin)
            // console.log(next_bin)
            // console.log(j)
            // console.log("---")
        }
        if (j >= sorted_vals.length){
            break;
        }
    }
    return {'dist': dist, 'bins': bins};
};

let priceMask :  ((val: number) => String) = function(val: number): String{
    
    var value = String(val).split('.');
    var precoString = "";
    if (value.length == 1){
        precoString = value[0] + ",00";
    }
    else{
        
        precoString = value[0]+ "," +  value[1].slice(0,2);
        
    }
    console.log("preco: ",precoString);
    console.log(value);
    return precoString 
}

let id_cancelados = "0fc0ea4f-840a-4a45-b657-1a364fb4fe72"

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
                //purchaseDate:   String(getRandomInt(2020,2024)) + "-" + "04" + "-" + String(getRandomInt(1,28)) +"T06:00:00Z"   ,
                purchaseDate:  "2023-"+"04-29T06:00:00Z",
                statusHistory:  [
                                {
                                    "id":"c1894648-0e07-48b2-b988-b05ed49c9aa6",
                                    "statusId":"f307102d-698b-4ad5-adf6-de7281243583",
                                    "date":"2023-01-29T06:00:00Z"
                                },
                                {
                                    "id":"042045ac-b6a5-4e0b-8f80-cb85d823af8d",
                                    "statusId":"8bbb7b46-17d6-4df3-8171-0003814e3812",
                                    "date":"2023-01-29T08:00:00Z"
                                }  ],
                productsIds:    baseOrder?.productsIds     , 
                address :       baseOrder?.address         ,
                payment:        baseOrder?.payment }         
            ))
        }
    } 
 
    private initRoutes() {
        this.router.get(this.prefix, async (req , res ) => { 
            //this.generateOrders(100)
            let orders_arr : OrderEntity[] = (await this.db.getOrder()) // pegar todos
            let currentMonth = new Date().getMonth()
            let currentYear = new Date().getFullYear()
            
            
            //filtra somente orden do mes atual
            let monthlyOrders = orders_arr.filter((order) => getMesIndexFromOrder(order) == currentMonth && getAnoFromOrder(order) == currentYear);
    
            //filtra somente orden cancelados
            let cancelledOrders = orders_arr.filter((order) => order.statusHistory.at(order.statusHistory.length-1)?.statusId == id_cancelados);
            
            let cancelledValues = cancelledOrders.map((order) =>  Number(order.totalValue));
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
                    "max": priceMask(Math.max(...totalValues)),
                    "min": priceMask(Math.min(...totalValues)),
                    "mean": priceMask(calcularMedia(totalValues)),
                    "priceDistribution":distribuicaoEstatisticaPreco(totalValues, 10),
                    "timeDistribution": distribuicaoEstatisticaTempoAno(orders_arr, 10),
                }, 
                "Monthly":{
                    "all": monthlyValues,
                    "max":  priceMask(Math.max(...monthlyValues)),
                    "min":  priceMask(Math.min(...monthlyValues)),
                    "mean": priceMask(calcularMedia(monthlyValues)),
                    "priceDistribution": distribuicaoEstatisticaPreco(monthlyValues, 10),
                    "timeDistribution": distribuicaoEstatisticaTempoMes(monthlyOrders, 10),
                },
                
                "Cancelled":{
                    "all": cancelledValues,
                    "max":  priceMask(Math.max(...cancelledValues)),
                    "min":  priceMask(Math.min(...cancelledValues)),
                    "mean": priceMask(calcularMedia(cancelledValues)),
                    "priceDistribution": distribuicaoEstatisticaPreco(cancelledValues, 10),
                    "timeDistribution": distribuicaoEstatisticaTempoAno(cancelledOrders, 10),
                }
                

                });
                });
            

            //this.db.add()
    }
}
