import { Request, Response } from "express"
import { OrderModel } from "../../models/orderModels"
import { logger } from "../../utils/logger"

class requestOrderById {
  async create(req: Request, res: Response) {
    const { id } = req.params

    try {
      const order = await OrderModel.findById(id)

      return res.status(200).send({
        data: order,
      })
    } catch (err) {
      logger.warn(err, "Fail to fetch order by id")

      return res.status(400).send({ message: "Error" })
    }
  }
}

export const requestOrderByIdController = new requestOrderById()
