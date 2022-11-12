import { Request, Response } from "express"
import { requestUpdateOrderById } from "../../dtos/ordersDtos"
import { OrderModel } from "../../models/orderModels"
import { logger } from "../../utils/logger"
import { validateOrderState } from "../../utils/validateOrderState"

export interface TypedRequestBody<T> extends Request {
  body: T
}

class requestUpdateOrderState {
  async create(req: TypedRequestBody<requestUpdateOrderById>, res: Response) {
    const { _id } = req.body

    const order = await OrderModel.findById({ _id })

    const isRequestValid = validateOrderState(req.body, order?.currentState)

    if (!isRequestValid)
      return res.status(400).send({ message: "Invalid request" })

    try {
      const updatedOrder = await OrderModel.findByIdAndUpdate(
        { _id },
        {
          $set: {
            currentState: req.body.currentState,
            lastUpdatedAt: req.body.createdAt,
          },
          $push: {
            stateHistory: {
              state: req.body.currentState,
              createdAt: req.body.createdAt,
              ...(req.body.assignedTo && { assignedTo: req.body.assignedTo }),
            },
          },
        },
        { new: true }
      )

      return res.status(200).send(updatedOrder)
    } catch (err) {
      logger.warn(err, "Fail to add order")

      return res.status(400).send({ message: err })
    }
  }
}

export const requestUpdateOrderStateController = new requestUpdateOrderState()
