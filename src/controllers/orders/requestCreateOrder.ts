import { Request, Response } from "express"
import { Order } from "../../dtos/ordersDtos"
import { OrderModel } from "../../models/orderModels"
import { logger } from "../../utils/logger"

export interface TypedRequestBody<T> extends Request {
  body: T
}

class requestCreateOrder {
  async create(req: TypedRequestBody<Order>, res: Response) {
    if (req.body.currentState !== "OPEN") {
      return res.status(400).send({ message: "Invalid request" })
    }

    const order = new OrderModel({
      ...req.body,
    })

    try {
      const newOrder = await order.save()

      return res.status(200).send(newOrder)
    } catch (err) {
      logger.warn(err, "Fail to add order")

      return res.status(400).send({ message: err })
    }
  }
}

export const requestCreateOrderController = new requestCreateOrder()
