import { Router } from "express"
import { z } from "zod"
import { ProductCost } from "../../../domain/entities/ProductCost"
import { productCostRepository } from "../../container"

const router = Router()


const schema = z.object({
  productId: z.string(),
  cost: z.number().nonnegative()
})

router.post("/", (req, res) => {

  const data = schema.parse(req.body)

  const productCost = new ProductCost(
    data.productId,
    data.cost
  )

  productCostRepository.createOrUpdate(productCost)

  res.status(201).json({ message: "Cost saved successfully" })
})


router.get("/", (req, res) => {

  const costs = productCostRepository.findAll()

  res.json(costs)
})

export default router
