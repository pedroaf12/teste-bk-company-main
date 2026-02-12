import { ProductCost } from "../../domain/entities/ProductCost"
import { IProductCostRepository } from "../../domain/repositories/IProductCostRepository"

export class ProductCostRepositoryInMemory implements IProductCostRepository {

  private costs: ProductCost[] = []

  createOrUpdate(cost: ProductCost): void {

    const existing = this.costs.find(c => c.productId === cost.productId)

    if (existing) {
      existing.cost = cost.cost
      return
    }

    this.costs.push(cost)
  }

  findByProductId(productId: string): ProductCost | undefined {
    return this.costs.find(cost => cost.productId === productId)
  }

  findAll(): ProductCost[] {
    return this.costs
  }
}
