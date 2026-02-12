import { Product } from "../entities/Product";

export interface IProductRepository {
  create(product: Product): void
  findAll(): Product[]
  findById(id: string): Product | undefined
}
