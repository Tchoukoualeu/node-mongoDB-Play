import { Request, Response } from "express"
import { OrderModel } from "../../models/orderModels"
import { logger } from "../../utils/logger"

class requestOrders {
  async create(_req: Request, res: Response) {
    try {
      const orders = await OrderModel.find()

      return res.status(200).send({
        data: orders,
      })
    } catch (err) {
      logger.warn(err, "Fail to fetch orders")

      return res.status(400).send({ message: "Error" })
    }
  }
}

export const requestOrdersController = new requestOrders()
