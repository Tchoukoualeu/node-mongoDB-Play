import { Schema, model } from "mongoose"
import { Order } from "../dtos/ordersDtos"

const orderSchema = new Schema<Order>({
  lastUpdatedAt: String,
  createdAt: String,
  customer: {
    fname: String,
    lname: String,
  },
  lineItems: [
    {
      _id: String,
      sku: String,
      name: String,
    },
  ],
  currentState: {
    type: String,
    enum: ["OPEN", "IN_PROGRESS", "COMPLETE"],
    default: "OPEN",
  },
  stateHistory: [
    {
      state: {
        type: String,
        enum: ["OPEN", "IN_PROGRESS", "COMPLETE"],
        default: "OPEN",
      },
      createdAt: String,
      assignedTo: String,
    },
  ],
})

export const OrderModel = model<Order>("Order", orderSchema)
