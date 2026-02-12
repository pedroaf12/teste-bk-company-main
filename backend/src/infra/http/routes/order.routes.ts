import { Router } from "express"
import { OrderWebhookMapper } from "../../../application/mappers/OrderWebhookMapper"
import { orderRepository } from "../../container"

const router = Router()


router.post("/webhook", (req, res) => {

  const order = OrderWebhookMapper.toDomain(req.body)

  orderRepository.create(order)

  res.status(201).send()
})


router.get("/", (req, res) => {

  const orders = orderRepository.findAll()

  res.json(orders)
})

export default router
