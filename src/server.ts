import express from "express"
import { config } from "../config"
import { connectDB } from "./database/dbConfig"
import orderRoutes from "./routes/orderRoutes"
import { logger } from "./utils/logger"
import cors from "cors"

const app = express()
connectDB()

app.get("/health", (_req, res) => {
  res.send()
})

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/orders", orderRoutes)

app.listen(config.port, () => {
  return logger.info(`Server is listening on port ${config.port}`)
})
