import { OrderRepositoryInMemory } from "./repositories/OrderRepositoryInMemory"
import { ProductRepositoryInMemory } from "./repositories/ProductRepositoryInMemory"
import { ProductCostRepositoryInMemory } from "./repositories/ProductCostRepositoryInMemory"

export const orderRepository = new OrderRepositoryInMemory()
export const productRepository = new ProductRepositoryInMemory()
export const productCostRepository = new ProductCostRepositoryInMemory()
