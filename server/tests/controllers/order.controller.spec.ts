import UserModel from '../../src/models/user.model';
import OrderModel from '../../src/models/order.model';
import app from '../../src/app';

import supertest from 'supertest';
import OrderEntity from '../../src/entities/order.entity';

const request = supertest(app);

describe('UserController', () => {
  const mockedOrderId: string = "b9c4a338-e19e-4bfa-bc83-45171017407c";
  const mockedUserId: string = "ce6f5c66-1967-4b21-9929-51ca7d652151";
  const mockedOrder: OrderModel = new OrderModel({
    id: mockedOrderId,
    userId: mockedUserId,
    totalValue: "600",
    purchaseDate: new Date("2023-01-29T06:00:00.000Z"),
    statusHistory: [
      {
        id: "c1894648-0e07-48b2-b988-b05ed49c9aa6",
        status: {
          id: "f307102d-698b-4ad5-adf6-de7281243583",
          status: "processing"
        },
        date: "2023-01-29T06:00:00Z"
      },
      {
        id: "042045ac-b6a5-4e0b-8f80-cb85d823af8d",
        status: {
          id: "8bbb7b46-17d6-4df3-8171-0003814e3812",
          status: "active"
        },
        date: "2023-01-29T08:00:00Z"
      }
    ],
    products: [
      {
        id: "a66807c2-d202-4b7e-853d-f2c5bfbb2f6f",
        name: "Camisa Adidas",
        brand: {
          id: "e92cf80c-de73-4cf8-8f09-579efa669dd8",
          name: "Adidas",
          sector: {
            id: "8d271874-f125-469a-9013-c0764713937b",
            name: "sporting_goods"
          }
        },
        value: "200",
        productCategory: {
          id: "94582aca-7715-4ad7-b855-bdaad2b2899e",
          name: "clothing"
        }
      }
    ],
    address: "Endereco tal",
    payment: "pix"
  });
  const mockedOrderArray: OrderModel[] = [mockedOrder]
  it('[GET] /api/orders/:id should return an order by id', async () => {
    const response = await request.get(`/api/orders/${mockedOrderId}`).send();
    const result: OrderModel = response.body.data;
    // reconverter purchaseDate em Date
    result.purchaseDate = new Date(result.purchaseDate);
    expect(result).toEqual(mockedOrder);
  });
  it('[GET] /api/orders/history/:userId should return the orders by an userId', async () => {
    const response = await request.get(`/api/orders/history/${mockedUserId}`).send();
    const result: OrderModel[] = response.body.data;
    const finalResult = result.map((order) => {
      return {
        ...order,
        purchaseDate: new Date(order.purchaseDate)
      } as OrderModel
    })
    expect(finalResult).toEqual(mockedOrderArray);
  });
});