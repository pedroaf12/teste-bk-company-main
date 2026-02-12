import { Router } from "express"
import { z } from "zod"
import { Product } from "../../../domain/entities/Product"
import { productRepository } from "../../container"

const router = Router()

const schema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().nonnegative()
})


router.post("/", (req, res) => {
  const data = schema.parse(req.body)
  const product = new Product(data.id, data.name, data.price)
  productRepository.create(product)
  res.status(201).json(product)
})


router.get("/", (req, res) => {

  const products = productRepository.findAll()

  res.json(products)
})

export default router
