import { IOrderRepository } 
from "../../domain/repositories/IOrderRepository"

import { IProductCostRepository } 
from "../../domain/repositories/IProductCostRepository"

export class GetDashboardDataUseCase {

  constructor(
    private orderRepo: IOrderRepository,
    private costRepo: IProductCostRepository
  ) {}

  execute(start: Date, end: Date) {

    const orders = this.orderRepo.findByPeriod(start, end)

    const totalOrders = orders.length
    const totalRevenue = orders.reduce(
      (acc, o) => acc + o.totalAmount,
      0
    )

    let totalCost = 0

    for (const order of orders) {
      for (const item of order.items) {
        const cost = this.costRepo.findByProductId(item.productId)

        if (cost) {
          totalCost += cost.cost * item.quantity
        }
      }
    }

    return {
      totalOrders,
      totalRevenue,
      totalCost,
      profit: totalRevenue - totalCost
    }
  }
}
