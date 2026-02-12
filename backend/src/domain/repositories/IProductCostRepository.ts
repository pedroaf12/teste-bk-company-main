import { ProductCost } from "../entities/ProductCost"

export interface IProductCostRepository {

  createOrUpdate(cost: ProductCost): void

  findByProductId(productId: string): ProductCost | undefined

  findAll(): ProductCost[]
}
