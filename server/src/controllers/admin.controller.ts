import { Router, Request, Response } from 'express';
import OrderEntity from '../entities/order.entity';
import OrderStatusItemEntity from '../entities/order-status-item.entity';
import JsonHandler from '../utils/json-handler';
import { BaseRepository } from '../repositories/base.repository';
import OrderModel from '../models/order.model';
import OrderRepository from '../repositories/order.repository';
import OrderStatusItemModel from '../models/order-status-item.model';
import StatsService from '../services/admin.service';

let id_cancelled = "0fc0ea4f-840a-4a45-b657-1a364fb4fe72"

export default class AdminController {
    private prefix: string = '/admin';
    public router: Router;
    
    constructor(router: Router) {
        this.router = router;
        this.initRoutes();
    }


 
    private initRoutes() {
        this.router.get(this.prefix, async (req , res ) => { 
          
            const stats = await StatsService.ordersStats()
            res.status(200);
            res.send(stats);
        });
    }
}
