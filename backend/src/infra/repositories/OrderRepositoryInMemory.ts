import { Order } from "../../domain/entities/Order"
import { IOrderRepository } from "../../domain/repositories/IOrderRepository"

export class OrderRepositoryInMemory implements IOrderRepository {

  private orders: Order[] = []

  create(order: Order): void {
    this.orders.push(order)
  }

  findAll(): Order[] {
    return this.orders
  }

  findById(id: string): Order | undefined {
    return this.orders.find(order => order.id === id)
  }

  findByPeriod(start: Date, end: Date): Order[] {
    return this.orders.filter(order =>
      order.createdAt >= start && order.createdAt <= end
    )
  }
}
