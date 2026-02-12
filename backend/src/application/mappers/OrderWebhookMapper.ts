import { Order } from "../../domain/entities/Order";

interface WebhookPayload {
  id: string
  buyer: {
    buyerName: string
    buyerEmail: string
  }
  lineItems: {
    itemId: string
    itemName: string
    qty: number
    unitPrice: number
  }[]
  totalAmount: number
  createdAt: string
}

export class OrderWebhookMapper {

  static toDomain(payload: WebhookPayload): Order {

    return new Order(
      payload.id,
      payload.buyer.buyerName,
      payload.buyer.buyerEmail,
      payload.lineItems.map((item: any) => ({
        productId: item.itemId,
        name: item.itemName,
        quantity: item.qty,
        unitPrice: item.unitPrice
      })),
      payload.totalAmount,
      new Date(payload.createdAt)
    )
  }
}
