import { Router, Request, Response } from 'express';
import OrderEntity from '../entities/order.entity';
import OrderStatusItemEntity from '../entities/order-status-item.entity';
import JsonHandler from '../utils/json-handler';
import { BaseRepository } from '../repositories/base.repository';
import OrderModel from '../models/order.model';
import OrderRepository from '../repositories/order.repository';
import OrderStatusItemModel from '../models/order-status-item.model';
import { StatsModel } from '../models/stats.model';




export default class StatsService{
    
    private static id_cancelled = "0fc0ea4f-840a-4a45-b657-1a364fb4fe72"
    public static getMesIndexFromOrder(
        ordem : OrderEntity
        ): number {
            let mesString =  ordem.purchaseDate;
            let mesIndex = mesString.split("-")[1]; //string do mes, ex: '02' == fevereiro
            return Number(mesIndex)-1; //subtrai 1 para deixar 0 indexado
    } 
      
    public static getDiaIndexFromOrder(
        ordem : OrderEntity
        ): number {
            let dataString =  ordem.purchaseDate;
            let diaIndex = dataString.split("-")[2].split('T')[0] 
            
            return Number(diaIndex)-1; 
    }   
    
    public static getAnoFromOrder(
        ordem : OrderEntity
        ): Number {
            let anoString =  ordem.purchaseDate;
            return Number(anoString.split("-")[0]); 
            
    }   
    
    
    public static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    
    public static calcularMedia(arr: number[]){
        if (arr.length == 0){
            return 0;
        }
        return arr.reduce((a, b) => a + b, 0) / arr.length;
    }
    
    public static distribuicaoEstatisticaTempoAno(
        ordens : OrderEntity[],
        granularity : number
    ){
        let meses = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dec"];
        var dist = [];
        for (var i = 0; i < 12; i++){
            dist.push(0);
        }    
        
        if (ordens.length < 1){
            return {'dist': dist, 'bins': meses};
            
        }    
    
    
        for (let i = 0; i < ordens.length; i++) {
            let mesCompra = StatsService.getMesIndexFromOrder(ordens[i]);
            let valor = Number(ordens[i].totalValue);
            dist[mesCompra] += valor;
        }
        
        return {'dist': dist, 'bins': meses};
    };
    
    public static  distribuicaoEstatisticaTempoMes(
        ordens : OrderEntity[],
        granularity : number
    ) {
        let dias = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
        var dist = [];
        for (var i = 0; i < dias.length; i++){
            dist.push(0);
        }    
        
        if (ordens.length < 1){
            return {'dist': dist, 'bins': dias};
            
        }    
    
    
        for (let i = 0; i < ordens.length; i++) {
            let diaCompra = StatsService.getDiaIndexFromOrder(ordens[i]);
            let valor = Number(ordens[i].totalValue);
            dist[diaCompra] += valor;
        }
        
        return {'dist': dist, 'bins': dias};
    };
    
    
    public static  distribuicaoEstatisticaPreco(
        vals: number[],
        granularity : number
    ){
    
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
    
    public static priceMask(val: number): String{
        
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
    
    static async generateOrders(numberOfOrders : number) {
    
        const db = new OrderRepository()
    
        const baseOrder = (await db.getOrder()).at(0); //pega uma ordem como base
        //baseOrder?.purchaseDate
        for (let i :number = 0; i < numberOfOrders; i++){
            await db.createOrder(new OrderEntity({
                userId:         baseOrder?.id + String(i),
                totalValue:     String((Number(baseOrder?.totalValue)*Math.random())) ,
                purchaseDate:   "2023-"+"04-" + String(StatsService.getRandomInt(1,28)) +"T06:00:00Z"   ,
                //purchaseDate:  "2023-"+"04-29T06:00:00Z",
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
    
    static async ordersStats() {
            this.generateOrders(10)
            const db = new OrderRepository()
            let allOrders : OrderEntity[] = (await db.getOrder()) // pegar todos
            let currentMonth = new Date().getMonth()
            let currentYear = new Date().getFullYear()
            
            
            //filtra somente orden do mes atual
            let monthlyOrders = allOrders.filter((order) => StatsService.getMesIndexFromOrder(order) == currentMonth && StatsService.getAnoFromOrder(order) == currentYear);
        
            //filtra somente orden cancelados
            let cancelledOrders = allOrders.filter((order) => order.statusHistory.at(order.statusHistory.length-1)?.statusId ==  StatsService.id_cancelled);
            
            let cancelledValues = cancelledOrders.map((order) =>  Number(order.totalValue));
            let monthlyValues = monthlyOrders.map((order) => Number(order.totalValue));
            let totalValues = allOrders.map((order) => Number(order.totalValue)); //aplica operacao em todos
    
            return {
                "Ever": (new StatsModel(totalValues,allOrders, 10)).getStats(),
                "Monthly": (new StatsModel(monthlyValues,monthlyOrders, 10)).getStats('Monthly'),
                "Cancelled": (new StatsModel(cancelledValues,allOrders, 10)).getStats(),
            }
} 



}


