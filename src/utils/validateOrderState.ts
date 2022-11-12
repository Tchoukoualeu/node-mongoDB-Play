import { requestUpdateOrderById, StateType } from "../dtos/ordersDtos"

export function validateOrderState(
  request: requestUpdateOrderById,
  currentState?: StateType
) {
  if (!currentState) return false

  if (currentState === "COMPLETE") return false

  if (currentState === "OPEN") {
    if (!request.assignedTo) return false

    if (["COMPLETE", "OPEN"].includes(request.currentState)) return false
  }

  if (
    currentState === "IN_PROGRESS" &&
    (request.assignedTo || request.currentState !== "COMPLETE")
  ) {
    return false
  }

  return true
}
