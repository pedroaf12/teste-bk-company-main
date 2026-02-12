export interface OrderItem {
  productId: string
  name: string
  quantity: number
  unitPrice: number
}

export class Order {
  constructor(
    public id: string,
    public buyerName: string,
    public buyerEmail: string,
    public items: OrderItem[],
    public totalAmount: number,
    public createdAt: Date
  ) {}
}
