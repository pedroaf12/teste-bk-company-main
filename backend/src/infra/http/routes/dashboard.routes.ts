import { Router } from "express"
import { z } from "zod"
import { GetDashboardDataUseCase } from "../../../application/use-cases/GetDashboardDataUseCase"
import { orderRepository, productCostRepository } from "../../container"

const router = Router()


const querySchema = z.object({
  start: z.string(),
  end: z.string()
})

router.get("/", (req, res) => {

  const { start, end } = querySchema.parse(req.query)

  const startDate = new Date(start)
  const endDate = new Date(end)

  const useCase = new GetDashboardDataUseCase(
    orderRepository,
    productCostRepository
  )

  const result = useCase.execute(startDate, endDate)

  res.json(result)
})

export default router
