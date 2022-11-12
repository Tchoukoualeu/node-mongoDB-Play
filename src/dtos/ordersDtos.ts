import { z } from "zod"

export const orderDto = z.object({
  _id: z.string().optional(),
  lastUpdatedAt: z.string(),
  createdAt: z.string(),
  customer: z.object({
    fname: z.string(),
    lname: z.string(),
  }),
  lineItems: z.array(
    z.object({
      _id: z.string(),
      sku: z.string(),
      name: z.string(),
    })
  ),
  currentState: z.enum(["OPEN", "IN_PROGRESS", "COMPLETE"]),
  stateHistory: z.array(
    z.object({
      state: z.enum(["OPEN", "IN_PROGRESS", "COMPLETE"]),
      createdAt: z.string(),
      assignedTo: z.string().optional(),
    })
  ),
})

export type Order = z.infer<typeof orderDto>

export const requestUpdateOrderByIdDto = z.object({
  _id: z.string(),
  currentState: z.enum(["OPEN", "IN_PROGRESS", "COMPLETE"]),
  createdAt: z.string(),
  assignedTo: z.string().optional(),
})

export type requestUpdateOrderById = z.infer<typeof requestUpdateOrderByIdDto>

export type StateType = "OPEN" | "IN_PROGRESS" | "COMPLETE"
