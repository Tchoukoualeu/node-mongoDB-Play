import express from "express"
const orderRoutes = express.Router()
import { requestOrdersController } from "./../controllers/orders/requestOrders"
import { requestCreateOrderController } from "./../controllers/orders/requestCreateOrder"
import {
  orderDto,
  requestOrderByIdDto,
  requestUpdateOrderByIdDto,
} from "./../dtos/ordersDtos"
import { validate } from "../utils/SchemaValidation"
import { requestUpdateOrderStateController } from "../controllers/orders/requestUpdateOrderState"
import { requestOrderByIdController } from "../controllers/orders/requestOrderById"

orderRoutes.post(
  "/add",
  validate(orderDto, "body"),
  requestCreateOrderController.create
)

orderRoutes.post(
  "/update",
  validate(requestUpdateOrderByIdDto, "body"),
  requestUpdateOrderStateController.create
)

orderRoutes.get("/", requestOrdersController.create)

orderRoutes.get(
  "/:id",
  validate(requestOrderByIdDto, "params"),
  requestOrderByIdController.create
)

export default orderRoutes
