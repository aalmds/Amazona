import OrderEntity from '../entities/order.entity';
import  StatsService  from '../services/admin.service';

export class StatsModel {
    all: number[]  = []                
    max: String = "" 
    min:   String = "" 
    mean:   String  = ""  
    priceDistribution : GraphicalDistribution = {dist: [],bins: []}
    timeDistributionA: GraphicalDistribution = {dist: [],bins: []}
    timeDistributionM: GraphicalDistribution = {dist: [],bins: []}

    totalValues : number[] 
    allOrders: OrderEntity[] 
    granularity: number


    private calculate(timeFrame = 'Ever') {
        this.priceDistribution = StatsService.distribuicaoEstatisticaPreco(this.totalValues, 10)
        this.timeDistributionA = StatsService.distribuicaoEstatisticaTempoAno(this.allOrders, 10)
        this.timeDistributionM = StatsService.distribuicaoEstatisticaTempoMes(this.allOrders, 10)
        if (timeFrame == 'Ever'){
            this.max = StatsService.priceMask(Math.max(...this.timeDistributionA.dist))
            this.min = StatsService.priceMask(Math.min(...this.timeDistributionA.dist))
            this.mean = StatsService.priceMask(StatsService.calcularMedia(this.timeDistributionA.dist))
        }
        else{
            this.max = StatsService.priceMask(Math.max(...this.timeDistributionM.dist))
            this.min = StatsService.priceMask(Math.min(...this.timeDistributionM.dist))
            this.mean = StatsService.priceMask(StatsService.calcularMedia(this.timeDistributionM.dist))
        }
    }

    constructor(totalValues: number[], allOrders:  OrderEntity[], granularity: number){
        this.totalValues = totalValues
        this.allOrders = allOrders
        this.granularity = granularity
        this.calculate()
    }
    public getStats(timeFrame = 'Ever'){
        if (timeFrame  == 'Ever'){
            return {
                "all" : this.all, 
                "max": this.max, 
                "min": this.min, 
                "mean": this.mean,
                "priceDistribution": this.priceDistribution, 
                "timeDistribution": this.timeDistributionA
            }
        }
        return {
            "all" : this.all, 
            "max": this.max, 
            "min": this.min, 
            "mean": this.mean,
            "priceDistribution": this.priceDistribution, 
            "timeDistribution": this.timeDistributionM
        }
    }
}


export interface GraphicalDistribution {
    dist: number[]; bins: String[]; 
}