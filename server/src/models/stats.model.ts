import OrderEntity from '../entities/order.entity';
import  StatsService  from '../services/admin.service';

export class StatsModel {
    all: number[]  = []                
    max: String = "" 
    min:   String = "" 
    mean:   String  = ""  
    priceDistribution : GraphicalDistribution = {}
    timeDistribution: GraphicalDistribution = {}

    totalValues : number[] 
    allOrders: OrderEntity[] 
    granularity: number


    private calculate() {
        this.max = StatsService.priceMask(Math.max(...this.totalValues))
        this.min = StatsService.priceMask(Math.min(...this.totalValues))
        this.mean = StatsService.priceMask(StatsService.calcularMedia(this.totalValues))
        this.priceDistribution = StatsService.distribuicaoEstatisticaPreco(this.totalValues, 10)
        this.timeDistribution = StatsService.distribuicaoEstatisticaTempoAno(this.allOrders, 10)
    }

    constructor(totalValues: number[], allOrders:  OrderEntity[], granularity: number){
        this.totalValues = totalValues
        this.allOrders = allOrders
        this.granularity = granularity
        this.calculate()
    }
    public getStats(){
        return {
            "all" : this.all, 
            "max": this.max, 
            "min": this.min, 
            "mean": this.mean,
            "priceDistribution": this.priceDistribution, 
            "timeDistribution": this.timeDistribution
        }
    }
}


export interface GraphicalDistribution {
     ist?: number[]; bins?: String[]; 
}
