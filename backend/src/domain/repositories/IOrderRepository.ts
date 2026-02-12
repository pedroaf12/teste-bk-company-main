import { Order } from "../entities/Order"

export interface IOrderRepository {

  create(order: Order): void

  findAll(): Order[]

  findById(id: string): Order | undefined

  findByPeriod(start: Date, end: Date): Order[]
}
