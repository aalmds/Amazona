import OrderEntity from '../entities/order.entity';
import logger from '../logger';
import OrderModel from '../models/order.model';
import OrderStatusItemModel from '../models/order-status-item.model';
import OrderRepository from '../repositories/order.repository';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/errors/http.error';
import OrderStatusService from './order-status.service';
import ProductService from './product.service';
import NotificationService from './notification.service';
import ProductModel from '../models/product.model';
import OrderStatusItemEntity from '../entities/order-status-item.entity';
import { v4 as uuidv4 } from 'uuid';
import NotificationEntity from '../entities/notification.entity';

class OrderServiceMessageCode {
  public static readonly order_not_found = 'order_not_found';
  public static readonly order_not_created = 'order_not_created';
  public static readonly order_not_updated = 'order_not_updated';
}

class OrderService {
  private orderRepository: OrderRepository;
  private orderStatusService: OrderStatusService;
  private productService: ProductService;
  private notificationService: NotificationService;
  
  constructor(
    orderRepository: OrderRepository,
    orderStatusService: OrderStatusService,
    productService: ProductService,
    notificationService: NotificationService
  ) {
    this.orderRepository = orderRepository;
    this.orderStatusService = orderStatusService;
    this.productService = productService;
    this.notificationService = notificationService;
  }
  private async getOrderStatusItemsByIds(statusHistories: OrderStatusItemEntity[]): Promise<OrderStatusItemModel[]> {
    const statusHistory = await Promise.all(
      statusHistories.map(async (history) => {
        try {
          const orderStatus = await this.orderStatusService.getOrderStatusById(history.statusId);
          
          return new OrderStatusItemModel({
            ...history,
            status: orderStatus,
          });
        } catch (e) {
          logger.error(
            `[OrderService][getOrderById] Error while processing order-status-item ${history.id}:`,
            e
          );
          return null;
        }
      })
    ); 
    const filteredStatusHistory = statusHistory.filter(
      (result) => result !== null
    ) as OrderStatusItemModel[];
    return filteredStatusHistory;
  }

  private async getProductsByIds(productsEntry: string[]): Promise<ProductModel[]> {
    const products = await Promise.all(
      productsEntry.map(async (id) => {
        try {
          const product = await this.productService.getProductById(id);
          return product;
        } catch (e) {
          logger.error(
            `[OrderService][getOrderById] Error while processing product ${id}:`,
            e
          );
          return null;
        }
      })
    ); 
    const filteredProdutct = products.filter(
      (result) => result !== null
    ) as ProductModel[];
    return filteredProdutct;
  }

  public async getAllOrderByUserId(userId: string): Promise<OrderModel[]> {
    try {
      const orders = await this.orderRepository.getOrder();
      const filteredOrdersByUser = orders.filter(
        order => order.userId === userId
      ) as OrderEntity[]
      const results = await Promise.all(
        filteredOrdersByUser.map(async (order) => {
          try {
            const statusHistory = await this.getOrderStatusItemsByIds(order.statusHistory);  
            const products = await this.getProductsByIds(order.productsIds);
            return new OrderModel({
              ...order,
              statusHistory: statusHistory,
              products: products,
              purchaseDate: new Date(order.purchaseDate)
            });
          } catch (e) {
            logger.error(
              `[OrderService][getOrders] Error while processing order ${order.id}:`,
              e
            );
            return null;
          }
        })
      );
      const filteredResults = results.filter(
        (result) => result !== null
      ) as OrderModel[];
      return filteredResults
    } catch (e) {
      throw e;
    }
  }
  private async getHistoryByUserIdAuxiliary(order: OrderModel, historiesStatus: any, productName: any, initialDate: any, endDate: any): Promise<OrderModel | undefined> {
    let hasStatusHistory = false;
    let hasSomeProductWithName = false;
    let hasPurchaseDate = false;

    if (!!initialDate && !!endDate) {
      let timePurchaseDate = order.purchaseDate.getTime()
      let timeInitialDate = new Date(initialDate).getTime()
      let timeEndDate = new Date(endDate).getTime()
      
      hasPurchaseDate = (timePurchaseDate >= timeInitialDate && timePurchaseDate <= timeEndDate)
    } else {
      hasPurchaseDate = true; // se não foi fornecido purchaseDate, assume-se que foi atendido
    }

    if (!!historiesStatus) {
      let length = order.statusHistory.length
      hasStatusHistory = length > 0 &&  historiesStatus.includes(order.statusHistory[length -1].status.status); //checa se possui o nome dos status atual
    } else {
      hasStatusHistory = true; // se não foi fornecido historyId, assume-se que foi atendido
    }

    if (!!productName) { 
      hasSomeProductWithName = order.products.some((product) => product.name.toLowerCase().includes(productName.toLowerCase()));
    } else {
      hasSomeProductWithName = true; // se não foi fornecido productName, assume-se que foi atendido
    }

    if (hasStatusHistory && hasSomeProductWithName && hasPurchaseDate) {
      return order;
    }
  }
  public async getHistoryByUserId(userId: string, historiesStatus: any, productName: any, initialDate: any, endDate: any): Promise<OrderModel[]> {
    try {
      const orders: OrderModel[] = await this.getAllOrderByUserId(userId);
      const results = await Promise.all(
        orders.map(async (order) => {
          try {
            return await this.getHistoryByUserIdAuxiliary(order, historiesStatus, productName, initialDate, endDate)
          } catch (e) {
            logger.error(
              `[OrderService][getOrders] Error while processing order ${order.id}:`,
              e
            );
            return null;
          }
        })
      );
  
      const filteredResults = results.filter(
        (result) => !!result
      ) as OrderModel[];
  
      return filteredResults;
    } catch (e) {
      throw e;
    }
  }

  public async getOrderById(id: string): Promise<OrderModel> {
    try {
      const order = await this.orderRepository.getOrderById(id);
      if (!order) {
        throw new NotFoundError({
          msg: 'order not found!',
          msgCode: OrderServiceMessageCode.order_not_found,
        });
      }
      /* get by id em cada order-status*/
      const statusHistory = await this.getOrderStatusItemsByIds(order.statusHistory);  
      /* get by id em cada product*/
      const products = await this.getProductsByIds(order.productsIds);
      return new OrderModel({
        ...order,
        statusHistory: statusHistory,
        products: products,
        purchaseDate: new Date(order.purchaseDate)
      })
    } catch (e) {
      throw e;
    }
  }
  public async addOrderStatusById(id: string, item: OrderStatusItemEntity): Promise<void> {
    try {
      const order = await this.orderRepository.getOrderById(id);
      if (!order) {
        throw new NotFoundError({
          msg: 'order not found!',
          msgCode: OrderServiceMessageCode.order_not_found,
        });
      }
      item = new OrderStatusItemEntity({
        ...item,
        id: uuidv4()
      })
      order.statusHistory.push(item)
      const result = await this.orderRepository.updateOrder(order);
      if (!result) {
        throw new BadRequestError({
          msg: 'order not updated!',
          msgCode: OrderServiceMessageCode.order_not_updated,
        });
      }
    } catch (e) {
      throw e;
    }
  }
  public async createOrder(data: OrderEntity): Promise<void> {
    try {
      const order = await this.orderRepository.createOrder(data);

      if (!order) {
        throw new BadRequestError({
          msg: 'order not created!',
          msgCode: OrderServiceMessageCode.order_not_created,
        });
      }
      const products: ProductModel[] = await this.getProductsByIds(order.productsIds);
      const productsName: string = products.map(product => product.name).join(', ')
      const notificationData = new NotificationEntity({
        title: `Criação do pedido de número X com sucesso`,
        description: `O pedido com os produtos ${productsName} Foi criado com sucesso!`,
        orderId: order.id,
        userId: order.userId,
        date: order.purchaseDate
      })
      await this.notificationService.createNotification(notificationData)
    } catch (e) {
      throw e;
    }
  }
}

export default OrderService;
