import express from "express"
const orderRoutes = express.Router()
import { requestOrdersController } from "./../controllers/orders/requestOrders"
import { requestCreateOrderController } from "./../controllers/orders/requestCreateOrder"
import { orderDto, requestUpdateOrderByIdDto } from "./../dtos/ordersDtos"
import { validate } from "../utils/SchemaValidation"
import { requestUpdateOrderStateController } from "../controllers/orders/requestUpdateOrderState"

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

export default orderRoutes
