import { Product } from "../../domain/entities/Product";
import { IProductRepository } from "../../domain/repositories/IProductRepository";

export class ProductRepositoryInMemory implements IProductRepository {

  private products: Product[] = []

  create(product: Product): void {
    this.products.push(product)
  }

  findAll(): Product[] {
    return this.products
  }

  findById(id: string): Product | undefined {
    return this.products.find(p => p.id === id)
  }
}
